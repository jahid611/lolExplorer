import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';
import { Item } from '../types';
import { formatGold } from '../lib/utils';
import StatIcon from './StatIcon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface ItemModalProps {
  item: Item | null;
  onClose: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'mythic': return 'text-orange-500 border-orange-500';
      case 'legendary': return 'text-purple-500 border-purple-500';
      case 'epic': return 'text-blue-500 border-blue-500';
      default: return 'text-yellow-500 border-yellow-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#010a13] rounded-xl max-w-3xl w-full relative overflow-hidden border border-gray-700">
        <div className="absolute top-2 right-2">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
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

          <Tabs>
            <TabsList>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="recipe">Recipe</TabsTrigger>
              <TabsTrigger value="builds">Builds Into</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="cost-analysis">Cost Analysis</TabsTrigger>
              <TabsTrigger value="gold-efficiency">Gold Efficiency</TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Stats */}
                  {Object.entries(item.stats).length > 0 && (
                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Stats</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(item.stats).map(([stat, value]) => (
                          <div key={stat} className="flex items-center justify-between text-sm">
                            <span className="text-gray-400 flex items-center gap-2">
                              <StatIcon stat={stat} className="w-4 h-4" />
                              {stat}
                            </span>
                            <span className="text-yellow-500">+{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recipe">
              {item.from && (
                <div className="bg-gray-800/30 rounded-lg p-4">
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
            </TabsContent>

            <TabsContent value="builds">
              {item.into && (
                <div className="bg-gray-800/30 rounded-lg p-4">
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
            </TabsContent>

            <TabsContent value="description">
              <div className="bg-gray-800/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Description</h4>
                <div 
                  className="text-sm text-gray-300 leading-relaxed prose prose-invert"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            </TabsContent>

            <TabsContent value="cost-analysis">
              <div className="bg-gray-800/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Cost Analysis</h4>
                <div className="space-y-2">
                  {Object.entries(item.stats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between text-sm">
                      <span className="text-gray-400">{stat}</span>
                      <span className="text-yellow-500">{formatGold(value * 100)} Gold</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gold-efficiency">
              <div className="bg-gray-800/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Gold Efficiency</h4>
                <p className="text-sm text-gray-300">
                  {item.name}'s base stats are {Math.round(item.goldEfficiency * 100)}% gold efficient.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;

