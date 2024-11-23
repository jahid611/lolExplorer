import React, { useState } from 'react';
import { getSummonerByRiotId } from '../api/riot';
import PlayerCard from './PlayerCard';

const PlayerSearch: React.FC = () => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameName || !tagLine) {
      setError('Veuillez entrer un nom et un tag');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getSummonerByRiotId(gameName, tagLine);
      setPlayerData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setPlayerData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form onSubmit={handleSearch} className="space-y-6">
        <input
          type="text"
          placeholder="Nom du joueur"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="w-full p-4 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Tag (#EUW)"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
          className="w-full p-4 border rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-4 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Recherche en cours...' : 'Rechercher'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {playerData && <PlayerCard data={playerData} />}
    </div>
  );
};

export default PlayerSearch;
