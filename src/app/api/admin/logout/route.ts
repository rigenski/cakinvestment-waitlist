"use server";

import { NextResponse } from "next/server";
import { deleteAdminSession } from "@/utils/admin-session";

export async function GET() {
  await deleteAdminSession();

  return NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_FE_URL),
  );
}
