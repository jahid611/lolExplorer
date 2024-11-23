import React, { useState, useEffect } from 'react';
import { getChampionInfo } from '../api/riot';

interface ChampionData {
  id: string;
  name: string;
  title: string;
  lore: string;
  spells: {
    id: string;
    name: string;
    description: string;
    cooldown: number[];
  }[];
}

interface ChampionTooltipProps {
  championName: string;
  children: React.ReactNode;
}

const ChampionTooltip: React.FC<ChampionTooltipProps> = ({ championName, children }) => {
  const [championData, setChampionData] = useState<ChampionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        const data = await getChampionInfo(championName);
        setChampionData(data.data[championName]);
        setError(null);
      } catch (err) {
        console.error('Error fetching champion data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load champion data');
      }
    };

    if (championName) {
      fetchChampionData();
    }
  }, [championName]);

  return (
    <div className="relative group">
      {children}
      {championData && (
        <div className="absolute z-[9999] hidden group-hover:block bg-[#010A13] border border-[#C89B3C] rounded-lg p-4 min-w-[300px] max-w-[400px] shadow-xl -translate-x-1/2 left-1/2 mt-2">
          <div className="relative flex flex-col gap-2">
            <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#C89B3C]" />
            
            <div className="flex items-center gap-3">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${championName}.png`}
                alt={championData.name}
                className="w-12 h-12 rounded border border-[#C89B3C]"
              />
              <div>
                <h3 className="text-[#C89B3C] font-bold text-base">{championData.name}</h3>
                <p className="text-[#F0E6D2] text-sm">{championData.title}</p>
              </div>
            </div>
            
            <p className="text-sm text-[#A09B8C] italic border-b border-[#1E2328] pb-2">
              {championData.lore}
            </p>
            
            <div className="space-y-2">
              {championData.spells.map((spell, index) => (
                <div key={index} className="flex gap-2">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/spell/${spell.id}.png`}
                    alt={spell.name}
                    className="w-8 h-8 rounded"
                  />
                  <div>
                    <p className="text-[#C89B3C] text-sm font-semibold">{spell.name}</p>
                    <p className="text-[#F0E6D2] text-xs">{spell.description}</p>
                    <p className="text-[#A09B8C] text-xs mt-1">
                      Cooldown: {spell.cooldown[0]}s
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChampionTooltip;

