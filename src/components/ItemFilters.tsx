import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ItemFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
  icon?: React.ReactNode;
}

const categories = [
  { value: 'all', label: 'TOUTES LES CATÉGORIES' },
  { value: 'Damage', label: 'DÉGÂTS' },
  { value: 'Defense', label: 'DÉFENSE' },
  { value: 'Magic', label: 'MAGIE' },
  { value: 'Movement', label: 'MOUVEMENT' },
  { value: 'Consumable', label: 'CONSOMMABLE' },
];

const sortOptions = [
  { value: 'alphabetical', label: 'ALPHABÉTIQUE' },
  { value: 'price-asc', label: 'PRIX ↑' },
  { value: 'price-desc', label: 'PRIX ↓' },
];

const ItemFilters: React.FC<ItemFiltersProps> = ({ 
  selectedCategory, 
  onCategoryChange, 
  sortOrder, 
  onSortChange, 
  icon 
}) => {
  return (
    <div className="flex items-center space-x-4">
      {icon && <span>{icon}</span>}
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none bg-[#1E2328] text-white h-10 pl-4 pr-10 
                   border border-[#C89B3C] rounded-sm
                   text-sm uppercase tracking-wider cursor-pointer
                   focus:outline-none focus:ring-1 focus:ring-[#C89B3C]
                   hover:bg-[#252A31] transition-colors"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C89B3C] pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-[#1E2328] text-white h-10 pl-4 pr-10 
                   border border-[#C89B3C] rounded-sm
                   text-sm uppercase tracking-wider cursor-pointer
                   focus:outline-none focus:ring-1 focus:ring-[#C89B3C]
                   hover:bg-[#252A31] transition-colors"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C89B3C] pointer-events-none" />
      </div>
    </div>
  );
};

export default ItemFilters;

