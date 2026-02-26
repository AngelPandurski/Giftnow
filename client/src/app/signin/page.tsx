/** Вход – Cognito или mock форма (email + парола) при липса на backend */
"use client";

import React, { useEffect, useState } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import { View, Heading } from "@aws-amplify/ui-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMockAuth } from "@/lib/mockAuth";

const userPoolId = process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID;
const userPoolClientId =
  process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID;
const isCognitoConfigured = !!userPoolId && !!userPoolClientId;

const SignInHeader = () => (
  <View className="mt-4 mb-7 text-center">
    <Heading level={3} className="!text-2xl !font-bold text-gray-900">
      Giftnow.bg
    </Heading>
    <p className="text-gray-600 mt-2">Влезте в системата</p>
  </View>
);

const SignInRedirect = () => {
  const { authStatus } = useAuthenticator();
  const router = useRouter();

  useEffect(() => {
    if (authStatus === "authenticated") {
      router.replace("/product-catalog", { scroll: false });
    }
  }, [authStatus, router]);

  return null;
};

/** Mock login – без backend */
function MockLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useMockAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    login(email.trim(), "tenant");
    router.replace("/product-catalog", { scroll: false });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/login-bg.png)" }}
    >
      <div className="absolute inset-0 bg-white/60" aria-hidden />
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Giftnow.bg"
            width={200}
            height={70}
            className="h-14 w-auto"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Влезте в системата
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="mt-1 h-11 text-base"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Парола</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 h-11 text-base"
              required
            />
          </div>
          <Button type="submit" className="w-full h-11 text-base bg-emerald-600 hover:bg-emerald-700">
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function SignInPage() {
  if (!isCognitoConfigured) {
    return <MockLoginForm />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/login-bg.png)" }}
    >
      <div className="absolute inset-0 bg-white/60" aria-hidden />
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Giftnow.bg"
            width={200}
            height={70}
            className="h-14 w-auto"
          />
        </div>
        <Authenticator
          initialState="signIn"
          hideSignUp
          components={{
            Header: SignInHeader,
          }}
          formFields={{
            signIn: {
              username: {
                placeholder: "Email",
                label: "Email",
                isRequired: true,
              },
              password: {
                placeholder: "Парола",
                label: "Парола",
                isRequired: true,
              },
            },
          }}
        >
          <SignInRedirect />
        </Authenticator>
      </div>
    </div>
  );
}
