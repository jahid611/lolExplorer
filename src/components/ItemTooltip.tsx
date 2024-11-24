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
  from?: string[];
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

  return (
    <div className="bg-[#010A13]/95 rounded p-3 min-w-[240px] max-w-[280px]">
      <div className="flex items-center gap-2 mb-2">
        <img src={getItemIconUrl(itemId)} alt={itemData.name} className="w-8 h-8" />
        <h3 className="text-[#F0B232] text-sm font-medium">{itemData.name}</h3>
      </div>
      
      {itemData.plaintext && (
        <p className="text-[#A09B8C] text-xs mb-2">{itemData.plaintext}</p>
      )}
      
      <div className="text-[#F0E6D2] text-xs leading-tight space-y-1" 
           dangerouslySetInnerHTML={{ __html: itemData.description }} />
      
      {itemData.gold && (
        <div className="mt-2 text-xs">
          <span className="text-[#C89B3C]">Cost: </span>
          <span className="text-[#F0E6D2]">{itemData.gold.total}</span>
          {itemData.gold.base !== itemData.gold.total && (
            <span className="text-[#A09B8C]"> ({itemData.gold.base})</span>
          )}
        </div>
      )}
      
      {itemData.from && itemData.from.length > 0 && (
        <div className="mt-2">
          <p className="text-[#C89B3C] text-xs mb-1">Recipe:</p>
          <div className="flex gap-1">
            {itemData.from.map((recipeItemId: string) => (
              <img 
                key={recipeItemId} 
                src={getItemIconUrl(parseInt(recipeItemId))} 
                alt="Recipe item" 
                className="w-6 h-6" 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemTooltip;

