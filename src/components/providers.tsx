"use client";

import React, { useState } from "react";

import { ConfigProvider, TConfig } from "@/stores/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

type TProvidersProps = {
  children: React.ReactNode;
  config: TConfig;
};

export default function Providers({ children, config }: TProvidersProps) {
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
      <ConfigProvider config={config}>
        <Toaster position="top-center" richColors />
        {children}
      </ConfigProvider>
    </QueryClientProvider>
  );
}
