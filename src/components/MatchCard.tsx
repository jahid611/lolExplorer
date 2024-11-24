import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { Match, Participant } from '../types/player';
import { getChampionIcon, getItemIcon, getRankIcon } from '../api/riot';

interface MatchCardProps {
  match: Match;
  participant: Participant;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, participant }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const kda = ((participant.kills + participant.assists) / Math.max(1, participant.deaths)).toFixed(2);

  const getItemTooltip = (itemId: number) => {
    // Simuler le contenu de l'infobulle de l'objet
    return (
      <div className="space-y-2">
        <h3 className="font-bold text-[#F0B232]">Nom de l'objet</h3>
        <p className="text-sm text-gray-300">Description détaillée de l'objet...</p>
        <div className="text-sm text-[#F0B232]">
          Prix: 3000 (2000)
        </div>
      </div>
    );
  };

  const getChampionTooltip = (championName: string) => {
    return (
      <div className="space-y-2">
        <h3 className="font-bold text-[#F0B232]">{championName}</h3>
        <p className="text-sm text-gray-300">Description du champion...</p>
      </div>
    );
  };

  return (
    <div className="bg-[#1A1C21] rounded-lg overflow-hidden">
      {/* En-tête du match */}
      <div 
        className={`flex items-center gap-4 p-4 cursor-pointer ${
          participant.win ? 'bg-[#28344E]' : 'bg-[#59343B]'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-shrink-0">
          <Tooltip content={getChampionTooltip(participant.championName)}>
            <img
              src={getChampionIcon(participant.championName)}
              alt={participant.championName}
              className="w-12 h-12 rounded-lg"
            />
          </Tooltip>
        </div>

        <div className="flex-grow">
          <div className="font-bold">{participant.championName}</div>
          <div className="text-sm">
            {participant.kills}/{participant.deaths}/{participant.assists}
            <span className="text-gray-400 ml-2">
              {kda} KDA
            </span>
          </div>
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
            <div key={idx}>
              {itemId > 0 ? (
                <Tooltip content={getItemTooltip(itemId)}>
                  <img
                    src={getItemIcon(itemId)}
                    alt={`Item ${idx + 1}`}
                    className="w-8 h-8 rounded"
                  />
                </Tooltip>
              ) : (
                <div className="w-8 h-8 bg-[#1E2328] rounded" />
              )}
            </div>
          ))}
        </div>

        <div className="ml-4">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Détails du match */}
      {isExpanded && (
        <div className="p-4 bg-[#1A1C21] border-t border-[#454B54]">
          <div className="grid grid-cols-2 gap-4">
            {/* Équipe 1 */}
            <div className="space-y-2">
              <h3 className="font-bold text-[#F0B232] mb-2">Équipe 1</h3>
              {match.info.participants
                .filter(p => p.teamId === 100)
                .map(p => (
                  <div key={p.puuid} className="flex items-center gap-2">
                    <Tooltip content={getChampionTooltip(p.championName)}>
                      <img
                        src={getChampionIcon(p.championName)}
                        alt={p.championName}
                        className="w-6 h-6 rounded"
                      />
                    </Tooltip>
                    <span className="text-sm">{p.summonerName}</span>
                  </div>
                ))}
            </div>

            {/* Équipe 2 */}
            <div className="space-y-2">
              <h3 className="font-bold text-[#F0B232] mb-2">Équipe 2</h3>
              {match.info.participants
                .filter(p => p.teamId === 200)
                .map(p => (
                  <div key={p.puuid} className="flex items-center gap-2">
                    <Tooltip content={getChampionTooltip(p.championName)}>
                      <img
                        src={getChampionIcon(p.championName)}
                        alt={p.championName}
                        className="w-6 h-6 rounded"
                      />
                    </Tooltip>
                    <span className="text-sm">{p.summonerName}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Statistiques détaillées */}
          <div className="mt-4 pt-4 border-t border-[#454B54]">
            <h3 className="font-bold text-[#F0B232] mb-2">Statistiques détaillées</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p>CS: {participant.totalMinionsKilled}</p>
                <p>Vision Score: {participant.visionScore}</p>
              </div>
              <div>
                <p>Dégâts: {participant.totalDamageDealtToChampions}</p>
                <p>Or: {participant.goldEarned}</p>
              </div>
              <div>
                <p>Durée: {Math.floor(match.info.gameDuration / 60)}min</p>
                <p>Type: {match.info.gameMode}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

