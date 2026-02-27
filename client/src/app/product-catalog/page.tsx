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
    <div className="min-h-screen relative overflow-hidden">
      {/* Замъглена снимка като фон – като на admin и hero */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: "url(/login-bg.png)",
          filter: "blur(4px)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/60 to-teal-50/40" aria-hidden />
      <div className="relative z-10">
        <ProductGridSection />
      </div>
    </div>
  );
}
