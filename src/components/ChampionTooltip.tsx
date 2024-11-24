import React, { useState, useEffect } from 'react';
import { getChampionData, getChampionIconUrl, getSpellIconUrl } from '../utils/dataDragon';
import { Sword, Shield, Zap } from 'lucide-react';

interface ChampionTooltipProps {
  championName: string;
}

export const ChampionTooltip: React.FC<ChampionTooltipProps> = ({ championName }) => {
  const [championData, setChampionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        const data = await getChampionData(championName);
        setChampionData(data);
      } catch (error) {
        console.error('Error fetching champion data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChampionData();
  }, [championName]);

  if (loading) {
    return (
      <div className="bg-[#010A13] border border-[#C89B3C] rounded-lg p-4 min-w-[300px]">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-[#1E2328] h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-[#1E2328] rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-[#1E2328] rounded"></div>
              <div className="h-4 bg-[#1E2328] rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!championData) return null;

  return (
    <div className="bg-[#010A13] border border-[#C89B3C] rounded-lg p-4 min-w-[300px] max-w-md">
      <div className="flex items-start gap-4 mb-4">
        <img 
          src={getChampionIconUrl(championName)} 
          alt={championData.name} 
          className="w-16 h-16 rounded-lg border border-[#785A28]"
        />
        <div>
          <h3 className="text-[#F0B232] font-bold text-lg">{championData.name}</h3>
          <p className="text-[#A09B8C] text-sm">{championData.title}</p>
          <div className="flex gap-2 mt-2">
            {championData.tags.map((tag: string) => (
              <span 
                key={tag} 
                className="text-xs px-2 py-1 rounded-full bg-[#1E2328] text-[#C89B3C] border border-[#785A28]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[#A09B8C] text-sm mb-4">{championData.blurb}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Sword className="w-4 h-4 text-[#F0B232]" />
          <span className="text-sm text-[#C89B3C]">Attack: {championData.info.attack}</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#F0B232]" />
          <span className="text-sm text-[#C89B3C]">Defense: {championData.info.defense}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#F0B232]" />
          <span className="text-sm text-[#C89B3C]">Magic: {championData.info.magic}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center text-[#F0B232]">★</div>
          <span className="text-sm text-[#C89B3C]">Difficulty: {championData.info.difficulty}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {championData.spells.map((spell: any, index: number) => (
          <div key={index} className="text-center group relative">
            <img 
              src={getSpellIconUrl(spell.image.full)} 
              alt={spell.name} 
              className="w-12 h-12 mx-auto rounded border border-[#785A28] transition-all duration-200 group-hover:scale-110"
            />
            <p className="text-[#C89B3C] text-xs mt-1">{spell.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionTooltip;

