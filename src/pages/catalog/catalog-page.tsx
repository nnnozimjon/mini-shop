import React, { useEffect, useState } from "react";
import {
  FilterButton,
  FilterAside,
  FilterMobile,
  useFilters,
} from "@features/product";
import { useCategoryQuery } from "@entities/category";
import { useProductsQuery } from "@entities/product";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@shared/ui";
import { EmptyProdyctList } from "@widgets/main";

// @comment: skeletons for loading placeholders
export default function CatalogPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { selectedCategories } = useFilters();
  const categoryId = searchParams.get("categoryId") || undefined;
  const [limit, setLimit] = useState(20);

  const { category, loading: categoryLoading } = useCategoryQuery(categoryId);

  const {
    data: products,
    loading: productsLoading,
    error,
    meta,
  } = useProductsQuery({
    categoryId: selectedCategories,
    limit,
  });

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 568 && limit <= meta.total) {
      setLimit((prev) => prev + 20);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:flex lg:space-x-6">
        <div className="hidden lg:block lg:w-1/4">
          <FilterAside />
        </div>

        {/* Main content */}
        <main className="flex-1 mt-6 lg:mt-0">
          <FilterButton onClick={() => setMobileOpen(true)} />

          {/* @comment: update to actual placeholder */}
          <h1 className="text-2xl font-semibold mb-4">
            {categoryLoading ? "Loading..." : category?.name || "Все цветы"}
          </h1>

          {/* @cooment: need to be updated with actual placeholder or skeleton */}
          {productsLoading && <p>Loading products...</p>}
          {error && <p className="text-red-500">Failed to load products</p>}
          {!productsLoading && products?.length === 0 && (
            <EmptyProdyctList />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Mobile filter panel */}
      <FilterMobile open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
