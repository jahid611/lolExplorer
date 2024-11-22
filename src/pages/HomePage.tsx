import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ChampionType from '../components/ChampionType';

const championImages = {
  assassins: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/befd42ad6d2564159a441d08cfc3bf511532eb74-1628x1628.png?auto=format&fit=fill&q=80&w=736',
  mages: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/ff6c8c57411e5c7e0551b02334fccedc78866143-1628x1628.png?auto=format&fit=fill&q=80&w=736',
  tireurs: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/f136500bd46f823d37515a72b867425d3a0b3e54-1628x1628.png?auto=format&fit=fill&q=80&w=736',
  tanks: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/95daf6dd2b28f03d5ba2ea1fabbabc3bc3ff6e6e-1628x1628.png?auto=format&fit=fill&q=80&w=736',
  combattants: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/70c26e49de8a2c79ac3de144772d2debd195edff-1628x1628.png?auto=format&fit=fill&q=80&w=736',
  supports: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/dbdded937cd214bb2a1189697a9e4f49f8c04505-1628x1628.png?auto=format&fit=fill&q=80&w=736',
};

const HomePage: React.FC = () => {
  const [activeChampionType, setActiveChampionType] = useState('assassins');

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
        <main className="flex-grow flex justify-center items-center px-10 py-20">
          <div className="flex justify-between items-center w-full max-w-7xl">
            <div className="flex-1 max-w-[550px] -ml-[100px]">
              <h1 className="text-white text-[2.8rem] font-extrabold leading-tight mb-4">CHOISISSEZ VOTRE</h1>
              <h2 className="font-beaufort font-bold italic text-[3.2rem] tracking-tight uppercase text-[#C89B3C] mb-6">CHAMPION</h2>
              <p className="text-white/80 text-lg max-w-[500px] mb-10">
                Que vous souhaitiez foncer dans la mêlée, soutenir vos alliés ou trouver un entre-deux, vous trouverez forcément votre bonheur dans la Faille.
              </p>
              <div className="flex gap-6 mb-12">
                <Link 
                  to="/champions" 
                  className="px-10 py-4 text-base font-semibold uppercase bg-[#C89B3C] text-black rounded hover:bg-[#A17A2C] transition-colors"
                >
                  DÉCOUVRIR LES CHAMPIONS
                </Link>
              </div>
              <div className="flex justify-between items-center max-w-[500px] gap-4">
                {Object.keys(championImages).map((type) => (
                  <ChampionType
                    key={type}
                    type={type}
                    isActive={activeChampionType === type}
                    onClick={() => setActiveChampionType(type)}
                  />
                ))}
              </div>
            </div>
            <div className="relative w-[600px] h-[600px]">
              <img
                src={championImages[activeChampionType]}
                alt="Champion"
                className="w-[110%] h-[110%] object-contain rounded-full"
              />
            </div>
          </div>
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

export default HomePage;

