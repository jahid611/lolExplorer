const DDRAGON_VERSION = '14.23.1'; // Update this to the latest version

export const getChampionData = async (championName: string) => {
  const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/en_US/champion/${championName}.json`);
  const data = await response.json();
  return data.data[championName];
};

export const getItemData = async (itemId: number) => {
  const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/en_US/item.json`);
  const data = await response.json();
  return data.data[itemId];
};

export const getChampionIconUrl = (championName: string) => 
  `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${championName}.png`;

export const getItemIconUrl = (itemId: number) => 
  `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/item/${itemId}.png`;

export const getSpellIconUrl = (spellId: string) => 
  `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/spell/${spellId}`;

