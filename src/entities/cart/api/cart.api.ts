import { baseApi } from "@shared/api";
import type { AddCartItemRequest, CartItem } from "@entities/cart";

export const cartApi = {
  getCart: () => baseApi.get<CartItem[]>("/cart"),

  addItem: (item: AddCartItemRequest) => baseApi.post<CartItem[]>("/cart/add", item),

  removeItem: (productId: string) =>
    baseApi.delete(`/cart/remove/${productId}`),

  updateQuantity: (productId: string, quantity: number) =>
    baseApi.patch<CartItem[]>(`/cart/update/${productId}`, { quantity }),

  clearCart: () => baseApi.delete("/cart/clear"),
};
