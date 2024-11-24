import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import ItemCard from './ItemCard';
import { ItemTooltip } from './ItemTooltip';
import { fetchItemData } from '../utils/api';

const CATEGORIES = [
  { id: 'all', label: 'Toutes les catégories' },
  { id: 'MYTHIC', label: 'Objets Mythiques' },
  { id: 'LEGENDARY', label: 'Objets Légendaires' },
  { id: 'EPIC', label: 'Objets Épiques' },
  { id: 'BASIC', label: 'Objets Basiques' },
  { id: 'CONSUMABLE', label: 'Consommables' },
];

export default function ItemExplorer() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('alphabetical');

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const itemData = await fetchItemData();
        const itemArray = Object.entries(itemData.data).map(([id, item]: [string, any]) => ({
          id,
          ...item,
          category: item.description.includes('Mythic') ? 'MYTHIC' : 
                    item.description.includes('Legendary') ? 'LEGENDARY' :
                    item.description.includes('Epic') ? 'EPIC' :
                    item.gold.purchasable ? 'BASIC' : 'CONSUMABLE'
        }));
        setItems(itemArray);
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des objets.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const filterAndSortItems = () => {
    let filtered = [...items];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      if (sortOrder === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'price-asc') {
        return a.gold.total - b.gold.total;
      } else if (sortOrder === 'price-desc') {
        return b.gold.total - a.gold.total;
      }
      return 0;
    });

    return filtered;
  };

  const filteredItems = filterAndSortItems();

  return (
    <div className="min-h-screen">
      {/* Search Bar and Filters */}
      <div className="sticky top-0 z-10 bg-[#091428]/95 backdrop-blur-sm border-b border-[#1E2328]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un objet..."
                className="pl-9 h-9 bg-[#1E2328] border-[#C89B3C] text-white placeholder-gray-400"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alphabetical">Alphabétique</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#C89B3C]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            {error}
          </div>
        ) : (
          <>
            <p className="text-[#C89B3C] mb-4">
              {filteredItems.length} objet{filteredItems.length !== 1 ? 's' : ''} trouvé{filteredItems.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredItems.map((item) => (
                <ItemTooltip key={item.id} itemId={item.id}>
                  <ItemCard item={item} />
                </ItemTooltip>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

