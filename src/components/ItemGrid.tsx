import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../types';
import ItemTooltip from './ItemTooltip';

interface ItemGridProps {
  items: Item[];
}

const ItemGrid: React.FC<ItemGridProps> = ({ items }) => {
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const getRarityBorder = (item: Item) => {
    switch (item.rarity) {
      case 'mythic':
        return 'border-orange-500/50 hover:border-orange-500 shadow-orange-500/20';
      case 'legendary':
        return 'border-purple-500/50 hover:border-purple-500 shadow-purple-500/20';
      case 'epic':
        return 'border-blue-500/50 hover:border-blue-500 shadow-blue-500/20';
      default:
        return 'border-gray-700/30 hover:border-yellow-500/50 shadow-yellow-500/20';
    }
  };

  return (
    <div 
      className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-1"
      onMouseMove={handleMouseMove}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          to={`/items/${item.id}`}
          className="relative group"
          onMouseEnter={() => setHoveredItem(item)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div 
            className={`bg-gray-900/40 backdrop-blur-sm rounded-md p-0.5 transform transition-all duration-150 
                      hover:scale-105 hover:shadow-lg cursor-pointer
                      border ${getRarityBorder(item)}`}
          >
            <div className="relative aspect-square w-10 h-10">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-sm"
                loading="lazy"
              />
              <div className="absolute bottom-0 right-0 bg-black/80 px-1 rounded-tl text-[8px] text-yellow-500">
                {item.gold.total}
              </div>
            </div>
          </div>
        </Link>
      ))}
      {hoveredItem && (
        <ItemTooltip
          item={hoveredItem}
          position={mousePosition}
        />
      )}
    </div>
  );
};

export default ItemGrid;