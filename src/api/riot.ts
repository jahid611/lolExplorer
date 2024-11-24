const RIOT_API_BASE_URL = 'http://localhost:4000/api';

export async function getSummonerByRiotId(gameName: string, tagLine: string) {
  const response = await fetch(
    `${RIOT_API_BASE_URL}/account/by-riot-id/${gameName}/${tagLine}`
  );
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du Riot ID.');
  }
  return response.json();
}

export async function getPlayerStats(summonerId: string) {
  const response = await fetch(
    `${RIOT_API_BASE_URL}/stats/${summonerId}`
  );
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des statistiques.');
  }
  return response.json();
}

export async function getMatchesByPuuid(puuid: string) {
  const response = await fetch(
    `${RIOT_API_BASE_URL}/matches/by-puuid/${puuid}`
  );
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des matchs.');
  }
  return response.json();
}

export function getChampionIcon(championId: string) {
  return `http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${championId}.png`;
}

export function getItemIcon(itemId: number) {
  return `http://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${itemId}.png`;
}

export function getSummonerSpellIcon(spellId: number) {
  return `http://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${spellId}.png`;
}
