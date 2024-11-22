import React from 'react';
import { getStatIcon } from '../utils/items';

interface StatIconProps {
  stat: string;
  className?: string;
}

const StatIcon: React.FC<StatIconProps> = ({ stat, className = "w-4 h-4" }) => {
  const iconUrl = getStatIcon(stat);
  
  if (!iconUrl) return null;

  return (
    <img 
      src={iconUrl} 
      alt={stat}
      className={`${className} inline-block`}
    />
  );
};

export default StatIcon;