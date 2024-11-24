import React, { useState, useEffect } from 'react';
import { getSummonerByRiotId } from '../api/riot';
import PlayerCard from './PlayerCard';
import { PlayerData } from '../types/player';

const PlayerSearch: React.FC = () => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [matchCount, setMatchCount] = useState(20);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestedMatches, setRequestedMatches] = useState(0);
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    const savedPlayerData = localStorage.getItem('playerData');
    if (savedPlayerData) {
      setPlayerData(JSON.parse(savedPlayerData));
      setShowSearch(false);
    }
  }, []);

  const handleSearch = async () => {
    if (!gameName || !tagLine) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setRequestedMatches(matchCount);
      console.log(`Recherche de ${matchCount} matchs pour ${gameName}#${tagLine}`);
      const data = await getSummonerByRiotId(gameName, tagLine, matchCount);
      setPlayerData(data);
      localStorage.setItem('playerData', JSON.stringify(data));
      setShowSearch(false);
      console.log(`Nombre de matchs récupérés : ${data.recentMatches?.length}`);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la récupération des données.');
      setPlayerData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMatchCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMatchCount(Math.min(Math.max(1, value), 20)); // Limite entre 1 et 20
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const handleNewSearch = () => {
    setShowSearch(true);
    setPlayerData(null);
    localStorage.removeItem('playerData');
  };

  return (
    <div className="min-h-screen text-[#F0E6D2] p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#F0B232] mb-2">
          
        </h1>
        <p className="text-center mb-8 text-[#A09B8C]">
          
        </p>

        {showSearch ? (
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6">
            <input
              type="text"
              placeholder="Game Name"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="bg-[#1E2328]/90 border border-[#785A28] text-[#F0E6D2] p-2 rounded w-64 focus:outline-none focus:border-[#C89B3C]"
            />
            <input
              type="text"
              placeholder="Tag Line"
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value)}
              className="bg-[#1E2328]/90 border border-[#785A28] text-[#F0E6D2] p-2 rounded w-64 focus:outline-none focus:border-[#C89B3C]"
            />
            <input
              type="number"
              placeholder="Number of matches (max 20)"
              value={matchCount}
              onChange={handleMatchCountChange}
              min="1"
              max="20"
              className="bg-[#1E2328]/90 border border-[#785A28] text-[#F0E6D2] p-2 rounded w-64 focus:outline-none focus:border-[#C89B3C]"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-[#1E9DE4]/90 text-white px-6 py-2 rounded hover:bg-[#1A89C7]/90 disabled:opacity-50"
            >
              {isLoading ? 'Recherche...' : 'Rechercher'}
            </button>
          </form>
        ) : (
          <button 
            onClick={handleNewSearch}
            className="bg-[#1E9DE4]/90 text-white px-6 py-2 rounded hover:bg-[#1A89C7]/90 mb-6"
          >
            Rechercher un autre joueur
          </button>
        )}
        
        {error && (
          <div className="text-red-500 mb-4 text-center">
            {error}
          </div>
        )}
        
        {playerData && <PlayerCard data={playerData} requestedMatches={requestedMatches} />}
      </div>
    </div>
  );
};

export default PlayerSearch;

