/** Хедър на началната страница – лого, навигация, бутони за вход и каталог */
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Search, ShoppingCart, User, HelpCircle } from "lucide-react";

const HomeHeader = () => {
  const { user: authUser, logout } = useAuth();
  const isAdmin = authUser?.userRole?.toLowerCase() === "admin";
  const t = useTranslations("common");
  const tNav = useTranslations("nav");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
      <div className="flex justify-end items-center h-9 px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hidden sm:inline">{tNav("whatSearch")}</span>
          <button onClick={() => {}} className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center h-16 px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" scroll={false}>
          <Image
            src="/logo.png"
            alt="Giftnow.bg"
            width={200}
            height={70}
            className="h-12 sm:h-14 w-auto object-contain"
          />
          <span className="text-xs text-gray-500 hidden sm:block">
            {tNav("moreThanGift")}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-600">
          <Link href="#" className="hover:text-gray-900 transition-colors">
            {tNav("corporateGifts")}
          </Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">
            {tNav("catalogs")}
          </Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">
            {tNav("webshop")}
          </Link>
          {isAdmin && (
            <Link href="/admin" className="hover:text-gray-900 transition-colors">
              {t("admin")}
            </Link>
          )}
          <Link href="#" className="hover:text-gray-900 transition-colors">
            {tNav("about")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="#" className="hidden lg:flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100">
            <HelpCircle className="w-4 h-4" />
            {tNav("needHelp")}
          </Link>
          {authUser ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 rounded-full"
              onClick={logout}
            >
              {t("logout")}
            </Button>
          ) : (
            <Link href="/signin">
              <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-5 transition-all hover:scale-[1.02]">
                {t("login")}
              </Button>
            </Link>
          )}
          <button className="p-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
            <User className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all md:hidden">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
