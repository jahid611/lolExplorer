const DDRAGON_VERSION = '14.23.1';
const DDRAGON_LANG = 'en_US';

export const fetchChampionData = async () => {
  const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/${DDRAGON_LANG}/champion.json`);
  if (!response.ok) throw new Error('Failed to fetch champion data');
  return response.json();
};

export const fetchItemData = async () => {
  const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/${DDRAGON_LANG}/item.json`);
  if (!response.ok) throw new Error('Failed to fetch item data');
  return response.json();
};

export const getChampionIconUrl = (championId: string) => 
  `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${championId}.png`;

export const getItemIconUrl = (itemId: string) => 
  `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/item/${itemId}.png`;

export const getChampionSpellIconUrl = (spellId: string) => 
  `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/spell/${spellId}`;

