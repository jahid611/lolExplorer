import React from 'react';
import { X } from 'lucide-react';
import { Item } from '../types';
import { formatGold } from '../utils';

interface ItemModalProps {
  item: Item | null;
  onClose: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'mythic': return 'text-orange-500';
      case 'legendary': return 'text-purple-500';
      case 'epic': return 'text-blue-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full relative overflow-hidden">
        <div className="absolute top-2 right-2">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <img
              src={item.image}
              alt={item.name}
              className={`w-20 h-20 rounded-lg border-2 ${getRarityColor(item.rarity)}`}
            />
            <div>
              <h3 className={`text-2xl font-bold ${getRarityColor(item.rarity)}`}>
                {item.name}
              </h3>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-yellow-400 font-medium">
                  {formatGold(item.gold.total)} Gold
                </p>
                <p className="text-gray-400">
                  Sells for {formatGold(item.gold.sell)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Stats */}
              {Object.entries(item.stats).length > 0 && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Stats</h4>
                  <div className="space-y-2">
                    {Object.entries(item.stats).map(([stat, value]) => (
                      <div key={stat} className="flex justify-between text-sm">
                        <span className="text-gray-400">{stat}</span>
                        <span className="text-yellow-500">+{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recipe */}
              {item.from && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Recipe</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.from.map((itemId, index) => (
                      <img
                        key={`recipe-${itemId}-${index}`}
                        src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${itemId}.png`}
                        alt="Recipe item"
                        className="w-10 h-10 rounded border border-gray-700/50"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Builds Into */}
              {item.into && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Builds Into</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.into.map((itemId, index) => (
                      <img
                        key={`builds-into-${itemId}-${index}`}
                        src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${itemId}.png`}
                        alt="Builds into"
                        className="w-10 h-10 rounded border border-gray-700/50"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Description</h4>
              <div 
                className="text-sm text-gray-300 leading-relaxed prose prose-invert"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;