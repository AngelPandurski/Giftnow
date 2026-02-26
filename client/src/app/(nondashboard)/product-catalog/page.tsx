/**
 * Продуктов каталог /product-catalog – за всички логнати потребители.
 * Показва ProductGridSection (мрежа с продукти). Нелогнати се пренасочват към /.
 * Свързано: dashboards/page.tsx пренасочва /dashboards тук.
 */
"use client";

import React, { useEffect } from "react";
import ProductGridSection from "../landing/ProductGridSection";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const ProductCatalogPage = () => {
  const { user: authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!authUser) router.replace("/", { scroll: false });
  }, [authUser, isLoading, router]);

  if (isLoading) return <>Loading...</>;
  if (!authUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
      <ProductGridSection />
    </div>
  );
};

export default ProductCatalogPage;
