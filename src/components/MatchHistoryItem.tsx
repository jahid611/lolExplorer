import React from 'react';
import { getChampionIcon, getItemIcon } from '../api/riot';
import { Match, Participant } from '../types/player';

interface MatchHistoryItemProps {
  match: Match;
  participant: Participant;
}

export default function MatchHistoryItem({ match, participant }: MatchHistoryItemProps) {
  const kda = ((participant.kills + participant.assists) / Math.max(1, participant.deaths)).toFixed(1);
  const gameTime = Math.floor(match.info.gameDuration / 60);
  const gameMode = match.info.gameMode === 'CLASSIC' ? 'Normal' : match.info.gameMode;
  
  return (
    <div className="bg-[#1A1C21]/80 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-[#0A1428] to-[#1A1C21]">
        <div className="flex flex-col min-w-[100px]">
          <span className="text-[#F0E6D2] font-medium">{gameMode}</span>
          <span className="text-[#A09B8C] text-sm">il y a 4 heures</span>
          <span className={`text-sm ${participant.win ? 'text-[#08D6F6]' : 'text-[#FF4E50]'}`}>
            {participant.win ? 'Victoire' : 'Défaite'}
          </span>
          <span className="text-[#A09B8C] text-sm">{gameTime}:10</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={getChampionIcon(participant.championName)}
              alt={participant.championName}
              className="w-16 h-16 rounded"
            />
            <span className="absolute bottom-0 right-0 bg-black/60 text-white text-xs px-1 rounded">
              16
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="text-[#F0E6D2]">{participant.kills}</span>
              <span className="text-[#A09B8C]">/</span>
              <span className="text-[#FF4E50]">{participant.deaths}</span>
              <span className="text-[#A09B8C]">/</span>
              <span className="text-[#F0E6D2]">{participant.assists}</span>
            </div>
            <span className="text-[#A09B8C] text-sm">{kda} KDA</span>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {[
              participant.item0,
              participant.item1,
              participant.item2,
              participant.item3,
              participant.item4,
              participant.item5,
              participant.item6
            ].map((itemId, idx) => (
              itemId ? (
                <img
                  key={idx}
                  src={getItemIcon(itemId)}
                  alt={`Item ${idx + 1}`}
                  className="w-8 h-8 rounded border border-[#454B54]"
                />
              ) : (
                <div key={idx} className="w-8 h-8 bg-[#1E2328] rounded border border-[#454B54]" />
              )
            ))}
          </div>

          <div className="flex gap-2 ml-4">
            <div className="bg-[#BE1E37] text-white text-xs px-2 py-1 rounded-full">
              Quadruplé
            </div>
            <div className="bg-[#C8AA6E] text-[#0A1428] text-xs px-2 py-1 rounded-full">
              MVP
            </div>
            <div className="bg-[#0397AB] text-white text-xs px-2 py-1 rounded-full">
              Meneur
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

