import { useDispatch } from "react-redux";
import { addCartItem } from "@entities/cart";
import { IconButton } from "@shared/ui";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import type { AddToCartProps } from "./types";

export const AddToCartButton = ({ productId, quantity = 1 }: AddToCartProps) => {
  const dispatch = useDispatch();
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setShowAddedToCart(true);
    dispatch(addCartItem({ productId, quantity }) as any);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  return (
    <div className="relative w-full">
      <IconButton
        onClick={handleAddToCart}
        disabled={showAddedToCart}
        className={`w-full ${
          !showAddedToCart
            ? "bg-linear-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
        icon={<ShoppingCart size={20} />}
      >
        {showAddedToCart ? "Added to Cart" : "Add to Cart"}
      </IconButton>

      {showAddedToCart && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap shadow-lg animate-bounce">
          ✓ Added to Cart!
        </div>
      )}
    </div>
  );
};
