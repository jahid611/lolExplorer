import React from 'react';
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8">
      {/* Left Column - Profile & Ranked Info */}
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-[#0A1428] rounded-xl border border-[#1E2328] p-8">
          <div className="flex flex-col items-center text-center">
            <img
              src={getProfileIcon(summoner.profileIconId)}
              alt="Profile Icon"
              className="w-48 h-48 rounded-xl border-4 border-[#C89B3C] mb-6"
            />
            <h2 className="text-4xl font-bold text-[#C89B3C] mb-3">
              {account.gameName}
            </h2>
            <p className="text-[#5B5A56] text-2xl mb-2">#{account.tagLine}</p>
            <p className="text-[#F0E6D2] text-3xl font-bold">Level {summoner.summonerLevel}</p>
          </div>
        </div>

        {rankedSolo && (
          <div className="bg-[#0A1428] rounded-xl border border-[#1E2328] p-8">
            <div className="text-center">
              <RankIcon tier={rankedSolo.tier} size="2xl" />
              <h3 className="font-bold text-4xl text-[#C89B3C] mt-6 mb-4">
                {rankedSolo.tier} {rankedSolo.rank}
              </h3>
              <p className="text-[#C89B3C] font-bold text-3xl mb-4">
                {rankedSolo.leaguePoints} LP
              </p>
              <div className="text-2xl text-[#F0E6D2]">
                <p className="mb-2">{rankedSolo.wins}W {rankedSolo.losses}L</p>
                <p className="text-[#C89B3C] font-bold text-3xl">
                  {((rankedSolo.wins / (rankedSolo.wins + rankedSolo.losses)) * 100).toFixed(1)}% Win Rate
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Middle Column - Match History & Stats */}
      <div className="lg:col-span-6 space-y-8">
        <div className="bg-[#0A1428] rounded-xl border border-[#1E2328] p-8">
          <h3 className="font-bold text-3xl text-[#C89B3C] mb-8">Recent Performance</h3>
          <StatsGraph data={getMatchStats()} />
        </div>

        <div className="bg-[#0A1428] rounded-xl border border-[#1E2328] p-8">
          <h3 className="font-bold text-3xl text-[#C89B3C] mb-8">Match History</h3>
          <div className="space-y-6">
            {recentMatches.map(match => {
              const participant = match.info.participants.find(p => p.puuid === account.puuid);
              if (!participant) return null;

              return (
                <div
                  key={match.metadata.matchId}
                  className={`flex items-center gap-6 p-6 rounded-xl ${
                    participant.win ? 'bg-[#28503C]' : 'bg-[#59343B]'
                  }`}
                >
                  <img
                    src={getChampionImage(participant.championId)}
                    alt="Champion"
                    className="w-24 h-24 rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-bold text-3xl ${participant.win ? 'text-[#0ACF83]' : 'text-[#FF4E50]'}`}>
                        {participant.win ? 'Victory' : 'Defeat'}
                      </span>
                      <span className="text-[#5B5A56] text-2xl">
                        {format(match.info.gameCreation, 'MMM d')}
                      </span>
                    </div>
                    <div className="text-2xl text-[#F0E6D2] flex items-center gap-6">
                      <span className="font-bold text-[#C89B3C]">
                        {participant.kills}/{participant.deaths}/{participant.assists}
                      </span>
                      <span>
                        {participant.totalMinionsKilled + participant.neutralMinionsKilled} CS
                      </span>
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
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-[#0A1428] rounded-xl border border-[#1E2328] p-8">
          <h3 className="font-bold text-3xl text-[#C89B3C] mb-8">Champion Mastery</h3>
          <div className="space-y-4">
            {championMastery.map(mastery => (
              <div 
                key={mastery.championId}
                className="flex items-center gap-6 p-4 rounded-xl bg-[#1E2328] hover:bg-[#2B3441] transition-colors"
              >
                <img
                  src={getChampionImage(mastery.championId)}
                  alt="Champion"
                  className="w-20 h-20 rounded-xl"
                />
                <div>
                  <div className="text-[#C89B3C] text-2xl font-bold mb-1">
                    Mastery {mastery.championLevel}
                  </div>
                  <div className="text-[#F0E6D2] text-xl">
                    {(mastery.championPoints / 1000).toFixed(1)}K Points
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0A1428] rounded-xl border border-[#1E2328] p-8">
          <MatchStats matches={recentMatches} puuid={account.puuid} />
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;

