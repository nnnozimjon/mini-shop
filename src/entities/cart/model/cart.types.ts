export interface AddCartItemRequest {
  productId: string;
  quantity: number;
}

export interface AddGuestCartItemRequest {
  sessionId: string;
  productId: string;
  quantity?: number;
}

export interface RemoveGuestCartItemRequest {
  sessionId: string;
  productId: string;
}

export interface CartItem {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: any;
}
