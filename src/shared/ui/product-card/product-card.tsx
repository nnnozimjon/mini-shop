import { useState } from "react";
import { Heart, Eye } from "lucide-react";
import { AddToCartButton } from "@features/cart";

export const ProductCard = ({
  id,
  name,
  description,
  price = 0,
  image,
}: any) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 ${
          isWishlisted
            ? "bg-pink-500 text-white"
            : "bg-white/90 text-gray-600 hover:bg-pink-500 hover:text-white"
        } shadow-lg`}
      >
        <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
      </button>
      <div className={`relative overflow-hidden`}>
        <div className="flex items-center justify-center h-64 text-8xl">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => location.replace("/product/" + id)}
            className="px-6 py-3 bg-white text-gray-800 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <Eye size={20} />
            Quick View
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-pink-600 transition-colors">
          {name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {Number(price).toFixed(2)} Сум
          </span>
        </div>

        <AddToCartButton productId={id} />
      </div>
    </div>
  );
};
