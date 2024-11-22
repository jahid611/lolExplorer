"use client"

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ChampionFiltersProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
}

const roles = [
  { value: 'all', label: 'TOUS LES RÔLES' },
  { value: 'Assassin', label: 'ASSASSIN' },
  { value: 'Fighter', label: 'COMBATTANT' },
  { value: 'Mage', label: 'MAGE' },
  { value: 'Marksman', label: 'TIREUR' },
  { value: 'Support', label: 'SUPPORT' },
  { value: 'Tank', label: 'TANK' },
];

const sortOptions = [
  { value: 'alphabetical', label: 'ALPHABÉTIQUE' },
  { value: 'difficulty', label: 'DIFFICULTÉ' },
];

const ChampionFilters: React.FC<ChampionFiltersProps> = ({ 
  selectedRole, 
  onRoleChange, 
  sortOrder, 
  onSortChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <select
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="appearance-none bg-[#1E2328] text-white h-8 pl-4 pr-10 
                   border border-[#C89B3C] rounded-sm
                   text-sm uppercase tracking-wider cursor-pointer
                   focus:outline-none focus:ring-1 focus:ring-[#C89B3C]
                   hover:bg-[#252A31] transition-colors"
        >
          {roles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C89B3C] pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-[#1E2328] text-white h-8 pl-4 pr-10 
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

export default ChampionFilters;

