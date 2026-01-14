import { CartCard } from "@widgets/cart";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotalPrice } from "@entities/cart";
import { Link } from "react-router-dom";
import { Button } from "@shared/ui";

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);
  const cartItemsLength = cartItems?.length > 0;
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  В корзине пока пусто
                </h3>
                <p className="text-gray-600 mb-6">
                  Добавьте товары, чтобы оформить заказ
                </p>
                <Link
                  to={"/catalog"}
                  className="px-6 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                >
                  На главную
                </Link>
              </div>
            ) : (
              cartItems.map((item) => <CartCard key={item.id} item={item} />)
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Итоги заказа
              </h2>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">Итого</span>
                <span className="text-3xl font-bold bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {totalPrice.toFixed(2)} c.
                </span>
              </div>
              <Link to={"/checkout"}>
                <Button  variant={cartItemsLength ? "solid" : "ghost"} disabled={!cartItemsLength}>Оформить</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
