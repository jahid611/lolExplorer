import React from 'react';
import { PlayerStats } from '../types/match';

interface RankDisplayProps {
  stats: PlayerStats;
  type: 'solo' | 'flex';
}

export const RankDisplay: React.FC<RankDisplayProps> = ({ stats, type }) => {
  return (
    <div className="bg-[#1C1C1F] p-4 rounded-lg">
      <h3 className="text-[#98A0A7] text-sm mb-2">
        {type === 'solo' ? 'Classé en solo/duo' : 'Classé flexible'}
      </h3>
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <img 
            src={`/ranks/${stats.tier.toLowerCase()}.png`}
            alt={stats.tier}
            className="w-16 h-16"
          />
        </div>
        <div>
          <div className="text-white font-bold">
            {stats.tier} {stats.rank}
          </div>
          <div className="text-[#98A0A7]">
            {stats.leaguePoints} LP
          </div>
          <div className="text-sm text-[#98A0A7]">
            {stats.wins}V {stats.losses}D ({stats.winRate}%)
          </div>
        </div>
      </div>
    </div>
  );
};

