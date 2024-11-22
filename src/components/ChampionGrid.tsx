import React, { useState } from 'react';
import { Champion } from '../types/champions';
import ChampionModal from './ChampionModal';

interface ChampionGridProps {
  champions: Champion[];
}

const ChampionGrid: React.FC<ChampionGridProps> = ({ champions }) => {
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {champions.map((champion) => (
          <button
            key={champion.id}
            onClick={() => setSelectedChampion(champion)}
            className="group relative text-left"
          >
            <div className="relative aspect-[3/5] overflow-hidden rounded-lg bg-gray-900/40 backdrop-blur-sm
                          border border-gray-700/30 transition-all duration-200
                          group-hover:border-yellow-500/50 group-hover:shadow-lg group-hover:shadow-yellow-500/10">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
                alt={champion.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300
                         group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-yellow-500">{champion.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{champion.title}</p>
                <div className="flex flex-wrap gap-1">
                  {champion.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-gray-800/80 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedChampion && (
        <ChampionModal 
          champion={selectedChampion} 
          onClose={() => setSelectedChampion(null)} 
        />
      )}
    </>
  );
};

export default ChampionGrid;