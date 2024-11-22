import React from 'react';

interface ChampionTypeProps {
  type: string;
  isActive: boolean;
  onClick: () => void;
}

const ChampionType: React.FC<ChampionTypeProps> = ({ type, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer p-2 rounded transition-all"
    >
      <img
        src={`/src/assets/icons/${type}Icon.png`}
        alt={type.charAt(0).toUpperCase() + type.slice(1)}
        className={`w-16 h-16 transition-all ${isActive ? 'brightness-100' : 'brightness-50'}`}
      />
    </div>
  );
};

export default ChampionType;

