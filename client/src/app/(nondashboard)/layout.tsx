/** Layout за публични страници – Navbar, пренасочване на manager от /search, padding за съдържанието */
"use client";

import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const isCognitoConfigured = !!process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery(
    undefined,
    { skip: !isCognitoConfigured }
  );
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(!!isCognitoConfigured);

  useEffect(() => {
    if (!isCognitoConfigured) {
      setIsLoading(false);
      return;
    }
    if (!authLoading) setIsLoading(false);
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (userRole === "manager" && pathname.startsWith("/search")) {
        router.push("/managers/properties", { scroll: false });
      }
    }
  }, [authUser, authLoading, pathname, router]);

  if (authLoading || isLoading) return <>Loading...</>;

  const isProductCatalog = pathname === "/product-catalog";
  const isAdmin = pathname.startsWith("/admin");
  const navHeight = isProductCatalog || isAdmin ? 96 : NAVBAR_HEIGHT;

  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className={`h-full flex w-full flex-col`}
        style={{ paddingTop: `${navHeight}px` }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
