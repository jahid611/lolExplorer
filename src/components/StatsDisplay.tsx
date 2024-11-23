import React from 'react';
import { Shield, Sword, Target, Activity } from 'lucide-react';

interface StatDisplayProps {
  stats: {
    kills: number;
    deaths: number;
    assists: number;
    cs: number;
    damageDealt: number;
    damageTaken: number;
    visionScore: number;
    goldEarned: number;
  };
}

const StatDisplay: React.FC<StatDisplayProps> = ({ stats }) => {
  const kda = ((stats.kills + stats.assists) / Math.max(stats.deaths, 1)).toFixed(2);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-[#0A1428] rounded-lg">
      <div className="flex items-center gap-2">
        <Sword className="w-5 h-5 text-[#C89B3C]" />
        <div>
          <p className="text-[#F0E6D2] text-sm">KDA</p>
          <p className="text-[#C89B3C] font-bold">
            {stats.kills}/{stats.deaths}/{stats.assists} ({kda})
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-[#C89B3C]" />
        <div>
          <p className="text-[#F0E6D2] text-sm">CS</p>
          <p className="text-[#C89B3C] font-bold">{stats.cs}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Activity className="w-5 h-5 text-red-400" />
        <div>
          <p className="text-[#F0E6D2] text-sm">Damage</p>
          <p className="text-red-400 font-bold">{stats.damageDealt.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-400" />
        <div>
          <p className="text-[#F0E6D2] text-sm">Tanked</p>
          <p className="text-blue-400 font-bold">{stats.damageTaken.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default StatDisplay;

