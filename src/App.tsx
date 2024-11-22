import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemExplorer from './components/ItemExplorer';
import ItemPage from './components/ItemPage';
import ChampionsPage from './pages/ChampionsPage';
import PlayersPage from './pages/PlayersPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items" element={<ItemExplorer />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/champions" element={<ChampionsPage />} />
        <Route path="/players" element={<PlayersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

