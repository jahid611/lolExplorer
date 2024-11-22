import React, { useState } from 'react';
import { format } from 'date-fns';
import { PlayerData } from '../types/riot';
import RankIcon from './RankIcon';
import StatsGraph from './StatsGraph';
import MatchStats from './MatchStats';

interface PlayerCardProps {
  data: PlayerData;
}

const getChampionImage = (championId: number) => {
  return `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${championId}.png`;
};

const getProfileIcon = (iconId: number) => {
  return `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/${iconId}.png`;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ data }) => {
  const { account, summoner, leagues, recentMatches, championMastery } = data;
  const rankedSolo = leagues.find(league => league.queueType === 'RANKED_SOLO_5x5');

  const getMatchStats = () => {
    return recentMatches.map((match, index) => {
      const participant = match.info.participants.find(p => p.puuid === account.puuid);
      if (!participant) return null;

      return {
        game: index + 1,
        kda: ((participant.kills + participant.assists) / Math.max(participant.deaths, 1)),
        cs: participant.totalMinionsKilled + participant.neutralMinionsKilled,
        gold: participant.goldEarned / 1000
      };
    }).filter(Boolean);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left Column - Profile & Ranked Info */}
      <div className="col-span-3 space-y-4">
        <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700/30 p-4">
          <div className="flex flex-col items-center text-center">
            <img
              src={getProfileIcon(summoner.profileIconId)}
              alt="Profile Icon"
              className="w-24 h-24 rounded-lg border-2 border-yellow-500/50 mb-3"
            />
            <h2 className="text-xl font-bold text-yellow-500">
              {account.gameName}
            </h2>
            <p className="text-gray-400 text-sm">#{account.tagLine}</p>
            <p className="text-gray-400 text-sm mt-1">Level {summoner.summonerLevel}</p>
          </div>
        </div>

        {rankedSolo && (
          <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700/30 p-4">
            <div className="text-center">
              <RankIcon tier={rankedSolo.tier} size="lg" />
              <h3 className="font-bold text-lg text-yellow-500 mt-2">
                {rankedSolo.tier} {rankedSolo.rank}
              </h3>
              <p className="text-yellow-400 font-medium">
                {rankedSolo.leaguePoints} LP
              </p>
              <div className="mt-2 text-sm text-gray-400">
                {rankedSolo.wins}W {rankedSolo.losses}L
                <p className="text-yellow-500">
                  {((rankedSolo.wins / (rankedSolo.wins + rankedSolo.losses)) * 100).toFixed(1)}% Win Rate
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Middle Column - Match History & Stats */}
      <div className="col-span-6 space-y-4">
        <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700/30 p-4">
          <h3 className="font-bold text-gray-300 mb-4">Recent Performance</h3>
          <StatsGraph data={getMatchStats()} />
        </div>

        <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700/30 p-4">
          <h3 className="font-bold text-gray-300 mb-4">Match History</h3>
          <div className="space-y-2">
            {recentMatches.map(match => {
              const participant = match.info.participants.find(p => p.puuid === account.puuid);
              if (!participant) return null;

              return (
                <div
                  key={match.metadata.matchId}
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    participant.win ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}
                >
                  <img
                    src={getChampionImage(participant.championId)}
                    alt="Champion"
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${participant.win ? 'text-green-400' : 'text-red-400'}`}>
                        {participant.win ? 'Victory' : 'Defeat'}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {format(match.info.gameCreation, 'MMM d')}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      <span className="font-medium text-yellow-500">
                        {participant.kills}/{participant.deaths}/{participant.assists}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {participant.totalMinionsKilled + participant.neutralMinionsKilled} CS
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {(participant.goldEarned / 1000).toFixed(1)}k Gold
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column - Champion Mastery & Match Stats */}
      <div className="col-span-3 space-y-4">
        <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700/30 p-4">
          <h3 className="font-bold text-gray-300 mb-3">Champion Mastery</h3>
          <div className="space-y-2">
            {championMastery.map(mastery => (
              <div 
                key={mastery.championId}
                className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
              >
                <img
                  src={getChampionImage(mastery.championId)}
                  alt="Champion"
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <div className="text-yellow-500 text-sm font-medium">
                    Mastery {mastery.championLevel}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {(mastery.championPoints / 1000).toFixed(1)}K Points
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700/30 p-4">
          <MatchStats matches={recentMatches} puuid={account.puuid} />
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;