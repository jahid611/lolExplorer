import React from 'react';
import { PlayerData, PlayerMatch } from '../types/player';
import { getChampionIcon, getItemIcon } from '../api/riot';

interface PlayerCardProps {
  data: PlayerData;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ data }) => {
  const { gameName, tagLine, puuid, recentMatches } = data;

  const getParticipantData = (match: PlayerMatch) => {
    return match.info.participants.find((p) => p.puuid === puuid);
  };

  const getItems = (participant: PlayerMatch['info']['participants'][0]) => {
    return [
      participant.item0,
      participant.item1,
      participant.item2,
      participant.item3,
      participant.item4,
      participant.item5,
      participant.item6,
    ].filter(Boolean);
  };

  return (
    <div className="bg-[#0A1428] text-[#F0E6D2] rounded-xl border-2 border-[#C89B3C] p-8 shadow-md">
      <h2 className="text-3xl font-bold mb-4">
        {gameName}#{tagLine}
      </h2>
      <p className="mb-2 break-all">PUUID: {puuid}</p>
      
      {Array.isArray(recentMatches) && recentMatches.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-2">Matchs récents :</h3>
          <div className="space-y-4">
            {recentMatches.map((match) => {
              const participant = getParticipantData(match);
              if (!participant) return null;

              const items = getItems(participant);

              return (
                <div 
                  key={match.metadata.matchId} 
                  className={`bg-[#1E2328] p-4 rounded-lg border-l-4 ${
                    participant.win ? 'border-green-500' : 'border-red-500'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={getChampionIcon(participant.championName)}
                        alt={participant.championName}
                        className="w-12 h-12 rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="font-bold">
                        {participant.championName}
                      </div>
                      <div className="text-sm text-gray-300">
                        {participant.kills}/{participant.deaths}/{participant.assists} KDA
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {items.map((itemId, idx) => (
                        <div key={`${match.metadata.matchId}-item-${idx}`}>
                          {itemId > 0 ? (
                            <img
                              src={getItemIcon(itemId)}
                              alt={`Item ${idx + 1}`}
                              className="w-8 h-8 rounded"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-[#0A1428] rounded" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;

