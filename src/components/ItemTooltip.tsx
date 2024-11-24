import React, { useState, useEffect } from 'react';
import { getItemData, getItemIconUrl } from '../utils/dataDragon';

interface ItemTooltipProps {
  itemId: number;
}

interface ItemData {
  name: string;
  description: string;
  plaintext?: string;
  gold: {
    base: number;
    total: number;
    sell: number;
  };
  stats: {
    [key: string]: number;
  };
  from?: string[];
  into?: string[];
}

export const ItemTooltip: React.FC<ItemTooltipProps> = ({ itemId }) => {
  const [itemData, setItemData] = useState<ItemData | null>(null);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const data = await getItemData(itemId);
        setItemData(data);
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    fetchItemData();
  }, [itemId]);

  if (!itemData) return null;

  // Format stats into readable text
  const formatStats = (stats: { [key: string]: number }) => {
    return Object.entries(stats).map(([key, value]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .replace(/^./, str => str.toUpperCase());
      
      const formattedValue = key.includes('Percent') ? `${value}%` : value;
      return `${formattedValue} ${formattedKey}`;
    });
  };

  return (
    <div className="bg-[#010A13]/95 rounded p-2 min-w-[200px] max-w-[240px]">
      <div className="flex items-center gap-1.5 mb-1">
        <img 
          src={getItemIconUrl(itemId)} 
          alt={itemData.name} 
          className="w-5 h-5"
        />
        <h3 className="text-[#F0B232] text-xs font-medium">{itemData.name}</h3>
      </div>

      {itemData.plaintext && (
        <p className="text-[#A09B8C] text-[11px] mb-1">{itemData.plaintext}</p>
      )}

      {Object.keys(itemData.stats).length > 0 && (
        <div className="space-y-0.5 mb-1">
          {formatStats(itemData.stats).map((stat, index) => (
            <p key={index} className="text-[#C89B3C] text-[11px]">{stat}</p>
          ))}
        </div>
      )}

      <div 
        className="text-[#F0E6D2] text-[11px] leading-tight space-y-0.5"
        dangerouslySetInnerHTML={{ __html: itemData.description }}
      />

      {itemData.gold && (
        <div className="mt-1 text-[11px]">
          <span className="text-[#C89B3C]">Cost: </span>
          <span className="text-[#F0E6D2]">{itemData.gold.total}</span>
          {itemData.gold.base !== itemData.gold.total && (
            <span className="text-[#A09B8C]"> ({itemData.gold.base})</span>
          )}
        </div>
      )}

      {itemData.from && itemData.from.length > 0 && (
        <div className="mt-1">
          <p className="text-[#C89B3C] text-[11px] mb-0.5">Recipe:</p>
          <div className="flex gap-0.5">
            {itemData.from.map((recipeItemId) => (
              <img 
                key={recipeItemId} 
                src={getItemIconUrl(parseInt(recipeItemId))} 
                alt="Recipe item" 
                className="w-4 h-4" 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemTooltip;

