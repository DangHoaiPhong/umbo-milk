"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/haravan/products");
        if (!res.ok) throw new Error();
        const data = await res.json();
        const payload = Array.isArray(data) ? data : (data.products ?? []);

        const milkProducts = payload
          .filter((p) => {
            const category = String(p.category ?? "").toLowerCase();
            const name = String(p.name ?? p.title ?? "").toLowerCase();
            return (
              category === "sua" ||
              category === "vang-sua" ||
              name.includes("sua") ||
              name.includes("vang sua")
            );
          })
          .slice(0, 4)
          .map((item) => ({
            id: item.id,
            name: item.title ?? item.name ?? "Sản phẩm",
            title: item.title ?? item.name ?? "Sản phẩm",
            category: item.category ?? "sua",
            price: Number(item.price ?? item.variant?.price ?? 0) || 0,
            oldPrice:
              Number(item.oldPrice ?? item.variant?.compare_at_price) ||
              undefined,
            discount:
              item.discount ??
              (item.variant?.compare_at_price && item.variant?.price
                ? Math.round(
                    (1 - item.variant.price / item.variant.compare_at_price) *
                      100,
                  )
                : undefined),
            image: item.image ?? item.images?.[0]?.src ?? "",
            volume: item.volume ?? item.variant?.title ?? "",
            available: item.available ?? true,
            sku: item.sku ?? "",
            bodyHtml: item.bodyHtml ?? "",
            isNew: Boolean(item.isNew),
          }));

        setProducts(milkProducts);
      } catch {
        // giữ nguyên mảng rỗng nếu lỗi
      }
    };
    load();
  }, []);

  return (
    <section className="py-8 bg-[#fff3f4] w-full">
      <div className="px-4 max-w-7xl mx-auto">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
