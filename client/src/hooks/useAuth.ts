/** Хук за auth – Cognito или mock потребител, logout */
"use client";

import { useGetAuthUserQuery } from "@/state/api";
import { useMockAuth } from "@/lib/mockAuth";
import { signOut } from "aws-amplify/auth";

const isCognitoConfigured = !!process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID;

export type AuthUser = {
  email?: string;
  userRole?: string;
};

/** Връща текущия потребител – от Cognito или от mock auth (localStorage) */
export function useAuth() {
  const { data: cognitoUser, isLoading } = useGetAuthUserQuery(undefined, {
    skip: !isCognitoConfigured,
  });
  const { user: mockUser, logout: mockLogout } = useMockAuth();

  const logout = async () => {
    if (isCognitoConfigured) {
      await signOut();
    } else {
      mockLogout();
    }
    window.location.href = "/";
  };

  if (isCognitoConfigured) {
    return {
      user: cognitoUser
        ? {
            email: cognitoUser.userInfo?.email ?? cognitoUser.cognitoInfo?.signInDetails?.loginId,
            userRole: cognitoUser.userRole,
          }
        : null,
      isLoading,
      logout,
    };
  }

  return {
    user: mockUser
      ? { email: mockUser.email, userRole: mockUser.role }
      : null,
    isLoading: false,
    logout,
  };
}
