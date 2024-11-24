const RIOT_API_BASE_URL = 'http://localhost:4000/api';

export async function getSummonerByRiotId(gameName: string, tagLine: string, matchCount: number = 20) {
  const response = await fetch(
    `${RIOT_API_BASE_URL}/account/by-riot-id/${gameName}/${tagLine}?count=${matchCount}`
  );
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du Riot ID.');
  }
  return response.json();
}

export function getProfileIconUrl(iconId: number) {
  return `http://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/${iconId}.png`;
}

export function getChampionIcon(championName: string) {
  return `http://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${championName}.png`;
}

export function getItemIcon(itemId: number) {
  return `http://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${itemId}.png`;
}

export function getRankIcon(tier: string) {
  return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${tier}.png`;
}

