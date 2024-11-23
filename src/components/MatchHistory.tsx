import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ChampionTooltip from './tooltips/ChampionTooltip';
import ItemTooltip from './tooltips/ItemTooltip';
import type { Match, MatchParticipant } from '../types/match';

interface MatchHistoryProps {
  matches: Match[];
  summonerId: string;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ matches, summonerId }) => {
  const getChampionImage = (championName: string) =>
    `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${championName}.png`;

  const getItemImage = (itemId: number) =>
    itemId ? `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${itemId}.png` : '/empty-item.png';

  const getSummonerSpellImage = (spellId: number) =>
    `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/spell/Summoner${spellId}.png`;

  const renderParticipant = (participant: MatchParticipant) => {
    const csPerMinute = ((participant.totalMinionsKilled + participant.neutralMinionsKilled) / 10).toFixed(1);
    
    return (
      <div className="flex items-center gap-2 py-2">
        <div className="flex items-center gap-1">
          <ChampionTooltip championName={participant.championName}>
            <div className="relative">
              <img
                src={getChampionImage(participant.championName)}
                alt={participant.championName}
                className="w-8 h-8 rounded"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#010A13] text-[#F0E6D2] text-xs px-1 rounded">
                {participant.champLevel}
              </span>
            </div>
          </ChampionTooltip>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-0.5">
              <img
                src={getSummonerSpellImage(participant.summoner1Id)}
                alt="Spell 1"
                className="w-4 h-4 rounded-sm"
              />
              <img
                src={getSummonerSpellImage(participant.summoner2Id)}
                alt="Spell 2"
                className="w-4 h-4 rounded-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <span className="text-[#F0E6D2] text-sm">{participant.summonerName}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#F0E6D2] text-sm whitespace-nowrap">
            {participant.kills}/{participant.deaths}/{participant.assists}
          </span>
          <span className="text-[#C89B3C] text-sm whitespace-nowrap">
            {csPerMinute} cs/min
          </span>
          <div className="flex gap-1">
            {participant.items.map((itemId, idx) => (
              <ItemTooltip key={idx} itemId={itemId}>
                <img
                  src={getItemImage(itemId)}
                  alt={`Item ${idx + 1}`}
                  className="w-6 h-6 rounded-sm bg-black/50"
                />
              </ItemTooltip>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {matches.map((match) => {
        const blueTeam = match.participants.filter(p => p.teamId === 100);
        const redTeam = match.participants.filter(p => p.teamId === 200);
        
        return (
          <div key={match.gameId} className="bg-[#010A13] border border-[#1E2328] rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 gap-4 p-4">
              {/* Blue Team */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm text-[#0ACF83]">
                  <span>Équipe bleue</span>
                  <span>{Math.floor(match.totalGold.team100 / 1000)}k Or</span>
                </div>
                <div className="space-y-1">
                  {blueTeam.map(participant => renderParticipant(participant))}
                </div>
              </div>

              {/* Red Team */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm text-[#FF4E50]">
                  <span>Équipe rouge</span>
                  <span>{Math.floor(match.totalGold.team200 / 1000)}k Or</span>
                </div>
                <div className="space-y-1">
                  {redTeam.map(participant => renderParticipant(participant))}
                </div>
              </div>
            </div>

            <div className="bg-[#1E2328] px-4 py-2 text-xs text-[#F0E6D2]">
              {format(new Date(match.gameCreation), "d MMMM yyyy 'à' HH:mm", { locale: fr })} •{' '}
              {Math.floor(match.gameDuration / 60)}:{(match.gameDuration % 60).toString().padStart(2, '0')}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchHistory;

