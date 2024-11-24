import React, { useState, useEffect, useRef } from 'react';
import { getChampionData, getChampionIconUrl, getSpellIconUrl } from '../utils/dataDragon';
import { Sword, Shield, Zap } from 'lucide-react';
import ChampionAbilityPreview from './ChampionAbilityPreview';

interface ChampionTooltipProps {
  championName: string;
}

export const ChampionTooltip: React.FC<ChampionTooltipProps> = ({ championName }) => {
  const [championData, setChampionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredAbility, setHoveredAbility] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.relatedTarget as Node)) {
        setHoveredAbility(null);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-[#010A13] rounded p-2 min-w-[200px]">
        <div className="animate-pulse flex space-x-2">
          <div className="rounded-full bg-[#1E2328] h-8 w-8"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-3 bg-[#1E2328] rounded w-3/4"></div>
            <div className="space-y-1">
              <div className="h-2 bg-[#1E2328] rounded"></div>
              <div className="h-2 bg-[#1E2328] rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!championData) return null;

  // Use a constant for the Data Dragon version instead of process.env
  const DDRAGON_VERSION = '13.24.1';

  return (
    <div ref={tooltipRef} className="bg-[#010A13]/95 rounded p-2 min-w-[300px] max-w-[400px]">
      <div className="flex items-start gap-2 mb-2">
        <img 
          src={getChampionIconUrl(championName)} 
          alt={championData.name} 
          className="w-10 h-10 rounded"
        />
        <div>
          <h3 className="text-[#F0B232] font-bold text-sm">{championData.name}</h3>
          <p className="text-[#A09B8C] text-xs">{championData.title}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {championData.tags.map((tag: string) => (
              <span 
                key={tag} 
                className="text-[9px] px-1 py-0.5 rounded-full bg-[#1E2328] text-[#C89B3C]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[#A09B8C] text-xs mb-2 leading-tight">{championData.blurb}</p>

      <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2 text-xs">
        <div className="flex items-center gap-1">
          <Sword className="w-3 h-3 text-[#F0B232]" />
          <span className="text-[#C89B3C]">Attack: {championData.info.attack}</span>
        </div>
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-[#F0B232]" />
          <span className="text-[#C89B3C]">Defense: {championData.info.defense}</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-[#F0B232]" />
          <span className="text-[#C89B3C]">Magic: {championData.info.magic}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 flex items-center justify-center text-[#F0B232]">★</div>
          <span className="text-[#C89B3C]">Difficulty: {championData.info.difficulty}</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 mb-2">
        <div 
          className="text-center cursor-pointer"
          onMouseEnter={() => setHoveredAbility('P')}
        >
          <img 
            src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/passive/${championData.passive.image.full}`}
            alt={championData.passive.name} 
            className="w-8 h-8 mx-auto rounded"
          />
          <p className="text-[#C89B3C] text-[9px] mt-0.5">Passive</p>
        </div>
        {championData.spells.map((spell: any, index: number) => (
          <div 
            key={index} 
            className="text-center cursor-pointer"
            onMouseEnter={() => setHoveredAbility(['Q', 'W', 'E', 'R'][index])}
          >
            <img 
              src={getSpellIconUrl(spell.id)}
              alt={spell.name} 
              className="w-8 h-8 mx-auto rounded"
            />
            <p className="text-[#C89B3C] text-[9px] mt-0.5">{['Q', 'W', 'E', 'R'][index]}</p>
          </div>
        ))}
      </div>

      {hoveredAbility && (
        <ChampionAbilityPreview
          ability={hoveredAbility === 'P' ? championData.passive : championData.spells[['Q', 'W', 'E', 'R'].indexOf(hoveredAbility)]}
          championId={championData.id}
          abilityKey={hoveredAbility}
          isPassive={hoveredAbility === 'P'}
        />
      )}
    </div>
  );
};

export default ChampionTooltip;

