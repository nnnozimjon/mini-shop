import { useEffect, useState } from 'react';
import { categoryApi } from '@entities/category';
import type { Category } from '@entities/category';

export const useCategoryQuery = (id?: string) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchCategory = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await categoryApi.getById(id);
        if (!cancelled) {
          setCategory(data);
        }
      } catch {
        if (!cancelled) {
          setError('Failed to load category');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCategory();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return {
    category,
    loading,
    error,
  };
};
