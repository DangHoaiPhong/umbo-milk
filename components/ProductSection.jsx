import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const ProductSection = () => {
  return (
    <section className="py-8 bg-[#fff3f4] w-full">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2d3748]">
              SỮA BÒ THANH TRÙNG
            </h2>
            <div className="mt-2 h-1 w-16 bg-[#F7a3a9] rounded-full" />
          </div>
          <Link
            href="/products"
            className="text-[#F7a3a9] text-sm font-medium hover:opacity-75 transition-opacity"
          >
            Xem tất cả →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
