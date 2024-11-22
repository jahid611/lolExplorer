import React from 'react';
import { Item } from '../types';
import { motion } from 'framer-motion';

interface ItemCategoryProps {
  title: string;
  items: Item[];
  onItemClick: (item: Item) => void;
  rarity: string;
}

const ItemCategory: React.FC<ItemCategoryProps> = ({
  title,
  items,
  onItemClick,
  rarity
}) => {
  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'mythic':
        return 'from-orange-500/20 to-transparent border-orange-500/50';
      case 'legendary':
        return 'from-purple-500/20 to-transparent border-purple-500/50';
      case 'epic':
        return 'from-blue-500/20 to-transparent border-blue-500/50';
      default:
        return 'from-yellow-500/20 to-transparent border-yellow-500/50';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColors(rarity)} opacity-10`} />
      <div className="relative">
        <h2 className="text-[#F0E6D2] text-xl font-bold mb-4">{title}</h2>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2"
        >
          {items.map((item) => (
            <motion.button
              key={item.id}
              variants={item}
              onClick={() => onItemClick(item)}
              className="relative group"
            >
              <div className="relative w-12 h-12 rounded-md overflow-hidden border border-[#785A28] bg-[#1E2328] transition-transform duration-200 group-hover:scale-110">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.gold && (
                  <div className="absolute bottom-0 right-0 bg-black/80 px-1 text-[10px] text-[#C89B3C]">
                    {item.gold.total}
                  </div>
                )}
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-[#1E2328] border border-[#785A28] rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <p className="text-[#F0E6D2] text-xs text-center truncate">{item.name}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ItemCategory;
