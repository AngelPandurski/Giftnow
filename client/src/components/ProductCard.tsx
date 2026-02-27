/** Карта за продукт – снимка, заглавие, кратко описание */
"use client";

import React from "react";
import Image from "next/image";

export type Product = {
  id: string;
  title: string;
  shortDescription: string;
  imageUrl?: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-100/80 hover:shadow-lg hover:border-emerald-200/80 transition-all duration-300">
      <div className="aspect-square w-full relative bg-gradient-to-br from-emerald-50 to-teal-50/50 overflow-hidden">
        {product.imageUrl ? (
          <>
            {/* Замъглена снимка като фон – като на hero секцията */}
            <div className="absolute inset-0 scale-110" aria-hidden>
              <Image
                src={product.imageUrl}
                alt=""
                fill
                className="object-cover blur-md"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                unoptimized={product.imageUrl.startsWith("data:")}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white/20 to-teal-50/30" aria-hidden />
            {/* Основна снимка отгоре */}
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover relative z-10"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              unoptimized={product.imageUrl.startsWith("data:")}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-emerald-300/80">
            <span className="text-4xl">📷</span>
          </div>
        )}
      </div>
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
