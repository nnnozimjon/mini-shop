import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "./cart.types";
import {
  fetchCart,
  addCartItem,
  removeCartItem,
  updateCartQuantity,
  clearCartServer,
} from "./cart.thunks";

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCart.fulfilled,
      (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(
      addCartItem.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.items = action.payload;
      }
    );

    builder.addCase(
      removeCartItem.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    );

    builder.addCase(
      updateCartQuantity.fulfilled,
      (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      }
    );

    builder.addCase(clearCartServer.fulfilled, (state) => {
      state.items = [];
    });
  },
});

export const { clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
