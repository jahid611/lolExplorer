import { getRuntimeConfig } from './config';

const config = getRuntimeConfig();
const DDRAGON_BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${config.DDRAGON_VERSION}`;

interface SummonerSpell {
  id: string;
  name: string;
  description: string;
  key: string;
  image: {
    full: string;
  };
}

interface RuneData {
  id: number;
  key: string;
  icon: string;
  name: string;
}

interface ChampionData {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: {
    full: string;
  };
  tags: string[];
  partype: string;
  stats: {
    [key: string]: number;
  };
}

interface ItemData {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  into: string[];
  image: {
    full: string;
  };
  gold: {
    base: number;
    purchasable: boolean;
    total: number;
    sell: number;
  };
  tags: string[];
  maps: {
    [key: string]: boolean;
  };
  stats: {
    [key: string]: number;
  };
}

let summonerSpellsCache: Record<string, SummonerSpell> | null = null;
let runesCache: Record<number, RuneData> | null = null;
let championsCache: Record<string, ChampionData> | null = null;
let itemsCache: Record<string, ItemData> | null = null;

export async function fetchSummonerSpells() {
  if (summonerSpellsCache) return summonerSpellsCache;
  
  const response = await fetch(`${DDRAGON_BASE_URL}/data/${config.DDRAGON_LANG}/summoner.json`);
  if (!response.ok) throw new Error('Failed to fetch summoner spells');
  const data = await response.json();
  summonerSpellsCache = data.data;
  return data.data;
}

export async function fetchRunes() {
  if (runesCache) return runesCache;
  
  const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.23.1/data/en_US/runesReforged.json');
  if (!response.ok) throw new Error('Failed to fetch runes');
  const data = await response.json();
  
  const runesMap: Record<number, RuneData> = {};
  data.forEach((tree: any) => {
    runesMap[tree.id] = {
      id: tree.id,
      key: tree.key,
      icon: tree.icon,
      name: tree.name
    };
  });
  
  runesCache = runesMap;
  return runesMap;
}

export async function getChampionData(championName: string): Promise<ChampionData> {
  if (!championsCache) {
    const response = await fetch(`${DDRAGON_BASE_URL}/data/${config.DDRAGON_LANG}/champion.json`);
    if (!response.ok) throw new Error('Failed to fetch champion data');
    const data = await response.json();
    championsCache = data.data;
  }
  return championsCache[championName];
}

export async function getItemData(itemId: number): Promise<ItemData> {
  if (!itemsCache) {
    const response = await fetch(`${DDRAGON_BASE_URL}/data/${config.DDRAGON_LANG}/item.json`);
    if (!response.ok) throw new Error('Failed to fetch item data');
    const data = await response.json();
    itemsCache = data.data;
  }
  return itemsCache[itemId.toString()];
}

export function getChampionIconUrl(championName: string) {
  return `${DDRAGON_BASE_URL}/img/champion/${championName}.png`;
}

export function getItemIconUrl(itemId: number) {
  return `${DDRAGON_BASE_URL}/img/item/${itemId}.png`;
}

export function getSpellIconUrl(spellId: string) {
  return `${DDRAGON_BASE_URL}/img/spell/${spellId}.png`;
}

export function getRuneIconUrl(runeId: number) {
  return `https://ddragon.leagueoflegends.com/cdn/img/${runeId}.png`;
}

export function getPassiveIconUrl(filename: string) {
  return `${DDRAGON_BASE_URL}/img/passive/${filename}`;
}

export function getSummonerSpellIconUrl(spellKey: string) {
  return `${DDRAGON_BASE_URL}/img/spell/${spellKey}.png`;
}

export function getProfileIconUrl(iconId: number) {
  return `${DDRAGON_BASE_URL}/img/profileicon/${iconId}.png`;
}

export function getRankIcon(tier: string) {
  return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${tier.toLowerCase()}.png`;
}

