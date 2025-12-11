"use client";

import { AuthProvider, TAuthIsLogin, TAuthUser } from "@/stores/auth";

import React from "react";

type TProvidersProps = {
  children: React.ReactNode;
  auth: {
    isLogin: TAuthIsLogin;
    accessToken: string;
    user: TAuthUser | null;
  };
};

export default function Providers({ children, auth }: TProvidersProps) {
  return (
    <AuthProvider
      isLogin={auth?.isLogin}
      accessToken={auth?.accessToken}
      user={auth?.user}
    >
      {children}
    </AuthProvider>
  );
}
