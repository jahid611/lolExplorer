export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stats: Record<string, number>;
  tags: string[];
  from?: string[];
  into?: string[];
  maps: Record<string, boolean>;
  gold: {
    base: number;
    total: number;
    sell: number;
    purchasable: boolean;
  };
  rarity?: 'common' | 'epic' | 'legendary' | 'mythic';
  consumed?: boolean;
  inStore?: boolean;
  requiredChampion?: string;
  requiredAlly?: string;
  specialItem?: boolean;
}

export const ITEM_TYPES = {
  STARTER: 'starter_items',
  BOOTS: 'boots',
  BASIC: 'basic_items',
  EPIC: 'epic_items',
  LEGENDARY: 'legendary_items',
  MYTHIC: 'mythic_items',
  CONSUMABLE: 'consumable_items',
  TRINKET: 'trinkets'
} as const;

export type ItemType = typeof ITEM_TYPES[keyof typeof ITEM_TYPES];