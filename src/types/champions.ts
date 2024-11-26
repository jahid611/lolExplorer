import { API_VERSION } from '../constants';

export async function fetchChampions(): Promise<Champion[]> {
  try {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${API_VERSION}/data/fr_FR/champion.json`);
    if (!response.ok) throw new Error('Failed to fetch champions');
    
    const data = await response.json();
    return Object.values(data.data);
  } catch (error) {
    console.error('Error fetching champions:', error);
    throw error;
  }
}

export interface Champion {
  id: string
  name: string
  title: string
  lore: string
  background: string
  abilities?: Ability[]
}

export interface ChampionSpell {
  id: string;
  name: string;
  description: string;
  cooldown: number[];
  cost: number[];
}

export interface ChampionPassive {
  name: string;
  description: string;
  image: {
    full: string;
    sprite: string;
    group: string;
  };
}


export interface Ability {
  id: string
  name: string
  description: string
  icon: string
}

export interface Skin {
  id: string
  name: string
  splash: string
}

export async function fetchChampionDetails(championId: string): Promise<Champion> {
  try {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${API_VERSION}/data/fr_FR/champion/${championId}.json`);
    if (!response.ok) throw new Error('Failed to fetch champion details');
    
    const data = await response.json();
    return data.data[championId];
  } catch (error) {
    console.error('Error fetching champion details:', error);
    throw error;
  }
}

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }; // Définition complète de l'image
  skins: ChampionSkin[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  partype: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
}

  export interface stats {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };


export interface ChampionSkin {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
}

export interface ChampionSpell {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip: {
    label: string[];
    effect: string[];
  };
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: {};
  effect: (number[] | null)[];
  effectBurn: (string | null)[];
  vars: any[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  resource: string;
}

export interface ChampionPassive {
  name: string;
  description: string;

  };
