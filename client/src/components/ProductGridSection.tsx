/** Секция с мрежа от продуктови карти */
"use client";

import React, { useEffect, useState } from "react";
import ProductCard, { Product } from "@/components/ProductCard";
import { loadProducts } from "@/lib/productsStore";

const ProductGridSection = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGridSection;
