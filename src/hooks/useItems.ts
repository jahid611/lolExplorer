import { useState, useEffect } from 'react';
import { Item } from '../types';
import { fetchItems } from '../api/items';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch items'));
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  return { items, loading, error };
};