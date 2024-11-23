import React, { useEffect, useState } from 'react';
import { getSummonerByPuuid } from '../api/riot';

interface PlayerStatsProps {
  summonerInfo: {
    puuid: string;
    gameName: string;
    tagLine: string;
  };
}

interface SummonerData {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ summonerInfo }) => {
  const [summonerData, setSummonerData] = useState<SummonerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const data = await getSummonerByPuuid(summonerInfo.puuid);
        setSummonerData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load summoner data');
      }
    };

    if (summonerInfo.puuid) {
      fetchSummonerData();
    }
  }, [summonerInfo.puuid]);

  if (error) {
    return (
      <div className="bg-[#091428] border border-[#1E2328] rounded-lg p-4 mb-4">
        <p className="text-[#FF4E50]">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#091428] border border-[#1E2328] rounded-lg p-4 mb-4 flex items-center">
      <div className="relative mr-4">
        <img
          src={summonerData?.profileIconId 
            ? `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/${summonerData.profileIconId}.png`
            : 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/0.png'}
          alt="Profile Icon"
          className="w-20 h-20 rounded-full border-2 border-[#C89B3C]"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/0.png';
          }}
        />
        {summonerData?.summonerLevel && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#091428] border border-[#C89B3C] text-[#F0E6D2] px-2 py-0.5 rounded text-sm">
            {summonerData.summonerLevel}
          </span>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold text-[#F0E6D2]">
          {summonerInfo.gameName}
          <span className="text-[#C89B3C] ml-2">#{summonerInfo.tagLine}</span>
        </h1>
        {summonerData?.summonerLevel && (
          <div className="text-sm text-[#A09B8C] mt-1">
            Level {summonerData.summonerLevel}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerStats;

