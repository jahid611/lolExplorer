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
      const tooltipWidth = 280;
      const tooltipHeight = 320;
      const padding = 16;
      const offset = 8;
      
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

  return (
    <div
      style={tooltipStyle}
      className="fixed w-[280px] bg-gray-900/95 rounded-lg shadow-xl border border-gray-700/50 
                transform scale-100 opacity-100 transition-transform duration-75 pointer-events-none z-50"
    >
      <div className="p-3">
        <div className="flex items-start gap-2 mb-3">
          <img
            src={item.image}
            alt={item.name}
            className="w-10 h-10 rounded border border-gray-700/50"
          />
          <div>
            <h3 className="text-base font-bold text-yellow-500">{item.name}</h3>
            <p className="text-yellow-400/90 font-medium text-xs">
              {formatGold(item.price)} Gold
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {Object.entries(item.stats).length > 0 && (
            <div className="bg-gray-800/40 rounded-md p-2">
              <h4 className="text-xs font-medium text-gray-400 mb-1.5">Stats</h4>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(item.stats).map(([stat, value]) => (
                  <div key={stat} className="flex items-center justify-between text-xs gap-1.5">
                    <span className="text-gray-400 flex items-center gap-1">
                      <StatIcon stat={stat} className="w-3 h-3" />
                      {stat}
                    </span>
                    <span className="text-yellow-500">+{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <h4 className="text-xs font-medium text-gray-400">Description</h4>
            <p className="text-xs text-gray-300 leading-relaxed"
               dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemTooltip;