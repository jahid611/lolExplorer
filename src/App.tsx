import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemsPage from './pages/ItemsPage';
import ItemPage from './pages/ItemPage';
import ChampionsPage from './pages/ChampionsPage';
import PlayersPage from './pages/PlayersPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen relative">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <img
            src="https://nexus.leagueoflegends.com/wp-content/uploads/2019/12/HQ_Header_Ask_Riot_Preseaosn_f8i1ljevnti7wpo7oh2n.png"
            alt="League of Legends Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<ItemsPage />} />
            <Route path="/items/:id" element={<ItemPage />} />
            <Route path="/champions" element={<ChampionsPage />} />
            <Route path="/players" element={<PlayersPage />} />
          </Routes>
          <footer className="bg-transparent py-6 mt-12 border-t border-gray-800/30">
            <div className="container mx-auto px-4 text-center text-gray-400/60 text-sm">
              <p>© {new Date().getFullYear()} League Explorer. Not affiliated with Riot Games.</p>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;