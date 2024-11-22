import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const RIOT_API_KEY = process.env.VITE_RIOT_API_KEY;

if (!RIOT_API_KEY) {
  console.error('RIOT_API_KEY is not set in environment variables');
  process.exit(1);
}

const api = axios.create({
  headers: {
    'X-Riot-Token': RIOT_API_KEY
  }
});

async function makeRiotRequest(url) {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Riot API Error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
}

app.get('/api/player/:region/:name/:tag', async (req, res) => {
  const { region, name, tag } = req.params;

  try {
    const regionalRoute = region.toLowerCase().includes('euw') ? 'europe' : 
                         region.toLowerCase().includes('na') ? 'americas' : 
                         region.toLowerCase().includes('kr') ? 'asia' : 'europe';

    // Get account info
    const accountUrl = `https://${regionalRoute}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`;
    const accountData = await makeRiotRequest(accountUrl);

    // Get summoner info
    const summonerUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountData.puuid}`;
    const summonerData = await makeRiotRequest(summonerUrl);

    // Get ranked info
    const rankedUrl = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}`;
    const rankedData = await makeRiotRequest(rankedUrl);

    // Get match history
    const matchlistUrl = `https://${regionalRoute}.api.riotgames.com/lol/match/v5/matches/by-puuid/${accountData.puuid}/ids?start=0&count=5`;
    const matchIds = await makeRiotRequest(matchlistUrl);

    // Get match details
    const matches = await Promise.all(
      matchIds.map(matchId => 
        makeRiotRequest(`https://${regionalRoute}.api.riotgames.com/lol/match/v5/matches/${matchId}`)
      )
    );

    // Get champion mastery
    const masteryUrl = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${accountData.puuid}/top?count=5`;
    const masteryData = await makeRiotRequest(masteryUrl);

    res.json({
      account: accountData,
      summoner: summonerData,
      leagues: rankedData,
      recentMatches: matches,
      championMastery: masteryData
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch player data'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});