import React from 'react';
import { ITEM_TYPES } from '../types/items';
import { Shield, Sword, Heart, Droplet, Zap, Activity, Clock, Eye, Coins } from 'lucide-react';

interface ItemFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  onSortChange: (sort: string) => void;
}

const ItemFilters: React.FC<ItemFiltersProps> = ({
  selectedType,
  onTypeChange,
  onSortChange
}) => {
  const itemTypeIcons: Record<string, JSX.Element> = {
    [ITEM_TYPES.STARTER]: <Clock className="w-4 h-4" />,
    [ITEM_TYPES.BOOTS]: <img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/itemicons/1001_class_t1_bootsofspeed.png" className="w-4 h-4" alt="Boots" />,
    [ITEM_TYPES.BASIC]: <Sword className="w-4 h-4" />,
    [ITEM_TYPES.EPIC]: <Shield className="w-4 h-4" />,
    [ITEM_TYPES.LEGENDARY]: <Heart className="w-4 h-4" />,
    [ITEM_TYPES.MYTHIC]: <Zap className="w-4 h-4" />,
    [ITEM_TYPES.CONSUMABLE]: <Droplet className="w-4 h-4" />,
    [ITEM_TYPES.TRINKET]: <Eye className="w-4 h-4" />
  };

  return (
    <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 shadow-xl">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onTypeChange('all')}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-2
            ${selectedType === 'all' 
              ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 shadow-lg shadow-yellow-500/10' 
              : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:bg-gray-800 hover:border-yellow-500/30'}`}
        >
          <Activity className="w-4 h-4" />
          All Items
        </button>
        {Object.entries(ITEM_TYPES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onTypeChange(value)}
            className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all duration-200
              ${selectedType === value 
                ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 shadow-lg shadow-yellow-500/10' 
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:bg-gray-800 hover:border-yellow-500/30'}`}
          >
            {itemTypeIcons[value]}
            {key.charAt(0) + key.slice(1).toLowerCase().replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-4 items-center">
        <div className="relative flex-1 max-w-xs">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Coins className="w-4 h-4 text-yellow-500/70" />
          </div>
          <select
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 rounded-xl border border-gray-700/30 
                     text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50
                     appearance-none cursor-pointer transition-all duration-200
                     hover:border-yellow-500/30"
          >
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="name">Name</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemFilters;