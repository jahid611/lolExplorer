import { Champion } from '../types/champions';
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
  skins?: Skin[]
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