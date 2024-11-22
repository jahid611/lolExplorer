import React from 'react';
import { Item } from '../types';
import { formatGold } from '../utils';

interface ItemGridProps {
  items: Item[];
  onItemClick: (item: Item) => void;
  onItemHover: (item: Item, event: React.MouseEvent) => void;
  onItemLeave: () => void;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, onItemClick, onItemHover, onItemLeave }) => {
  const getRarityBorder = (rarity?: string) => {
    switch (rarity) {
      case 'mythic': return 'border-orange-500';
      case 'legendary': return 'border-purple-500';
      case 'epic': return 'border-blue-500';
      default: return 'border-yellow-500';
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => (
        <button 
          key={item.id} 
          onClick={() => onItemClick(item)}
          onMouseEnter={(e) => onItemHover(item, e)}
          onMouseLeave={onItemLeave}
          className={`group relative aspect-square overflow-hidden rounded-lg bg-[#1E2328] border-2 ${getRarityBorder(item.rarity)} transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#C89B3C]`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-2 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white text-sm font-bold truncate">
              {item.name}
            </h3>
            <p className="text-[#C89B3C] text-xs">
              {formatGold(item.gold.total)}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ItemGrid;

