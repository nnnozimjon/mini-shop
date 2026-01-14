import { baseApi } from "@shared/api";
import type {
  AddGuestCartItemRequest,
  CartItem,
  RemoveGuestCartItemRequest,
} from "@entities/cart";

export const guestCartApi = {
  getCart: (sessionId: string) =>
    baseApi.get<CartItem[]>(`/guest-cart/${sessionId}`),

  addItem: (item: AddGuestCartItemRequest) =>
    baseApi.post<CartItem[]>("/guest-cart/add", item),

  removeItem: (params: RemoveGuestCartItemRequest) =>
    baseApi.delete(
      `/guest-cart/remove/${params.sessionId}/${params.productId}`
    ),

  updateQuantity: (sessionId: string, productId: string, quantity: number) =>
    baseApi.patch<CartItem[]>(`/guest-cart/update/${sessionId}`, {
      quantity,
      productId,
    }),

  clearCart: (sessionId: string) =>
    baseApi.delete(`/guest-cart/clear${sessionId}`),
};
