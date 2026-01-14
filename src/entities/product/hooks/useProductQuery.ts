import { useEffect, useState, useCallback } from "react";
import { productApi } from "@entities/product";
import type { Product } from "@entities/product";

export const useProductQuery = (productId: string) => {
  const [data, setData] = useState<Product | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await productApi.getById(productId);
      setData(res);
    } catch (err: any) {
      setError(err.message ?? "Failed to load product");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetchDataWrapper();

    async function fetchDataWrapper() {
      if (!isMounted) return;
      await fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  const refetch = fetchData;

  return { data, loading, error, refetch };
};
