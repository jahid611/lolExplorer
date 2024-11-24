import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const RIOT_API_KEY = process.env.VITE_RIOT_API_KEY;

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

// Récupérer compte par Riot ID
app.get('/api/account/by-riot-id/:gameName/:tagLine', async (req, res) => {
  const { gameName, tagLine } = req.params;

  try {
    // 1. Récupérer le compte Riot
    const accountResponse = await fetch(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
      { headers: { 'X-Riot-Token': RIOT_API_KEY } }
    );
    
    if (!accountResponse.ok) throw new Error('Compte non trouvé');
    const accountData = await accountResponse.json();

    // 2. Récupérer les infos d'invocateur
    const summonerResponse = await fetch(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountData.puuid}`,
      { headers: { 'X-Riot-Token': RIOT_API_KEY } }
    );
    
    if (!summonerResponse.ok) throw new Error('Invocateur non trouvé');
    const summonerData = await summonerResponse.json();

    // 3. Récupérer les rangs
    const rankedResponse = await fetch(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}`,
      { headers: { 'X-Riot-Token': RIOT_API_KEY } }
    );
    
    if (!rankedResponse.ok) throw new Error('Rangs non trouvés');
    const rankedData = await rankedResponse.json();

    res.json({
      ...accountData,
      ...summonerData,
      ranked: rankedData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer les matchs par PUUID
app.get('/api/matches/by-puuid/:puuid', async (req, res) => {
  const { puuid } = req.params;

  try {
    // 1. Récupérer les IDs des matchs
    const matchIdsResponse = await fetch(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
      { headers: { 'X-Riot-Token': RIOT_API_KEY } }
    );
    
    if (!matchIdsResponse.ok) throw new Error('Liste des matchs non trouvée');
    const matchIds = await matchIdsResponse.json();

    // 2. Récupérer les détails de chaque match
    const matchDetailsPromises = matchIds.map(matchId =>
      fetch(
        `https://europe.api.riotg
ames.com/lol/match/v5/matches/${matchId}`,
        { headers: { 'X-Riot-Token': RIOT_API_KEY } }
      ).then(res => res.json())
    );

    const matches = await Promise.all(matchDetailsPromises);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

