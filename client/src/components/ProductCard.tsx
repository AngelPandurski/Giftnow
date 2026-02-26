/** Карта за продукт – заглавие, кратко описание, линк (за Giftnow) */
"use client";

import React from "react";

export type Product = {
  id: string;
  title: string;
  shortDescription: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-100/80 hover:shadow-lg hover:border-emerald-200/80 transition-all duration-300">
      <div className="aspect-square w-full bg-gradient-to-br from-emerald-50 to-teal-50/50" />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-emerald-700/80 mt-1">{product.shortDescription}</p>
      </div>
    </div>
  );
};

export default ProductCard;
