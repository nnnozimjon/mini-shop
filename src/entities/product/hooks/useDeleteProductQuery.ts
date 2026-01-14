import { useState, useCallback } from "react";
import { productApi } from "@entities/product";

export const useDeleteProductQuery = (productId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await productApi.remove(productId);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message ?? "Failed to delete product");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  return { deleteProduct, loading, error, success };
};
