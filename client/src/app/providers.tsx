/** Провайдъри за цялото приложение: Redux, Mock Auth, AWS Amplify Authenticator и Toaster */
"use client";

import React from "react";
import StoreProvider from "@/state/redux";
import { Authenticator } from "@aws-amplify/ui-react";
import Auth from "./(auth)/authProvider";
import { MockAuthProvider } from "@/lib/mockAuth";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <MockAuthProvider>
        <Authenticator.Provider>
          <Auth>{children}</Auth>
          <Toaster closeButton />
        </Authenticator.Provider>
      </MockAuthProvider>
    </StoreProvider>
  );
}
