import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { getPlayerByNameAndTag, PLATFORMS, PlatformId } from '../api/riot';
import PlayerCard from './PlayerCard';

const PlayerSearch: React.FC = () => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [platform, setPlatform] = useState<PlatformId>('EUW1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameName || !tagLine) {
      setError('Please enter both game name and tag');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getPlayerByNameAndTag(gameName, tagLine, platform);
      setPlayerData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch player data');
      setPlayerData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Game Name"
                className="w-full px-3 py-2 bg-gray-800/50 rounded-md border border-gray-700/50 
                         focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-sm"
              />
            </div>
            <div className="w-24">
              <input
                type="text"
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
                placeholder="Tag"
                className="w-full px-3 py-2 bg-gray-800/50 rounded-md border border-gray-700/50 
                         focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformId)}
              className="flex-1 px-3 py-2 bg-gray-800/50 rounded-md border border-gray-700/50 
                       focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-sm"
            >
              {Object.entries(PLATFORMS).map(([id, { name }]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 
                       rounded-md transition-colors duration-150 disabled:opacity-50"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 rounded-md p-2">
              {error}
            </div>
          )}
        </form>
      </div>

      {playerData && <PlayerCard data={playerData} />}
    </div>
  );
};

export default PlayerSearch;