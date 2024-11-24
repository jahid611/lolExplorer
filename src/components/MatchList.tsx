import React from 'react';
import { Match, MatchPlayer } from '../types/match';
import { getChampionIcon, getItemIcon, getSummonerSpellIcon } from '../api/riot';

interface MatchListProps {
  matches: Match[];
  summonerName: string;
}

export const MatchList: React.FC<MatchListProps> = ({ matches, summonerName }) => {
  const getPlayerFromMatch = (match: Match): MatchPlayer => {
    return match.participants.find(p => p.summonerName === summonerName)!;
  };

  return (
    <div className="space-y-2">
      {matches.map((match) => {
        const player = getPlayerFromMatch(match);
        return (
          <div 
            key={match.gameId}
            className={`bg-[#1C1C1F] p-4 rounded-lg flex items-center gap-4 ${
              player.win ? 'border-l-4 border-[#5383E8]' : 'border-l-4 border-[#E84057]'
            }`}
          >
            <div className="flex-shrink-0 relative">
              <img
                src={getChampionIcon(player.championName)}
                alt={player.championName}
                className="w-12 h-12 rounded"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#202D37] text-white text-xs px-1 rounded">
                {player.championLevel}
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-bold ${player.win ? 'text-[#5383E8]' : 'text-[#E84057]'}`}>
                  {player.win ? 'Victoire' : 'Défaite'}
                </span>
                <span className="text-[#98A0A7] text-sm">
                  {match.gameType}
                </span>
              </div>

              <div className="text-white">
                {player.kills} / {player.deaths} / {player.assists}
                <span className="text-[#98A0A7] text-sm ml-2">
                  ({((player.kills + player.assists) / Math.max(1, player.deaths)).toFixed(2)} KDA)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {player.items.map((itemId, index) => (
                itemId ? (
                  <img
                    key={index}
                    src={getItemIcon(itemId)}
                    alt={`Item ${index + 1}`}
                    className="w-8 h-8 rounded"
                  />
                ) : (
                  <div key={index} className="w-8 h-8 bg-[#2F2F33] rounded" />
                )
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <img
                src={getSummonerSpellIcon(player.summoner1Id)}
                alt="Summoner Spell 1"
                className="w-6 h-6 rounded"
              />
              <img
                src={getSummonerSpellIcon(player.summoner2Id)}
                alt="Summoner Spell 2"
                className="w-6 h-6 rounded"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

