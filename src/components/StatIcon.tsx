// StatIcon.tsx
import React from 'react';

interface StatIconProps {
  stat: string;
  className?: string;
}

const getStatIcon = (stat: string): string | null => {
  const icons: Record<string, string> = {
    kills: 'https://example.com/icons/kills.png',
    deaths: 'https://example.com/icons/deaths.png',
    assists: 'https://example.com/icons/assists.png',
    cs: 'https://example.com/icons/cs.png',
    gold: 'https://example.com/icons/gold.png',
  };
  return icons[stat] || null;
};

const StatIcon: React.FC<StatIconProps> = ({ stat, className = "w-6 h-6" }) => {
  const iconUrl = getStatIcon(stat);

  if (!iconUrl) {
    return <div className="text-gray-500">Unknown stat</div>;
  }

  return (
    <img 
      src={iconUrl} 
      alt={stat}
      className={`${className} inline-block`}
    />
  );
};

export default StatIcon;
