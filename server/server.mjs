import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const RIOT_API_KEY = process.env.VITE_RIOT_API_KEY;

const RIOT_API_REGIONS = {
  EUROPE: 'europe.api.riotgames.com',
  EUW1: 'euw1.api.riotgames.com'
};

if (!RIOT_API_KEY) {
  console.error('Erreur : Clé API Riot manquante.');
  process.exit(1);
}

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

async function fetchRiotAPI(url, errorMessage) {
  try {
    const response = await fetch(url, {
      headers: { 'X-Riot-Token': RIOT_API_KEY },
    });

    if (!response.ok) {
      console.error(`Erreur API Riot (${response.status}):`, await response.text());
      throw new Error(`${errorMessage} (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de l'appel à ${url}:`, error);
    throw error;
  }
}

app.get('/api/account/by-riot-id/:gameName/:tagLine', async (req, res) => {
  const { gameName, tagLine } = req.params;
  const count = Math.min(100, Math.max(1, parseInt(req.query.count) || 20));

  try {
    console.log(`Recherche de ${count} matchs pour ${gameName}#${tagLine}`);

    const riotAccountData = await fetchRiotAPI(
      `https://${RIOT_API_REGIONS.EUROPE}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
      'Compte non trouvé'
    );

    const summonerData = await fetchRiotAPI(
      `https://${RIOT_API_REGIONS.EUW1}/lol/summoner/v4/summoners/by-puuid/${riotAccountData.puuid}`,
      'Informations d\'invocateur non trouvées'
    );

    const rankedData = await fetchRiotAPI(
      `https://${RIOT_API_REGIONS.EUW1}/lol/league/v4/entries/by-summoner/${summonerData.id}`,
      'Informations de rang non trouvées'
    );

    let allMatchIds = [];
    let start = 0;
    const batchSize = 100;

    while (allMatchIds.length < count) {
      const matchIds = await fetchRiotAPI(
        `https://${RIOT_API_REGIONS.EUROPE}/lol/match/v5/matches/by-puuid/${riotAccountData.puuid}/ids?start=${start}&count=${Math.min(batchSize, count - allMatchIds.length)}`,
        'Liste des matchs non trouvée'
      );
      
      if (matchIds.length === 0) break;
      
      allMatchIds = allMatchIds.concat(matchIds);
      start += matchIds.length;

      await new Promise(resolve => setTimeout(resolve, 1000)); // Pause d'une seconde entre les requêtes
    }

    allMatchIds = allMatchIds.slice(0, count);

    console.log(`Récupération de ${allMatchIds.length} matchs...`);

    const matchDetailsPromises = allMatchIds.map(async (matchId, index) => {
      try {
        await new Promise(resolve => setTimeout(resolve, index * 200));
        return await fetchRiotAPI(
          `https://${RIOT_API_REGIONS.EUROPE}/lol/match/v5/matches/${matchId}`,
          `Détails du match ${matchId} non trouvés`
        );
      } catch (error) {
        console.error(`Erreur pour le match ${matchId}:`, error);
        return null;
      }
    });

    const matchDetails = await Promise.all(matchDetailsPromises);
    const validMatchDetails = matchDetails.filter(match => match !== null);

    const playerData = {
      ...riotAccountData,
      ...summonerData,
      ranks: rankedData,
      recentMatches: validMatchDetails
    };

    console.log(`Données récupérées pour ${gameName}#${tagLine}:`);
    console.log(`- Nombre de matchs demandés: ${count}`);
    console.log(`- Nombre de matchs trouvés: ${validMatchDetails.length}`);
    console.log(`- Rangs trouvés: ${rankedData.length}`);

    res.json(playerData);
  } catch (error) {
    console.error('Erreur complète:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.stack
    });
  }
});

app.use((err, req, res, next) => {
  console.error('Erreur non gérée:', err);
  res.status(500).json({
    error: 'Erreur serveur interne',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(PORT, () => {
  console.log(`\n=== Serveur démarré ===`);
  console.log(`URL du serveur : http://localhost:${PORT}`);
  console.log(`Routes disponibles :`);
  console.log(`- GET /api/account/by-riot-id/:gameName/:tagLine`);
  console.log(`========================\n`);
});

