import { useEffect, useState, useCallback } from "react";
import { productApi } from "@entities/product";
import type { Product, GetProductsParams } from "@entities/product";

export const useProductsQuery = (params?: GetProductsParams) => {
  const [data, setData] = useState<Product[]>([]);
  const [meta, setMeta] = useState({
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await productApi.getAll(params);
      setData(res.data);
      setMeta(res.meta);
    } catch (err: any) {
      setError(err.message ?? "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

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

  return { data, loading, meta, error, refetch };
};
