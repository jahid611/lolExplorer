import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../types';
import { formatGold } from '../lib/utils';
import itemDescriptions from '../data/itemdesc.json';

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const itemDesc = itemDescriptions[item.id as keyof typeof itemDescriptions];
  
  const getRarityStyles = (rarity?: string) => {
    switch (rarity) {
      case 'mythic':
        return 'border-orange-500 bg-orange-500/10';
      case 'legendary':
        return 'border-purple-500 bg-purple-500/10';
      case 'epic':
        return 'border-blue-500 bg-blue-500/10';
      default:
        return 'border-[#C89B3C] bg-[#C89B3C]/10';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <Link 
        to={`/item/${item.id}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className={`bg-[#1E2328]/80 p-2 rounded-lg hover:bg-[#2A2E35]/80 transition-colors ${getRarityStyles(item.rarity)}`}>
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 mx-auto mb-2 object-contain"
          />
          <h3 className="text-[#C89B3C] text-center text-sm truncate">{item.name}</h3>
          <p className="text-white text-center text-xs">{item.gold.total} gold</p>
        </div>
      </Link>
      {showTooltip && (
        <div 
          ref={tooltipRef}
          className="absolute z-50 w-80 p-4 bg-[#010A13]/95 border border-[#C89B3C] rounded-lg shadow-lg -top-2 left-full ml-2"
        >
          <div className="flex items-start gap-4 mb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
            <div>
              <h4 className="text-[#C89B3C] font-bold text-lg">{item.name}</h4>
              <p className="text-yellow-400 flex items-center gap-1">
                <span className="text-lg">🪙</span> {formatGold(item.gold.total)}
              </p>
            </div>
          </div>
          <div 
            className="text-sm text-gray-300 mb-4"
            dangerouslySetInnerHTML={{ __html: itemDesc?.mainText || item.description }}
          />
          {Object.entries(item.stats).length > 0 && (
            <div className="mb-4">
              <h5 className="text-[#C89B3C] font-semibold mb-2">Stats:</h5>
              {Object.entries(item.stats).map(([stat, value]) => (
                <p key={stat} className="text-sm text-gray-300">
                  <span className="text-[#C89B3C]">{stat}:</span> {value}
                </p>
              ))}
            </div>
          )}
          {item.from && item.from.length > 0 && (
            <div className="mb-4">
              <h5 className="text-[#C89B3C] font-semibold mb-2">Recipe:</h5>
              <div className="flex gap-2">
                {item.from.map((itemId) => (
                  <img 
                    key={itemId}
                    src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${itemId}.png`}
                    alt="Recipe item"
                    className="w-8 h-8 rounded border border-gray-700"
                  />
                ))}
              </div>
            </div>
          )}
          {item.into && item.into.length > 0 && (
            <div>
              <h5 className="text-[#C89B3C] font-semibold mb-2">Builds Into:</h5>
              <div className="flex gap-2">
                {item.into.map((itemId) => (
                  <img 
                    key={itemId}
                    src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${itemId}.png`}
                    alt="Builds into item"
                    className="w-8 h-8 rounded border border-gray-700"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

