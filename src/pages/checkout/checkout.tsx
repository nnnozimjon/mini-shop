import { PlaceOrderForm } from "@features/checkout";
import { selectCartItems, selectCartTotalPrice } from "@entities/cart";
import { useSelector } from "react-redux";

export const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Оформить заказ</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Корзина</h2>
        {cartItems.length === 0 && <p>Ваша корзина пуста</p>}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between py-2 border-b border-gray-300 last:border-b-0"
          >
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>{item.price * item.quantity} c</span>
          </div>
        ))}
        {cartItems.length > 0 && (
          <div className="flex justify-between font-semibold mt-4">
            <span>Итого:</span>
            <span>{totalPrice} c</span>
          </div>
        )}
      </div>
      <PlaceOrderForm />
    </div>
  );
};
