/** Начална страница – hero, промо, корпоративни подаръци */
"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Gift, Package, CreditCard } from "lucide-react";
import HomeHeader from "./HomeHeader";

const HomePage = () => {
  const { user: authUser, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <div className="min-h-screen">
      <HomeHeader />

      {/* Hero promo section */}
      <section className="relative pt-28 pb-20 px-6 lg:px-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: "url(/login-bg.png)",
            filter: "blur(4px)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/50 to-teal-50/40" aria-hidden />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-100/80 mb-6">
              ПРОМОЦИЯ В GIFTNOW.BG
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.15] tracking-tight">
              Подаръците са нашата страст
            </h1>
            <div className="space-y-4 text-gray-600 mb-10 max-w-xl">
              <p className="leading-relaxed">
                Пролетни усещания и празнична атмосфера.
              </p>
              <p className="leading-relaxed">
                В Giftnow.bg сме събрали подаръци за всеки повод – за вашите клиенти, партньори и служители.
              </p>
              <p className="leading-relaxed">
                Разгледайте нашия каталог и изберете идеалния подарък.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={authUser ? "/product-catalog" : "/signin"}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:-translate-y-0.5"
                >
                  Виж каталога
                </Button>
              </Link>
              <Link href={authUser ? "/product-catalog" : "/signin"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 rounded-xl transition-all"
                >
                  Поръчай подаръци
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 mt-14 lg:mt-0 flex justify-center">
            <div className="grid grid-cols-2 gap-5 max-w-sm">
              <div className="aspect-square rounded-3xl bg-white/90 shadow-xl shadow-gray-200/50 flex items-center justify-center border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                <Gift className="w-20 h-20 text-emerald-400/80" />
              </div>
              <div className="aspect-square rounded-3xl bg-white/90 shadow-xl shadow-gray-200/50 flex items-center justify-center border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 mt-8">
                <Package className="w-20 h-20 text-teal-400/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate gifts section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-14 lg:gap-20">
          <div className="flex-1 relative min-h-[320px] rounded-2xl overflow-hidden bg-slate-800">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/70 to-slate-700/50" />
            <div className="absolute inset-0 flex items-end p-8">
              <div>
                <p className="text-sm font-medium text-emerald-400/90 mb-8">Радваме се да</p>
                <h2 className="text-2xl font-bold mb-3">
                  Подкрепа, която прави разлика
                </h2>
                <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                  Giftnow.bg от началото помага с подаръци за деца, подкрепа за семейства и хора в нужда.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              ФИРМЕНИ ПОДАРЪЦИ 2026
            </h2>
            <p className="text-slate-400 text-sm mb-10 leading-relaxed">
              Giftnow.bg доставя подаръци за служители от 2008 г. и е един от водещите доставчици на фирмени подаръци. Разгледайте нашия каталог с уникални подаръци и възможност за представяния.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Gift className="w-7 h-7 text-emerald-400" />
                </div>
                <p className="font-medium text-sm">Същият подарък за всички</p>
              </div>
              <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-7 h-7 text-emerald-400" />
                </div>
                <p className="font-medium text-sm">Ваучер за подарък</p>
                <p className="text-xs text-slate-400 mt-1">Свободен избор за получателя</p>
              </div>
              <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Package className="w-7 h-7 text-emerald-400" />
                </div>
                <p className="font-medium text-sm">Имате ваучер?</p>
                <Button size="sm" variant="outline" className="mt-3 rounded-lg border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all">
                  Провери ваучер
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Долна част – замъглена снимка като на hero */}
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden min-h-[280px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: "url(/login-bg.png)",
            filter: "blur(4px)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/50 to-teal-50/40" aria-hidden />
        <div className="relative z-10 max-w-6xl mx-auto" />
      </section>
    </div>
  );
};

export default HomePage;
