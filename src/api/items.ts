import { Item } from '../types';

const API_VERSION = '14.23.1';
const BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${API_VERSION}`;

export async function fetchItems(): Promise<Item[]> {
  try {
    const response = await fetch(`${BASE_URL}/data/en_US/item.json`);
    if (!response.ok) throw new Error('Failed to fetch items');
    
    const data = await response.json();
    return processItemsData(data.data);
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

function processItemsData(itemsData: any): Item[] {
  const processedItems = Object.entries(itemsData)
    .filter(([_, item]: [string, any]) => (
      item.gold?.purchasable && 
      item.maps?.['11'] && 
      item.gold?.total > 0 && 
      !item.requiredAlly && 
      !item.hideFromAll && 
      item.inStore !== false
    ))
    .map(([id, item]: [string, any]) => ({
      id,
      name: item.name,
      description: processDescription(item.description),
      price: item.gold.total,
      image: `${BASE_URL}/img/item/${id}.png`,
      stats: processItemStats(item.stats || {}),
      tags: item.tags || [],
      from: item.from,
      into: item.into,
      maps: item.maps,
      gold: item.gold,
      rarity: determineRarity(item),
      consumed: item.consumed || false,
      inStore: item.inStore !== false,
      requiredChampion: item.requiredChampion,
      specialItem: Boolean(item.requiredAlly || item.requiredChampion)
    }));

  // Remove duplicates
  return Array.from(new Map(processedItems.map(item => [item.id, item])).values());
}

function determineRarity(item: any): 'common' | 'epic' | 'legendary' | 'mythic' {
  if (item.description?.includes('Mythic')) return 'mythic';
  if (item.from?.length >= 2 || item.gold?.total >= 3000) return 'legendary';
  if (item.from?.length === 1 || item.gold?.total >= 1000) return 'epic';
  return 'common';
}

function processDescription(description: string): string {
  if (!description) return '';
  return description
    .replace(/<br>/g, ' ')
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/&nbsp;/g, ' ');
}

function processItemStats(stats: any): Record<string, number> {
  const statMapping: Record<string, string> = {
    FlatPhysicalDamageMod: 'Attack Damage',
    FlatMagicDamageMod: 'Ability Power',
    FlatArmorMod: 'Armor',
    FlatSpellBlockMod: 'Magic Resist',
    FlatHPPoolMod: 'Health',
    FlatMPPoolMod: 'Mana',
    PercentAttackSpeedMod: 'Attack Speed',
    FlatCritChanceMod: 'Critical Strike',
    PercentMovementSpeedMod: 'Movement Speed',
    FlatHPRegenMod: 'Health Regen',
    FlatMPRegenMod: 'Mana Regen',
    PercentLifeStealMod: 'Life Steal',
    AbilityHaste: 'Ability Haste'
  };

  return Object.entries(stats)
    .filter(([_, value]) => value !== 0)
    .reduce((acc, [key, value]) => {
      const statName = statMapping[key] || key;
      acc[statName] = key.includes('Percent') ? Number((value as number * 100).toFixed(0)) : value as number;
      return acc;
    }, {} as Record<string, number>);
}