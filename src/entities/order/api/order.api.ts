import { baseApi } from "@shared/api";
import type { CreateOrder } from "@entities/order";

export const orderApi = {
  createOrder: (body: CreateOrder) =>
    baseApi.post<CreateOrder>("/orders", body),
  getAll: () => baseApi.get("/orders/all"),
};
