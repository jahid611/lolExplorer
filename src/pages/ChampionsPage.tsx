import React from 'react';
import ChampionExplorer from '../components/ChampionExplorer';

const ChampionsPage: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-block">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
            League of Legends Champions
          </h1>
          <div className="h-0.5 w-32 bg-gradient-to-r from-yellow-300 to-yellow-600 mx-auto rounded-full"></div>
        </div>
        <p className="text-gray-300 max-w-2xl mx-auto mt-4 text-sm">
          Explore all champions from League of Legends, their abilities, skins, and stats.
        </p>
      </div>
      <ChampionExplorer />
    </main>
  );
};

export default ChampionsPage;