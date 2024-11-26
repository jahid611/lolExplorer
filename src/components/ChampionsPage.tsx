import React from 'react';
import { ChampionTooltip } from './ChampionTooltip';
import { getChampionIconUrl } from '../utils/api';

const ChampionsPage: React.FC = () => {
  // Assume you have a list of champion IDs
  const championIds = ['Aatrox', 'Ahri', 'Akali', 'Alistar'];

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {championIds.map((championId) => (
        <ChampionTooltip key={championId} championId={championId}>
          <img src={getChampionIconUrl(championId)} alt={championId} className="w-16 h-16 rounded-full" />
        </ChampionTooltip>
      ))}
    </div>
  );
};

export default ChampionsPage;

