"use client"

import React, { useState, useEffect } from 'react';
import { Champion } from '../types/champions';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedChampionsProps {
  onChampionClick: (champion: Champion) => void;
}

const featuredChampions: Champion[] = [
  { id: 'Ambessa', name: 'Ambessa', title: 'Matriarche de guerre' },
  { id: 'Galio', name: 'Galio', title: 'Colosse' },
  { id: 'LeeSin', name: 'Leesin', title: 'Moine aveugle' },
];

const FeaturedChampions: React.FC<FeaturedChampionsProps> = ({ onChampionClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredChampions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? featuredChampions.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      (prev + 1) % featuredChampions.length
    );
  };

  return (
    <div className="bg-[#0A1428] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#C89B3C] mb-6">CHAMPIONS EN VEDETTE</h2>
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredChampions.map((champion) => (
                <div 
                  key={champion.id}
                  className="w-full flex-shrink-0"
                >
                  <div 
                    className="relative aspect-[21/9] cursor-pointer"
                    onClick={() => onChampionClick(champion)}
                  >
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                      alt={champion.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-white text-4xl font-bold uppercase tracking-wider mb-2">
                        {champion.name}
                      </h3>
                      <p className="text-gray-400 text-xl italic">
                        {champion.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Previous champion"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Next champion"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredChampions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#C89B3C]' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to champion ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedChampions;

