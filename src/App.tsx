import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemExplorer from './components/ItemExplorer';
import ItemPage from './components/ItemPage';
import ChampionsPage from './pages/ChampionsPage';
import PlayersPage from './pages/PlayersPage';
import PlayerSearch from './components/PlayerSearch';
import { CustomTooltipProvider } from './components/CustomTooltip';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CustomTooltipProvider>
        <div className="min-h-screen bg-[#010A13] text-[#F0E6D2]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemExplorer />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/champions" element={<ChampionsPage />} />
            <Route path="/players" element={<PlayersPage />}>
              <Route index element={<PlayerSearch />} />
              <Route path=":gameName/:tagLine" element={<PlayersPage />} />
            </Route>
          </Routes>
        </div>
      </CustomTooltipProvider>
    </BrowserRouter>
  );
};

export default App;

