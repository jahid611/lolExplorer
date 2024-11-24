import fetch from 'node-fetch';

const RIOT_API_KEY = process.env.VITE_RIOT_API_KEY;
const RIOT_API_REGIONS = {
    EUROPE: 'europe.api.riotgames.com',
    EUW1: 'euw1.api.riotgames.com'
};

async function fetchRiotAPI(url, errorMessage) {
    const response = await fetch(url, {
        headers: { 'X-Riot-Token': RIOT_API_KEY },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${errorMessage}: ${response.status} - ${errorText}`);
    }

    return response.json();
}

export default async function handler(req, res) {
    const { gameName, tagLine } = req.query;
    const count = Math.min(100, Math.max(1, parseInt(req.query.count) || 20));

    try {
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

        res.status(200).json({
            account: riotAccountData,
            summoner: summonerData,
            ranks: rankedData,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
