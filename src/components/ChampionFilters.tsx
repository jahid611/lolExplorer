import React from 'react';
import { Sword, Shield, Wand, Target, Heart, Crown } from 'lucide-react';

interface ChampionFiltersProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const ChampionFilters: React.FC<ChampionFiltersProps> = ({
  selectedRole,
  onRoleChange
}) => {
  const roles = [
    { id: 'Fighter', name: 'Fighter', icon: <Sword className="w-4 h-4" /> },
    { id: 'Tank', name: 'Tank', icon: <Shield className="w-4 h-4" /> },
    { id: 'Mage', name: 'Mage', icon: <Wand className="w-4 h-4" /> },
    { id: 'Marksman', name: 'Marksman', icon: <Target className="w-4 h-4" /> },
    { id: 'Support', name: 'Support', icon: <Heart className="w-4 h-4" /> },
    { id: 'Assassin', name: 'Assassin', icon: <Crown className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 shadow-xl">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onRoleChange('all')}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-2
            ${selectedRole === 'all' 
              ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 shadow-lg shadow-yellow-500/10' 
              : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:bg-gray-800 hover:border-yellow-500/30'}`}
        >
          All Roles
        </button>
        {roles.map(role => (
          <button
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all duration-200
              ${selectedRole === role.id 
                ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 shadow-lg shadow-yellow-500/10' 
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:bg-gray-800 hover:border-yellow-500/30'}`}
          >
            {role.icon}
            {role.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChampionFilters;