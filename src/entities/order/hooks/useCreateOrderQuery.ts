import { useState } from "react";
import { orderApi, type CreateOrder } from "@entities/order";

export const useCreateOrderQuery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (dto: CreateOrder) => {
    setLoading(true);
    setError(null);

    try {
      const product = await orderApi.createOrder(dto);
      return product;
    } catch (err: any) {
      setError(err.message ?? "Failed to create product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createProduct };
};
