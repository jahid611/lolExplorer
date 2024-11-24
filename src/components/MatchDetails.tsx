import React, { useState } from 'react';
import { Match, Participant } from '../types/player';
import { getChampionIconUrl, getItemIconUrl } from '../utils/dataDragon';
import { ChampionTooltip } from './ChampionTooltip';
import { ItemTooltip } from './ItemTooltip';

interface MatchDetailsProps {
  match: Match;
  participant: Participant;
}

export default function MatchDetails({ match, participant }: MatchDetailsProps) {
  const [tooltip, setTooltip] = useState<{
    content: React.ReactNode;
    position: { x: number; y: number };
  } | null>(null);

  const formatPlayerData = (p: Participant) => ({
    championName: p.championName,
    summonerName: p.summonerName,
    kda: `${p.kills}/${p.deaths}/${p.assists}`,
    damage: {
      dealt: p.totalDamageDealtToChampions || 0,
      received: p.totalDamageTaken || 0
    },
    cs: {
      total: (p.totalMinionsKilled || 0) + (p.neutralMinionsKilled || 0),
      perMinute: ((p.totalMinionsKilled || 0) + (p.neutralMinionsKilled || 0)) / (match.info.gameDuration / 60)
    },
    vision: p.visionScore || 0,
    items: [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6].filter(Boolean)
  });

  const team1 = match.info.participants.slice(0, 5).map(formatPlayerData);
  const team2 = match.info.participants.slice(5).map(formatPlayerData);

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

  const renderPlayerStats = (stats: ReturnType<typeof formatPlayerData>) => (
    <div className="flex items-center gap-4 py-2 px-4 border-b border-[#1E2328] last:border-0 hover:bg-[#1E2328]/50 transition-colors">
      {/* Champion Icon with Tooltip */}
      <div className="flex items-center gap-3 w-[180px]">
        <div 
          className="relative"
          onMouseEnter={(e) => handleMouseEnter(<ChampionTooltip championName={stats.championName} />, e)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={getChampionIconUrl(stats.championName)}
            alt={stats.championName}
            className="w-8 h-8 rounded-lg border border-[#785A28] hover:border-[#C89B3C] transition-colors"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[#F0E6D2] text-sm font-medium truncate">
            {stats.summonerName}
          </span>
          <span className="text-[#A09B8C] text-xs">{stats.kda}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-8 flex-1 text-sm">
        <div>
          <span className="text-[#F0E6D2]">{stats.damage.dealt.toLocaleString()}</span>
          <span className="text-[#A09B8C] text-xs ml-1">dmg</span>
        </div>
        <div>
          <span className="text-[#F0E6D2]">{stats.cs.total}</span>
          <span className="text-[#A09B8C] text-xs ml-1">
            ({stats.cs.perMinute.toFixed(1)})
          </span>
        </div>
        <div>
          <span className="text-[#F0E6D2]">{stats.vision}</span>
          <span className="text-[#A09B8C] text-xs ml-1">vision</span>
        </div>
      </div>

      {/* Items */}
      <div className="flex gap-1">
        {stats.items.map((itemId, idx) => (
          <div 
            key={idx}
            onMouseEnter={(e) => handleMouseEnter(<ItemTooltip itemId={itemId} />, e)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={getItemIconUrl(itemId)}
              alt={`Item ${idx + 1}`}
              className="w-8 h-8 rounded border border-[#454B54] hover:border-[#C89B3C] transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-4 bg-[#0A1428] rounded-lg overflow-hidden">
      <div className="space-y-4 p-4">
        {/* Team 1 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
            <h3 className="text-[#F0B232] text-sm font-semibold">Équipe 1</h3>
          </div>
          <div className="bg-[#1A1C21]/50 rounded-lg overflow-hidden">
            {team1.map((player, idx) => (
              <div key={idx}>{renderPlayerStats(player)}</div>
            ))}
          </div>
        </div>

        {/* Team 2 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4 bg-red-500 rounded-full"></div>
            <h3 className="text-[#F0B232] text-sm font-semibold">Équipe 2</h3>
          </div>
          <div className="bg-[#1A1C21]/50 rounded-lg overflow-hidden">
            {team2.map((player, idx) => (
              <div key={idx}>{renderPlayerStats(player)}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-[#010A13]/95 border border-[#C89B3C] rounded-lg p-4 shadow-lg pointer-events-none"
          style={{
            top: `${tooltip.position.y}px`,
            left: `${tooltip.position.x}px`,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}

