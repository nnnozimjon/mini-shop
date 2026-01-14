import { useState } from "react";
import { productApi } from "@entities/product";
import type { Product, CreateProduct } from "@entities/product";

export const useCreateProductQuery = () => {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (dto: CreateProduct) => {
    setLoading(true);
    setError(null);

    try {
      const product = await productApi.create(dto);
      setData(product);
      return product;
    } catch (err: any) {
      setError(err.message ?? "Failed to create product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createProduct };
};
