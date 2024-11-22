import React, { useState } from 'react';
import { useItems } from '../hooks/useItems';
import SearchBar from './SearchBar';
import ItemFilters from './ItemFilters';
import ItemGrid from './ItemGrid';
import { ITEM_TYPES } from '../types/items';

const ItemExplorer: React.FC = () => {
  const { items, loading, error } = useItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortOrder, setSortOrder] = useState('price-desc');

  const filterAndSortItems = () => {
    let filteredItems = [...items];

    // Apply type filter
    if (selectedType !== 'all') {
      filteredItems = filteredItems.filter(item => {
        switch (selectedType) {
          case ITEM_TYPES.STARTER:
            return item.tags.includes('Lane') || item.tags.includes('Jungle');
          case ITEM_TYPES.BOOTS:
            return item.tags.includes('Boots');
          case ITEM_TYPES.BASIC:
            return !item.from && !item.tags.includes('Boots') && !item.tags.includes('Consumable') &&
                   !item.tags.includes('Trinket') && item.gold.total <= 1000;
          case ITEM_TYPES.EPIC:
            return item.rarity === 'epic';
          case ITEM_TYPES.LEGENDARY:
            return item.rarity === 'legendary';
          case ITEM_TYPES.MYTHIC:
            return item.rarity === 'mythic';
          case ITEM_TYPES.CONSUMABLE:
            return item.consumed || item.tags.includes('Consumable');
          case ITEM_TYPES.TRINKET:
            return item.tags.includes('Trinket');
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (searchQuery) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortOrder) {
      case 'price-desc':
        filteredItems.sort((a, b) => b.gold.total - a.gold.total);
        break;
      case 'price-asc':
        filteredItems.sort((a, b) => a.gold.total - b.gold.total);
        break;
      case 'name':
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filteredItems;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load items. Please try again later.
      </div>
    );
  }

  const filteredItems = filterAndSortItems();

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm py-4 space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <ItemFilters
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          onSortChange={setSortOrder}
        />
      </div>

      {filteredItems.length > 0 ? (
        <ItemGrid items={filteredItems} />
      ) : (
        <div className="text-center text-gray-400 py-8">
          No items found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ItemExplorer;