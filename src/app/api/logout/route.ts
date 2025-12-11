"use server";

import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { tokenCookieKey } from "@/constants/session";
import { userCookieKey } from "@/constants/session";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.delete(tokenCookieKey);
  cookieStore.delete(userCookieKey);

  return NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_FE_URL),
  );
}
