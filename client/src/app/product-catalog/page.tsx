"use client";

import React, { useEffect } from "react";
import ProductGridSection from "@/components/ProductGridSection";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ProductCatalogPage() {
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
}
