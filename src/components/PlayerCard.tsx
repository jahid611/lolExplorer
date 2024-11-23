import React from 'react';

interface PlayerCardProps {
  data: {
    gameName: string;
    tagLine: string;
    puuid?: string;
  };
}

const PlayerCard: React.FC<PlayerCardProps> = ({ data }) => {
  console.log('Données reçues dans PlayerCard:', data); // Log ici
  return (
    <div className="bg-[#0A1428] rounded-xl p-8 text-[#F0E6D2] border border-[#785A28] shadow-lg">
      <h2 className="text-3xl font-bold text-[#C89B3C] mb-4">
        {data.gameName}#{data.tagLine}
      </h2>
      {data.puuid && <p>PUUID: {data.puuid}</p>}
    </div>
  );
};

export default PlayerCard;
