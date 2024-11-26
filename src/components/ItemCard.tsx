import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../types';
import { formatGold } from '../lib/utils';

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updateTooltipPosition = () => {
    if (cardRef.current && tooltipRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = cardRect.top;
      let left = cardRect.right + 10;

      if (left + tooltipRect.width > viewportWidth) {
        left = cardRect.left - tooltipRect.width - 10;
      }

      if (top + tooltipRect.height > viewportHeight) {
        top = viewportHeight - tooltipRect.height - 10;
      }

      setTooltipPosition({ top, left });
    }
  };

  useEffect(() => {
    if (showTooltip) {
      updateTooltipPosition();
      window.addEventListener('scroll', updateTooltipPosition);
      window.addEventListener('resize', updateTooltipPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateTooltipPosition);
      window.removeEventListener('resize', updateTooltipPosition);
    };
  }, [showTooltip]);

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

  return (
    <div 
      ref={cardRef}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Link to={`/item/${item.id}`}>
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
          className="fixed z-50 w-80 p-4 bg-[#010A13]/95 border border-[#C89B3C] rounded-lg shadow-lg"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
            <div>
              <h4 className="text-[#C89B3C] font-bold text-lg">{item.name}</h4>
              <p className="text-yellow-400 flex items-center gap-1">
                <span className="text-lg">🪙</span> {formatGold(item.gold.total)}
                {item.gold.base !== item.gold.total && (
                  <span className="text-sm text-gray-400">({formatGold(item.gold.base)})</span>
                )}
              </p>
            </div>
          </div>

          <div 
            className="text-sm text-gray-300 mb-4 space-y-2"
          />

          {Object.entries(item.stats).length > 0 && (
            <div className="mb-4">
              <h5 className="text-[#C89B3C] font-semibold mb-2">Stats:</h5>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(item.stats).map(([stat, value]) => (
                  <p key={stat} className="text-sm text-gray-300">
                    <span className="text-[#C89B3C]">{stat}:</span> {value}
                  </p>
                ))}
              </div>
            </div>
          )}

          {item.from && item.from.length > 0 && (
            <div className="mb-4">
              <h5 className="text-[#C89B3C] font-semibold mb-2">Recipe:</h5>
              <div className="flex flex-wrap gap-2">
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
              <div className="flex flex-wrap gap-2">
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

