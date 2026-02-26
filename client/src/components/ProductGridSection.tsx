/** Секция с мрежа от продуктови карти (mock данни) */
"use client";

import React from "react";
import ProductCard, { Product } from "@/components/ProductCard";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Луксозно спално бельо от Georg Jensen Damask - 2 комплекта",
    shortDescription: "2 комплекта",
  },
  {
    id: "2",
    title: "Голям комплект тигани House of Chefs Reborn - 3 бр.",
    shortDescription: "3 бр.",
  },
  {
    id: "3",
    title: "Красива Royal Copenhagen купа или яйцедробилки - 3 бр.",
    shortDescription: "3 бр.",
  },
  {
    id: "4",
    title: "Tobias Jacobsen кабинет куфар с smart PC джоб",
    shortDescription: "1 бр.",
  },
  {
    id: "5",
    title: "Ексклузивен комплект куфари от Tobias Jacobsen - 2 части",
    shortDescription: "2 части",
  },
  {
    id: "6",
    title: "Стилен Dyberg Larsen Skagerrak подова или настолна лампа",
    shortDescription: "1 бр.",
  },
  {
    id: "7",
    title: "Мощен House of Chefs Steel блендер",
    shortDescription: "1 бр.",
  },
  {
    id: "8",
    title: "Tobias Jacobsen Smart Ring матов стомана",
    shortDescription: "1 бр.",
  },
];

const ProductGridSection = () => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGridSection;
