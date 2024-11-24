import React, { useState } from 'react';
import { getSummonerByRiotId, getMatchesByPuuid } from '../api/riot';
import PlayerCard from './PlayerCard';
import { PlayerData } from '../types/player';

const PlayerSearch: React.FC = () => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!gameName || !tagLine) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const summonerData = await getSummonerByRiotId(gameName, tagLine);
      const matchData = await getMatchesByPuuid(summonerData.puuid);
      
      setPlayerData({
        ...summonerData,
        recentMatches: matchData
      });
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la récupération des données.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010A13] text-[#F0E6D2] p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#F0B232] mb-2">
          Player Search
        </h1>
        <p className="text-center mb-8 text-[#A09B8C]">
          Search for League of Legends players and view their stats.
        </p>
        
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Game Name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="bg-[#1E2328] border border-[#785A28] text-[#F0E6D2] p-2 rounded w-64 focus:outline-none focus:border-[#C89B3C]"
          />
          <input
            type="text"
            placeholder="Tag Line"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            className="bg-[#1E2328] border border-[#785A28] text-[#F0E6D2] p-2 rounded w-64 focus:outline-none focus:border-[#C89B3C]"
          />
          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-[#1E9DE4] text-white px-6 py-2 rounded hover:bg-[#1A89C7] disabled:opacity-50"
          >
            {isLoading ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>
        
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}
        
        {playerData && <PlayerCard data={playerData} />}
      </div>
    </div>
  );
};

export default PlayerSearch;

