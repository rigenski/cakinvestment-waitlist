import { authVerifyToken } from "@/services/auth";
import { TAuthIsLogin, TAuthUser } from "@/stores/auth";
import { getAdminSession } from "@/utils/admin-session";
import { getSession } from "@/utils/session";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Providers from "./_components/providers";

type TLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: TLayoutProps) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdminRoute = pathname.startsWith("/admin");

  // Handle admin routes - hanya cek cookie, tidak verify API
  if (isAdminRoute) {
    const adminSession = await getAdminSession();

    if (adminSession?.isAuthenticated) {
      redirect("/admin");
    }

    return <>{children}</>;
  }

  // Handle login route - check both admin and user session
  if (pathname === "/login") {
    const adminSession = await getAdminSession();
    if (adminSession?.isAuthenticated) {
      redirect("/admin");
    }
  }

  // Handle regular user routes - verify API
  const session = await getSession();

  let isLogin: TAuthIsLogin = false;
  let user: TAuthUser | null = null;

  if (session?.accessToken) {
    await authVerifyToken({ token: session?.accessToken })
      .then((response) => {
        isLogin = true;
        user = response?.content?.user ?? (session?.user as TAuthUser | null);
      })
      .catch(async () => {
        user = null;
        redirect("/api/logout");
      });
  }

  if (isLogin) {
    redirect("/dashboard");
  }

  return (
    <Providers
      auth={{
        isLogin: isLogin,
        accessToken: session?.accessToken ?? "",
        user: user,
      }}
    >
      {children}
    </Providers>
  );
}
