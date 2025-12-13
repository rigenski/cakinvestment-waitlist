"use client";

import { AuthProvider, TAuthIsLogin, TAuthUser } from "@/stores/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

type TProvidersProps = {
  children: React.ReactNode;
  auth: {
    isLogin: TAuthIsLogin;
    accessToken: string;
    user: TAuthUser | null;
  };
};

export default function Providers({ children, auth }: TProvidersProps) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        isLogin={auth?.isLogin}
        accessToken={auth?.accessToken}
        user={auth?.user}
      >
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
