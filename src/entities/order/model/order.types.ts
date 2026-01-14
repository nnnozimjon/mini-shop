export interface CreateOrder {
    fullName: string;
    phone: string;
    address: string;
}
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderId: string;
  totalPrice: string;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  fullName: string;
  phone: string;
  userId: string;
  userEmail: string;
  itemsCount: string;
  items: OrderItem[];
}

export interface OrderColumnsProps {
  onView: (order: Order) => void;
}
