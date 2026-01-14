import { EmptyProdyctList } from "@widgets/main";
import { useProductsQuery } from "@entities/product";
import { Carousel, ProductCard } from "@shared/ui";

// @comment: create skeleton component list for showing before loading the products allwhere
export default function MainPage() {
  const { data: roses, loading: rosesLoading } = useProductsQuery({});

  // @comment: this should come from back, more over should be controller from the admin page
  const images = [
    {
      mobile:
        "https://storage.alifshop.tj/media/images/settings/874/banner-1767699255892.png",
      desktop:
        "https://storage.alifshop.tj/media/images/settings/873/banner-1767699275363.jpg",
      alt: "Banner 1",
    },
    {
      mobile:
        "https://storage.alifshop.tj/media/images/settings/838/banner-1766558643958.png",
      desktop:
        "https://storage.alifshop.tj/media/images/settings/838/banner-1766558643958.png",
      alt: "Banner 2",
    },
  ];

  return (
    <div className="pt-4">
      <Carousel images={images} autoPlay interval={5000} />
      <section className="py-16 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Рекомендуемые цветы
            </h2>
          </div>
          {roses?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {roses.map((product) => (
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
          ) : (
            <EmptyProdyctList />
          )}
        </div>
      </section>
      <section className="py-16 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Розы</h2>
          </div>
          {roses?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {roses?.map((product) => (
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
          ) : (
            <EmptyProdyctList />
          )}
        </div>
      </section>
    </div>
  );
}
