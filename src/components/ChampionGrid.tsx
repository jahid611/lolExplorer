"use client"

import React from 'react';
import { Champion } from '../types/champions';

interface ChampionGridProps {
  champions: Champion[];
  onChampionClick: (champion: Champion) => void;
}

const ChampionGrid: React.FC<ChampionGridProps> = ({ champions, onChampionClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {champions.map((champion) => (
        <button 
          key={champion.id} 
          onClick={() => onChampionClick(champion)}
          className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-[#1E2328] transform transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
            alt={champion.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-2xl font-bold uppercase tracking-wider mb-1">
              {champion.name}
            </h3>
            <p className="text-gray-400 text-sm italic">
              {champion.title}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChampionGrid;

