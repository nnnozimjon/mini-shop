import React, { useState } from "react";
import { Heart, Plus, Minus } from "lucide-react";
import { ProductCard, Tabs } from "@shared/ui";
import { AddToCartButton } from "@features/cart";
import { useParams } from "react-router-dom";
import { useProductQuery, useProductsQuery } from "@entities/product";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { productId } = useParams();
  const { data: product, loading }: any = useProductQuery(productId as string);
  const { data: roses } = useProductsQuery({
    limit: 8,
  });

  // @comment: change this with new not found comonents
  if (!product) return <div>Product not found</div>;
  // @comment: change this with skeletons and some compoents
  if (loading) return <div>Loading</div>;

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:scale-110 transition-transform"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-bold text-gray-900">
                {product.price} c
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-rose-300 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-2xl font-semibold text-gray-900 w-16 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-rose-300 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <AddToCartButton productId={product.id} quantity={quantity} />
          </div>
        </div>
      </div>

      <Tabs
        tabsData={[
          {
            name: "Description",
            content: (
              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>
            ),
          },
        ]}
      />

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {roses?.map((item) => (
            <ProductCard {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
