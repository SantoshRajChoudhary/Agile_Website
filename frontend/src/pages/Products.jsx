import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Products = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-3 text-gray-600">
            Explore our product portfolio built for intelligent operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
