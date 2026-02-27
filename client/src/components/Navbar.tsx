/** Навигационна лента – лого, линкове, потребителско меню, бутони за вход */
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user: authUser, logout } = useAuth();

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200"
      style={{ height: "96px" }}
    >
      <div className="flex justify-between items-center w-full h-full px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" scroll={false}>
          <span className="text-xl font-bold text-gray-900">Gift Now</span>
        </Link>
        <div className="flex items-center gap-6">
          {authUser?.userRole?.toLowerCase() === "admin" && (
            <Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden sm:block">
              Admin
            </Link>
          )}
          <Link href="/" scroll={false} className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Giftnow.bg"
              width={400}
              height={140}
              className="h-[72px] sm:h-[80px] w-auto object-contain"
            />
          </Link>
          {authUser ? (
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={logout}
            >
              Изход
            </Button>
          ) : (
            <Link href="/signin">
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                Log in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
