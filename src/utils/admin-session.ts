"use server";

import { adminCookieKey } from "@/constants/session";
import { cookies } from "next/headers";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(adminCookieKey)?.value;

  if (!adminSession) return null;

  return {
    isAuthenticated: true,
  };
}

export async function setAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(adminCookieKey, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    isAuthenticated: true,
  };
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();

  if (cookieStore.get(adminCookieKey)) {
    cookieStore.delete(adminCookieKey);
  }
}
