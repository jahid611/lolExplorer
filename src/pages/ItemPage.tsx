import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useItems } from '../hooks/useItems';
import { ArrowLeft, Coins } from 'lucide-react';
import StatIcon from '../components/StatIcon';
import { formatGold } from '../utils';

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items } = useItems();
  const item = items.find(i => i.id === id);

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        Item not found
      </div>
    );
  }

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'mythic': return 'text-orange-500 border-orange-500';
      case 'legendary': return 'text-purple-500 border-purple-500';
      case 'epic': return 'text-blue-500 border-blue-500';
      default: return 'text-yellow-500 border-yellow-500';
    }
  };

  const formatDescription = (description: string) => {
    return description
      .replace(/(\+\d+(?:\.\d+)?%?(?:\s+[\w\s]+))/g, '<span class="text-green-400">$1</span>')
      .replace(/UNIQUE Passive/g, '<span class="text-yellow-500 font-semibold">UNIQUE Passive</span>')
      .replace(/UNIQUE Active/g, '<span class="text-blue-500 font-semibold">UNIQUE Active</span>')
      .replace(/MYTHIC Passive/g, '<span class="text-orange-500 font-semibold">MYTHIC Passive</span>');
  };

  const renderRecipeItem = (recipeItem: typeof items[0], type: 'recipe' | 'builds-into', index: number) => (
    <Link
      to={`/items/${recipeItem.id}`}
      key={`${type}-${recipeItem.id}-${index}`}
      className="text-center group relative hover:scale-105 transition-transform duration-200"
    >
      <div className={`rounded border ${getRarityColor(recipeItem.rarity)} p-0.5 bg-gray-900/40`}>
        <img
          src={recipeItem.image}
          alt={recipeItem.name}
          className="w-12 h-12 rounded"
        />
      </div>
      <div className="flex items-center justify-center gap-1 mt-1">
        <Coins className="w-3 h-3 text-yellow-500" />
        <p className="text-xs text-yellow-500">{formatGold(recipeItem.gold.total)}</p>
      </div>
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 px-2 py-1 rounded
                    text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        {recipeItem.name}
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-8 px-4 py-2 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg 
                 text-gray-300 hover:text-white flex items-center gap-2 transition-colors
                 border border-gray-700/30 hover:border-yellow-500/50"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Items
      </button>

      <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700/30 max-w-4xl mx-auto shadow-xl">
        <div className="p-8">
          <div className="flex items-start gap-6 mb-8">
            <img
              src={item.image}
              alt={item.name}
              className={`w-24 h-24 rounded-lg border-2 ${getRarityColor(item.rarity)}`}
            />
            <div>
              <h1 className={`text-3xl font-bold ${getRarityColor(item.rarity)}`}>
                {item.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <p className="text-yellow-400 font-medium text-lg">
                    {formatGold(item.gold.total)}
                  </p>
                </div>
                <p className="text-gray-400">
                  Sells for {formatGold(item.gold.sell)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stats */}
            {Object.entries(item.stats).length > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-300 mb-4">Stats</h2>
                <div className="space-y-3">
                  {Object.entries(item.stats).map(([stat, value]) => (
                    <div key={`stat-${stat}`} className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-2">
                        <StatIcon stat={stat} />
                        {stat}
                      </span>
                      <span className="text-green-400 font-medium">+{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recipe */}
            {item.from && item.from.length > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-300 mb-4">Recipe</h2>
                <div className="flex flex-wrap gap-4">
                  {item.from.map((itemId, index) => {
                    const recipeItem = items.find(i => i.id === itemId);
                    return recipeItem ? renderRecipeItem(recipeItem, 'recipe', index) : null;
                  })}
                </div>
              </div>
            )}

            {/* Builds Into */}
            {item.into && item.into.length > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-300 mb-4">Builds Into</h2>
                <div className="flex flex-wrap gap-4">
                  {item.into.map((itemId, index) => {
                    const buildItem = items.find(i => i.id === itemId);
                    return buildItem ? renderRecipeItem(buildItem, 'builds-into', index) : null;
                  })}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-gray-800/50 rounded-lg p-6 md:col-span-2">
              <h2 className="text-lg font-medium text-gray-300 mb-4">Description</h2>
              <div 
                className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: formatDescription(item.description) }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;