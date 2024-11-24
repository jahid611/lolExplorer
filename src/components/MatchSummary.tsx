import React from 'react';
import { getChampionIconUrl, getItemIconUrl } from '../utils/dataDragon';
import { Trophy, Star } from 'lucide-react';

interface PlayerStats {
  championName: string;
  summonerName: string;
  rank: string;
  rankTier: string;
  scoreOP: number;
  position: string;
  kills: number;
  deaths: number;
  assists: number;
  damageDealt: number;
  damageTaken: number;
  visionScore: number;
  cs: number;
  csPerMinute: number;
  items: number[];
  mvp?: boolean;
  placement?: string;
}

interface TeamStats {
  players: PlayerStats[];
  totalKills: number;
  totalGold: number;
  victory: boolean;
}

interface MatchSummaryProps {
  blueTeam: TeamStats;
  redTeam: TeamStats;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({ blueTeam, redTeam }) => {
  const renderPlayerRow = (player: PlayerStats, isBlueTeam: boolean) => {
    const kda = ((player.kills + player.assists) / Math.max(player.deaths, 1)).toFixed(2);
    const kdaText = `${player.kills}/${player.deaths}/${player.assists}`;
    
    return (
      <div className={`flex items-center gap-2 p-2 ${isBlueTeam ? 'bg-[#1A1C21]' : 'bg-[#1E2328]'} rounded-lg mb-1`}>
        <div className="w-16 flex items-center gap-1">
          <span className="text-[#C89B3C] font-semibold">{player.scoreOP}</span>
          {player.mvp && <Trophy className="w-4 h-4 text-[#F0B232]" />}
          <span className="text-xs text-[#8593A5]">{player.placement}</span>
        </div>

        <div className="flex items-center gap-2 w-48">
          <div className="relative">
            <img
              src={getChampionIconUrl(player.championName)}
              alt={player.championName}
              className="w-8 h-8 rounded-lg"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#1E2328] text-[#C89B3C] text-xs px-1 rounded">
              {player.rankTier}
            </div>
          </div>
          <span className="font-medium truncate">{player.summonerName}</span>
        </div>

        <div className="w-24 text-sm">
          <span className="text-[#8593A5]">{kdaText}</span>
          <span className="text-xs text-[#8593A5] ml-1">({kda})</span>
        </div>

        <div className="w-32 flex items-center gap-1">
          <div className="h-2 bg-red-500 rounded" style={{ width: `${(player.damageDealt / 30000) * 100}px` }} />
          <span className="text-xs text-[#8593A5]">{player.damageDealt}</span>
        </div>

        <div className="w-16 text-center">
          <span className="text-[#8593A5]">{player.visionScore}</span>
          <span className="text-xs text-[#8593A5] block">{player.visionScore}/0</span>
        </div>

        <div className="w-24">
          <span className="text-[#8593A5]">{player.cs}</span>
          <span className="text-xs text-[#8593A5] block">
            {player.csPerMinute} par minute
          </span>
        </div>

        <div className="flex gap-1">
          {player.items.map((itemId, idx) => (
            itemId ? (
              <img
                key={idx}
                src={getItemIconUrl(itemId)}
                alt={`Item ${idx + 1}`}
                className="w-6 h-6 rounded border border-[#454B54]"
              />
            ) : (
              <div key={idx} className="w-6 h-6 bg-[#1E2328] rounded border border-[#454B54]" />
            )
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0A1428] text-[#F0E6D2] p-4 rounded-lg">
      <div className="mb-4">
        <div className="text-lg font-semibold mb-2 text-[#E84057]">
          Défaite (Équipe bleue)
        </div>
        {blueTeam.players.map((player, idx) => renderPlayerRow(player, true))}
      </div>

      <div className="flex justify-between text-sm text-[#8593A5] border-y border-[#454B54] py-2 px-4 my-4">
        <div className="flex gap-8">
          <div>{blueTeam.totalKills} Total Kill {redTeam.totalKills}</div>
          <div>{blueTeam.totalGold} Total Gold {redTeam.totalGold}</div>
        </div>
      </div>

      <div>
        <div className="text-lg font-semibold mb-2 text-[#0397AB]">
          Victoire (Équipe rouge)
        </div>
        {redTeam.players.map((player, idx) => renderPlayerRow(player, false))}
      </div>
    </div>
  );
};

export default MatchSummary;

