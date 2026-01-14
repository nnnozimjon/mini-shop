import React from "react";
import { Heart, Minus, Plus, X } from "lucide-react";
import type { CartItem } from "@entities/cart";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartQuantity } from "@entities/cart";

type CartCardProps = {
  item: CartItem;
};

export const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const dispatch = useDispatch();

  const updateQuantity = (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;
    dispatch(
      updateCartQuantity({ productId: item.id, quantity: newQuantity }) as any
    );
  };

  const removeItem = (id: string) => dispatch(removeCartItem(id) as any);

  return (
    <div
      key={item.id}
      className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex gap-4">
        <div
          className={`rounded-xl flex items-center justify-center text-6xl sm:text-7xl w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden`}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <span>{item.title}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => updateQuantity(-1)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-pink-100 transition-colors disabled:opacity-50"
                disabled={item.quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="font-semibold w-8 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(1)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-pink-100 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-pink-600 hover:text-pink-700 transition-colors">
                <Heart size={20} />
              </button>
              <div className="text-right">
                <p className="text-2xl font-bold bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
                {item.quantity > 1 && (
                  <p className="text-xs text-gray-500">
                    ${Number(item.price).toFixed(2)} each
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
