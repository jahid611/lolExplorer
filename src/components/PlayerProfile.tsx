import React from 'react';
import { RankDisplay } from './RankDisplay';
import { WinRateCircle } from './WinRateCircle';
import { MatchList } from './MatchList';
import { PlayerStats, Match } from '../types/match';

interface PlayerProfileProps {
  summonerName: string;
  soloStats: PlayerStats;
  flexStats: PlayerStats;
  matches: Match[];
}

export const PlayerProfile: React.FC<PlayerProfileProps> = ({
  summonerName,
  soloStats,
  flexStats,
  matches,
}) => {
  return (
    <div className="bg-[#15171C] text-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column */}
          <div className="col-span-3">
            <RankDisplay stats={soloStats} type="solo" />
            <div className="mt-4">
              <RankDisplay stats={flexStats} type="flex" />
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-9">
            <div className="bg-[#1C1C1F] p-4 rounded-lg mb-4">
              <div className="flex items-center gap-8">
                <WinRateCircle winRate={soloStats.winRate} />
                <div>
                  <h2 className="text-2xl font-bold mb-2">{summonerName}</h2>
                  <div className="text-[#98A0A7]">
                    Taux de victoire {soloStats.winRate}% ({soloStats.wins}V {soloStats.losses}D)
                  </div>
                </div>
              </div>
            </div>

            <MatchList matches={matches} summonerName={summonerName} />
          </div>
        </div>
      </div>
    </div>
  );
};

