import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerData, Match, Participant } from '../types/player';
import { getProfileIconUrl, getRankIcon } from '../api/riot';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ItemTooltip } from './ItemTooltip';
import { ChampionTooltip } from './ChampionTooltip';
import { getChampionIconUrl, getItemIconUrl } from '../utils/dataDragon';
import MatchDetails from './MatchDetails';
import ChampionModal from './ChampionModal';

interface PlayerCardProps {
  data: PlayerData;
  requestedMatches: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ data, requestedMatches }) => {
  const { gameName, tagLine, profileIconId, summonerLevel, puuid, ranks = [], recentMatches = [] } = data;
  const [expandedMatches, setExpandedMatches] = useState<{ [key: string]: boolean }>({});
  const [tooltip, setTooltip] = useState<{
    content: React.ReactNode;
    position: { x: number; y: number };
  } | null>(null);
  const [selectedChampion, setSelectedChampion] = useState<any>(null);

  const soloQueue = ranks.find(rank => rank?.queueType === 'RANKED_SOLO_5x5');

  const handleMouseEnter = (content: React.ReactNode, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      content,
      position: { 
        x: rect.right + 10,
        y: rect.top
      }
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handleChampionClick = async (championName: string) => {
    try {
      const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.23.1/data/fr_FR/champion/${championName}.json`);
      const data = await response.json();
      const championData = data.data[championName];
      setSelectedChampion(championData);
    } catch (error) {
      console.error('Error fetching champion data:', error);
    }
  };

  const calculateWinRate = (wins: number, losses: number) => {
    const total = wins + losses;
    return total > 0 ? Math.round((wins / total) * 100) : 0;
  };

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    const days = Math.floor(hours / 24);
    return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  };

  const getGameType = (match: Match) => {
    if (match.info.queueId === 420) return 'Ranked Solo/Duo';
    if (match.info.queueId === 440) return 'Ranked Flex';
    return match.info.gameMode;
  };

  return (
    <div className="text-[#F0E6D2] p-4">
      {/* Player Profile */}
      <div className="bg-[#1A1C21] rounded-lg p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={getProfileIconUrl(profileIconId)}
              alt="Profile Icon"
              className="w-24 h-24 rounded-lg"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#C89B3C] px-2 py-0.5 rounded text-sm">
              {summonerLevel}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {gameName}#{tagLine}
            </h2>
            {soloQueue && (
              <div className="flex items-center gap-2">
                <img 
                  src={getRankIcon(soloQueue.tier.toLowerCase())}
                  alt={soloQueue.tier}
                  className="w-8 h-8"
                />
                <div>
                  <div className="text-sm text-gray-400">Solo/Duo</div>
                  <div className="font-bold">{soloQueue.tier} {soloQueue.rank}</div>
                  <div className="text-sm">{soloQueue.leaguePoints} LP</div>
                  <div className="text-sm text-gray-400">
                    {soloQueue.wins}W {soloQueue.losses}L
                    <span className="text-[#C89B3C] ml-1">
                      ({calculateWinRate(soloQueue.wins, soloQueue.losses)}%)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Match Count Message */}
      <div className="bg-[#1A1C21] rounded-lg p-4 mb-4">
        <p className="text-[#C89B3C]">
          Nombre de parties trouvées : {recentMatches.length} 
          {requestedMatches > recentMatches.length && ` (sur ${requestedMatches} demandées)`}
        </p>
      </div>

      {/* Match History */}
      <div className="space-y-2">
        {recentMatches?.map((match) => {
          const participant = match.info?.participants?.find(p => p.puuid === puuid);
          if (!participant) return null;
          
          const isExpanded = expandedMatches[match.metadata.matchId];
          const kda = ((participant.kills + participant.assists) / Math.max(1, participant.deaths)).toFixed(2);
          const gameType = getGameType(match);
          
          return (
            <div key={match.metadata.matchId} className="bg-[#1A1C21] rounded-lg p-2">
              <div className="flex items-center gap-4">
                {/* Game Info */}
                <div className="w-32">
                  <div className="text-xs text-[#8593A5]">{gameType}</div>
                  <div className="text-xs text-[#8593A5]">{getTimeAgo(match.info.gameCreation)}</div>
                  <div className={`text-sm ${participant.win ? 'text-[#08D6F6]' : 'text-[#FF4E50]'}`}>
                    {participant.win ? 'Victoire' : 'Défaite'}
                  </div>
                </div>

                {/* Champion Icon */}
                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={(e) => handleMouseEnter(<ChampionTooltip championName={participant.championName} />, e)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleChampionClick(participant.championName)}
                >
                  <img
                    src={getChampionIconUrl(participant.championName)}
                    alt={participant.championName}
                    className="w-12 h-12 rounded-lg transition-colors hover:ring-2 hover:ring-[#C89B3C]"
                  />
                </div>

                {/* KDA */}
                <div className="w-24 text-center">
                  <div className="text-sm">
                    <span className="text-[#F0E6D2]">{participant.kills}</span>
                    <span className="text-[#A09B8C]">/</span>
                    <span className="text-red-500">{participant.deaths}</span>
                    <span className="text-[#A09B8C]">/</span>
                    <span className="text-[#F0E6D2]">{participant.assists}</span>
                  </div>
                  <div className="text-xs text-[#8593A5]">{kda} KDA</div>
                </div>

                {/* Items */}
                <div className="flex gap-1">
                  {[
                    participant.item0,
                    participant.item1,
                    participant.item2,
                    participant.item3,
                    participant.item4,
                    participant.item5,
                    participant.item6
                  ].map((itemId, idx) => (
                    <div 
                      key={idx}
                      onMouseEnter={(e) => itemId && handleMouseEnter(<ItemTooltip itemId={itemId} />, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {itemId ? (
                        <img
                          src={getItemIconUrl(itemId)}
                          alt={`Item ${idx + 1}`}
                          className="w-8 h-8 rounded border border-[#454B54] hover:border-[#C89B3C] transition-colors"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-[#1E2328] rounded border border-[#454B54]" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => setExpandedMatches(prev => ({ ...prev, [match.metadata.matchId]: !prev[match.metadata.matchId] }))}
                  className="ml-auto text-gray-400 hover:text-gray-200"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {isExpanded && <MatchDetails match={match} participant={participant} />}
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-[#010A13]/95 rounded-lg p-4 shadow-lg pointer-events-none"
          style={{
            top: `${tooltip.position.y}px`,
            left: `${tooltip.position.x}px`,
          }}
        >
          {tooltip.content}
        </div>
      )}

      {/* Champion Modal */}
      {selectedChampion && (
        <ChampionModal 
          champion={selectedChampion} 
          onClose={() => setSelectedChampion(null)} 
        />
      )}
    </div>
  );
};

export default PlayerCard;

