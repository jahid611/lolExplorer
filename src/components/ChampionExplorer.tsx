import React, { useState } from 'react';
import { useChampions } from '../hooks/useChampions';
import SearchBar from './SearchBar';
import ChampionFilters from './ChampionFilters';
import ChampionGrid from './ChampionGrid';

const ChampionExplorer: React.FC = () => {
  const { champions, loading, error } = useChampions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const filterAndSortChampions = () => {
    let filteredChampions = [...champions];

    // Apply role filter
    if (selectedRole !== 'all') {
      filteredChampions = filteredChampions.filter(champion => 
        champion.tags.includes(selectedRole)
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredChampions = filteredChampions.filter(champion =>
        champion.name.toLowerCase().includes(query) ||
        champion.title.toLowerCase().includes(query)
      );
    }

    return filteredChampions;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load champions. Please try again later.
      </div>
    );
  }

  const filteredChampions = filterAndSortChampions();

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm py-4 space-y-4">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery}
          placeholder="Search champions by name or title..."
        />
        <ChampionFilters
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />
      </div>

      {filteredChampions.length > 0 ? (
        <ChampionGrid champions={filteredChampions} />
      ) : (
        <div className="text-center text-gray-400 py-8">
          No champions found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ChampionExplorer;