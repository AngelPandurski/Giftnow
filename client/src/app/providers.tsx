/** Провайдъри за цялото приложение: Redux, Mock Auth, AWS Amplify Authenticator и Toaster */
"use client";

import React from "react";
import StoreProvider from "@/state/redux";
import { Authenticator } from "@aws-amplify/ui-react";
import Auth from "./authProvider";
import { MockAuthProvider } from "@/lib/mockAuth";
import { Toaster } from "@/components/ui/sonner";
import ViewTracker from "@/components/ViewTracker";
import Navbar from "@/components/Navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ViewTracker />
      <MockAuthProvider>
        <Authenticator.Provider>
          <Navbar />
          <div style={{ paddingTop: "96px" }}>
            <Auth>{children}</Auth>
          </div>
          <Toaster closeButton />
        </Authenticator.Provider>
      </MockAuthProvider>
    </StoreProvider>
  );
}
