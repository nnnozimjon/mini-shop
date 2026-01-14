import { useEffect, useState } from "react";
import { categoryApi } from "@entities/category";
import type { Category } from "@entities/category";

export const useCategoriesQuery = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await categoryApi.getAll();
        if (!cancelled) {
          setCategories(data);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load categories");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    categories,
    loading,
    error,
    isEmpty: !loading && categories.length === 0,
  };
};
