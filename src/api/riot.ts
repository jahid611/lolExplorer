import axios from 'axios';
import { PlayerData } from '../types/riot';

const API_BASE_URL = '/api';

export const REGIONS = {
  AMERICAS: 'americas',
  EUROPE: 'europe',
  ASIA: 'asia'
} as const;

export const PLATFORMS = {
  BR1: { id: 'br1', name: 'Brazil', region: REGIONS.AMERICAS },
  EUN1: { id: 'eun1', name: 'Europe Nordic & East', region: REGIONS.EUROPE },
  EUW1: { id: 'euw1', name: 'Europe West', region: REGIONS.EUROPE },
  JP1: { id: 'jp1', name: 'Japan', region: REGIONS.ASIA },
  KR: { id: 'kr', name: 'Korea', region: REGIONS.ASIA },
  LA1: { id: 'la1', name: 'Latin America North', region: REGIONS.AMERICAS },
  LA2: { id: 'la2', name: 'Latin America South', region: REGIONS.AMERICAS },
  NA1: { id: 'na1', name: 'North America', region: REGIONS.AMERICAS },
  OC1: { id: 'oc1', name: 'Oceania', region: REGIONS.AMERICAS },
  TR1: { id: 'tr1', name: 'Turkey', region: REGIONS.EUROPE },
  RU: { id: 'ru', name: 'Russia', region: REGIONS.EUROPE }
} as const;

export type PlatformId = keyof typeof PLATFORMS;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export async function getPlayerByNameAndTag(
  gameName: string, 
  tagLine: string, 
  platform: PlatformId
): Promise<PlayerData> {
  try {
    const response = await axiosInstance.get(
      `/player/${platform.toLowerCase()}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || 'Failed to fetch player data';
      throw new Error(message);
    }
    throw error;
  }
}