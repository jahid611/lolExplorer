import React from 'react';
import PlayerSearch from '../components/PlayerSearch';
import Header from '../components/Header';

const PlayersPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-beaufort relative">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <video autoPlay loop muted playsInline className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover brightness-[0.3]">
          <source src="/src/data/BGionia.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
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

        {/* Footer */}
        <footer className="bg-transparent py-6 mt-auto border-t border-gray-800/30">
          <div className="container mx-auto px-6 text-center text-gray-400/60 text-sm">
            <p>&copy; {new Date().getFullYear()} LoL Explorer - Développé avec l'API Riot Games</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PlayersPage;

