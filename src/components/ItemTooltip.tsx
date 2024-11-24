import React, { useState, useEffect } from 'react';
import { getItemData, getItemIconUrl } from '../utils/dataDragon';

interface ItemTooltipProps {
  itemId: number;
}

export const ItemTooltip: React.FC<ItemTooltipProps> = ({ itemId }) => {
  const [itemData, setItemData] = useState<any>(null);

  useEffect(() => {
    const fetchItemData = async () => {
      const data = await getItemData(itemId);
      setItemData(data);
    };
    fetchItemData();
  }, [itemId]);

  if (!itemData) return null;

  return (
    <div className="bg-[#010A13] border border-[#C89B3C] rounded-lg p-4 max-w-xs">
      <div className="flex items-center gap-2 mb-2">
        <img src={getItemIconUrl(itemId)} alt={itemData.name} className="w-8 h-8" />
        <h3 className="text-[#C89B3C] font-bold">{itemData.name}</h3>
      </div>
      <p className="text-[#A09B8C] text-sm mb-2">{itemData.plaintext}</p>
      <div className="text-[#F0E6D2] text-sm" dangerouslySetInnerHTML={{ __html: itemData.description }} />
      {itemData.gold && (
        <p className="text-[#C89B3C] text-sm mt-2">Cost: {itemData.gold.total} ({itemData.gold.base})</p>
      )}
      {itemData.from && itemData.from.length > 0 && (
        <div className="mt-2">
          <p className="text-[#C89B3C] text-sm">Recipe:</p>
          <div className="flex gap-1 mt-1">
            {itemData.from.map((recipeItemId: string) => (
              <img key={recipeItemId} src={getItemIconUrl(parseInt(recipeItemId))} alt="Recipe item" className="w-6 h-6" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

