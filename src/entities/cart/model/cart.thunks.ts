import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartApi, guestCartApi } from "@entities/cart";
import type { AddCartItemRequest, CartItem } from "@entities/cart";
import { uuidv4 } from "@shared/lib";

const sessionId = localStorage.getItem("sessionId") || uuidv4();
const refreshToken = localStorage.getItem("refreshToken");

export const fetchCart = createAsyncThunk<CartItem[]>(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      if (!refreshToken) {
        const response = await guestCartApi.getCart(sessionId);
        return response.data;
      } else {
        const response: any = await cartApi.getCart();
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addCartItem = createAsyncThunk<CartItem[], AddCartItemRequest>(
  "cart/add",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      if (!refreshToken) {
        const response = await guestCartApi.addItem({
          productId,
          quantity,
          sessionId,
        });
        return response.data;
      } else {
        const response = await cartApi.addItem({ productId, quantity });
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk<string, string>(
  "cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      if (!refreshToken) {
        await guestCartApi.removeItem({ productId, sessionId });
        return productId;
      } else {
        await cartApi.removeItem(productId);
        return productId;
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCartQuantity = createAsyncThunk<
  CartItem[],
  AddCartItemRequest
>("cart/update", async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    if (!refreshToken) {
      const response = await guestCartApi.updateQuantity(
        sessionId,
        productId,
        quantity
      );

      return response.data;
    } else {
      const response = await cartApi.updateQuantity(productId, quantity);
      return response.data;
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const clearCartServer = createAsyncThunk<void>(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      await cartApi.clearCart();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const mergeCartsOnRegister = () => {};
