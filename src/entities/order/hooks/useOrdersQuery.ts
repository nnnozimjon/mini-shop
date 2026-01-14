import { useEffect, useState, useCallback } from "react";
import type { Order } from "@entities/order";
import { orderApi } from "@entities/order";

export const useOrdersQuery = () => {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await orderApi.getAll();
      setData(res.data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load products");
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
