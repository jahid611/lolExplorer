import React from 'react';
import PlayerSearch from '../components/PlayerSearch';

const PlayersPage: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-block">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
            Player Search
          </h1>
          <div className="h-0.5 w-32 bg-gradient-to-r from-yellow-300 to-yellow-600 mx-auto rounded-full"></div>
        </div>
        <p className="text-gray-300 max-w-2xl mx-auto mt-4 text-sm">
          Search for League of Legends players and view their stats.
        </p>
      </div>
      <PlayerSearch />
    </main>
  );
};

export default PlayersPage;