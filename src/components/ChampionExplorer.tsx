"use client"

import React, { useState, useEffect } from 'react';
import { useChampions } from '../hooks/useChampions';
import SearchBar from './SearchBar';
import ChampionFilters from './ChampionFilters';
import ChampionGrid from './ChampionGrid';
import ChampionModal from './ChampionModal';
import FeaturedChampions from './FeaturedChampions';
import { Search, Filter } from 'lucide-react';

const ChampionExplorer: React.FC = () => {
  const { champions, loading, error } = useChampions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [sortOrder, setSortOrder] = useState('alphabetical');

  const filterAndSortChampions = () => {
    let filtered = [...champions];

    if (selectedRole !== 'all') {
      filtered = filtered.filter(champion => 
        champion.tags?.includes(selectedRole)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(champion =>
        champion.name.toLowerCase().includes(query) ||
        champion.title.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      if (sortOrder === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'difficulty') {
        return a.info.difficulty - b.info.difficulty;
      }
      return 0;
    });

    return filtered;
  };

  const filteredChampions = filterAndSortChampions();

  return (
    <div className="min-h-screen bg-[#010A13]">
      {/* Hero Section */}
      <div className="relative py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            CHAMPION
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Avec plus de 140 champions disponibles, vous en trouverez forcément un qui vous corresponde.
          </p>
          <p className="text-lg md:text-xl text-gray-300">
            Maîtrisez-en un, ou maîtrisez-les tous.
          </p>
        </div>
      </div>

      {/* Featured Champions */}
      <FeaturedChampions onChampionClick={setSelectedChampion} />

      {/* Search and Filters */}
      <div className="sticky top-0 z-10 bg-[#010A13]/95 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery}
              placeholder="RECHERCHER"
              icon={<Search className="w-5 h-5 text-[#C89B3C]" />}
            />
            <ChampionFilters
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
              icon={<Filter className="w-5 h-5 text-[#C89B3C]" />}
            />
          </div>
        </div>
      </div>

      {/* Champions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#C89B3C] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            Impossible de charger les champions. Veuillez réessayer plus tard.
          </div>
        ) : (
          <>
            <p className="text-[#ffffff] mb-4">
              {filteredChampions.length} champion{filteredChampions.length !== 1 ? 's' : ''}
            </p>
            <ChampionGrid 
              champions={filteredChampions} 
              onChampionClick={setSelectedChampion}
            />
          </>
        )}
      </div>

      {/* Champion Modal */}
      {selectedChampion && (
        <ChampionModal 
          champion={selectedChampion} 
          onClose={() => setSelectedChampion(null)} 
        />
      )}
    </div>
  );
};

export default ChampionExplorer;

