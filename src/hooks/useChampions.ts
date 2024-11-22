import { useState, useEffect } from 'react';
import { Champion } from '../types/champions';
import { fetchChampions } from '../api/champions';

export const useChampions = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadChampions = async () => {
      try {
        const data = await fetchChampions();
        setChampions(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch champions'));
      } finally {
        setLoading(false);
      }
    };

    loadChampions();
  }, []);

  return { champions, loading, error };
};