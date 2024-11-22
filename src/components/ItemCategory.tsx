import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../types';
import { ChevronRight } from 'lucide-react';

interface ItemCategoryProps {
  title: string;
  items: Item[];
  type: string;
}

const ItemCategory: React.FC<ItemCategoryProps> = ({ title, items, type }) => {
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
    <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700/30 overflow-hidden">
      <div className="p-4 border-b border-gray-700/30 flex items-center justify-between">
        <h2 className="text-lg font-bold text-yellow-500">{title}</h2>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 xl:grid-cols-16 gap-2">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/items/${item.id}`}
              className="relative group"
            >
              <div 
                className={`bg-gray-800/40 rounded-md p-0.5 transform transition-all duration-150 
                          hover:scale-105 hover:shadow-lg cursor-pointer
                          border ${getRarityBorder(item)}`}
              >
                <div className="relative aspect-square">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-sm"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 right-0 bg-black/80 px-1 rounded-tl text-[10px] text-yellow-500">
                    {item.gold.total}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemCategory;