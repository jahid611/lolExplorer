import React, { useState, useEffect } from 'react';

interface ItemData {
  name: string;
  description: string;
  plaintext: string;
  gold: {
    total: number;
    base: number;
    sell: number;
  };
  stats: Record<string, number>;
}

interface GameItemTooltipProps {
  itemId: number;
  children: React.ReactNode;
}

const GameItemTooltip: React.FC<GameItemTooltipProps> = ({ itemId, children }) => {
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemData = async () => {
      if (!itemId) return;
      
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/14.23.1/data/fr_FR/item.json`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch item data: ${response.status}`);
        }

        const data = await response.json();
        if (!data.data || !data.data[itemId]) {
          throw new Error('Item not found');
        }

        setItemData(data.data[itemId]);
        setError(null);
      } catch (err) {
        console.error('Error fetching item data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load item data');
      }
    };

    fetchItemData();
  }, [itemId]);

  if (!itemId) return children;

  return (
    <div className="relative group">
      {children}
      {itemData && (
        <div className="fixed z-[9999] hidden group-hover:block bg-[#010A13] border border-[#C89B3C] rounded-lg p-4 min-w-[300px] max-w-[400px] shadow-xl transform -translate-x-1/2 left-1/2 mt-2">
          <div className="relative flex flex-col gap-2">
            <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#C89B3C]" />
            
            <div className="flex items-center gap-3">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${itemId}.png`}
                alt={itemData.name}
                className="w-12 h-12 rounded border border-[#C89B3C]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg?height=48&width=48';
                }}
              />
              <div>
                <h3 className="text-[#C89B3C] font-bold text-base">{itemData.name}</h3>
                <p className="text-[#F0E6D2] text-sm">
                  Coût: {itemData.gold.total} ({itemData.gold.base}) • Vente: {itemData.gold.sell}
                </p>
              </div>
            </div>
            
            {itemData.plaintext && (
              <p className="text-sm text-[#A09B8C] italic border-b border-[#1E2328] pb-2">
                {itemData.plaintext}
              </p>
            )}
            
            <div 
              className="text-sm text-[#F0E6D2] space-y-1" 
              dangerouslySetInnerHTML={{ 
                __html: itemData.description.replace(/<br>/g, '<br class="block my-1">') 
              }} 
            />

            {Object.keys(itemData.stats).length > 0 && (
              <div className="mt-2 pt-2 border-t border-[#1E2328]">
                <h4 className="text-[#C89B3C] text-sm font-semibold mb-1">Statistiques:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(itemData.stats).map(([key, value]) => (
                    <div key={key} className="text-xs text-[#F0E6D2]">
                      {key}: {value}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameItemTooltip;

