import React, { useEffect, useState } from 'react';
import { Item } from '../types';
import { formatGold } from '../utils';
import StatIcon from './StatIcon';

interface ItemTooltipProps {
  item: Item;
  position: { x: number; y: number };
}

const ItemTooltip: React.FC<ItemTooltipProps> = ({ item, position }) => {
  const [tooltipStyle, setTooltipStyle] = useState({});

  useEffect(() => {
    const calculatePosition = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const tooltipWidth = 320;
      const tooltipHeight = 400;
      const padding = 16;
      const offset = 12;
      
      let x = position.x + offset;
      let y = position.y + offset;
      
      if (x + tooltipWidth > viewportWidth - padding) {
        x = position.x - tooltipWidth - offset;
      }
      
      if (y + tooltipHeight > viewportHeight - padding) {
        y = viewportHeight - tooltipHeight - padding;
      }
      
      x = Math.max(padding, x);
      y = Math.max(padding, y);
      
      return {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translateZ(0)',
        willChange: 'transform',
      };
    };

    setTooltipStyle(calculatePosition());
  }, [position]);

  const getRarityBorder = (rarity?: string) => {
    switch (rarity) {
      case 'mythic': return 'border-orange-500';
      case 'legendary': return 'border-purple-500';
      case 'epic': return 'border-blue-500';
      default: return 'border-yellow-500';
    }
  };

  const calculateRecipeCost = (components: string[]) => {
    return components.reduce((total, itemId) => {
      // Simuler le coût des composants - à remplacer par les vrais coûts
      return total + 1000;
    }, 0);
  };

  return (
    <div
      style={tooltipStyle}
      className={`fixed w-[320px] bg-[#010a13]/95 rounded-lg shadow-xl border ${getRarityBorder(item.rarity)} 
                transform scale-100 opacity-100 transition-transform duration-75 pointer-events-none z-50`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <img
            src={item.image}
            alt={item.name}
            className={`w-12 h-12 rounded border ${getRarityBorder(item.rarity)}`}
          />
          <div className="flex-1">
            <h3 className="text-base font-bold text-yellow-500">{item.name}</h3>
            <p className="text-yellow-400/90 font-medium text-xs flex items-center gap-1">
              <span className="text-lg">🪙</span> {formatGold(item.gold.total)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Stats de base */}
          {Object.entries(item.stats).length > 0 && (
            <div className="space-y-1">
              {Object.entries(item.stats).map(([stat, value]) => (
                <div key={stat} className="text-gray-200 text-sm">
                  <span className="text-blue-400">{stat}:</span>{' '}
                  <span className="text-yellow-500">+{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Description avec mise en valeur */}
          <div className="space-y-2">
            {item.active && (
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-purple-400">ACTIVE - UNIQUE:</h4>
                <p className="text-sm text-gray-300">
                  <span className="text-yellow-400">{item.active.name}:</span>{' '}
                  <span dangerouslySetInnerHTML={{ 
                    __html: item.active.description.replace(
                      /(\d+%|\d+ seconds|\b(bonus|movement speed|ghosting)\b)/gi,
                      '<span class="text-blue-400">$1</span>'
                    )
                  }} />
                </p>
              </div>
            )}

            {item.passive && (
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-blue-400">PASSIVE:</h4>
                <p className="text-sm text-gray-300">
                  <span className="text-yellow-400">{item.passive.name}:</span>{' '}
                  <span dangerouslySetInnerHTML={{ 
                    __html: item.passive.description.replace(
                      /(\d+%|\d+ seconds|\b(bonus|movement speed)\b)/gi,
                      '<span class="text-blue-400">$1</span>'
                    )
                  }} />
                </p>
              </div>
            )}
          </div>

          {/* Limitations */}
          {item.limitations && (
            <div className="text-xs text-red-400">
              {item.limitations}
            </div>
          )}

          {/* Recipe */}
          {item.from && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-400">Recipe</h4>
              <div className="flex flex-wrap gap-2">
                {item.from.map((itemId, index) => (
                  <div key={`recipe-${itemId}-${index}`} className="relative">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${itemId}.png`}
                      alt="Recipe item"
                      className="w-8 h-8 rounded border border-gray-700/50"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-black/80 px-1 rounded-sm text-[10px] flex items-center">
                      <span className="text-xs">🪙</span>
                      <span className="text-yellow-400 ml-0.5">
                        {formatGold(calculateRecipeCost([itemId]))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span>Total cost:</span>
                <span className="text-xs">🪙</span>
                <span className="text-yellow-400">
                  {formatGold(item.gold.total)}
                </span>
                <span className="text-gray-600">
                  (Combine cost: {formatGold(item.gold.base)})
                </span>
              </div>
            </div>
          )}

          {/* Builds Into */}
          {item.into && item.into.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-400">Se construit en</h4>
              <div className="flex flex-wrap gap-2">
                {item.into.map((itemId, index) => (
                  <img
                    key={`builds-into-${itemId}-${index}`}
                    src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${itemId}.png`}
                    alt="Builds into"
                    className="w-8 h-8 rounded border border-gray-700/50"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemTooltip;

