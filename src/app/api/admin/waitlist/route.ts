"use server";

import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const ITEMS_PER_PAGE = 10;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const all = searchParams.get("all") === "true";
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    // Build count query for total
    let countQuery = supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    // Build data query
    let dataQuery = supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    // If all=true, don't apply pagination
    if (!all) {
      dataQuery = dataQuery.range(offset, offset + ITEMS_PER_PAGE - 1);
    }

    if (search) {
      const searchFilter = `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`;
      countQuery = countQuery.or(searchFilter);
      dataQuery = dataQuery.or(searchFilter);
    }

    // Execute both queries
    const [{ data, error }, { count, error: countError }] = await Promise.all([
      dataQuery,
      countQuery,
    ]);

    if (error || countError) {
      return NextResponse.json(
        {
          content: null,
          message:
            error?.message || countError?.message || "Failed to fetch waitlist",
          errors: null,
        },
        { status: 400 },
      );
    }

    const totalData = count || 0;
    const totalPage = all ? 1 : Math.ceil(totalData / ITEMS_PER_PAGE);

    return NextResponse.json({
      content: data || [],
      pagination: {
        page: all ? 1 : page,
        limit: all ? totalData : ITEMS_PER_PAGE,
        totalData,
        totalPage,
      },
      message: "Success",
      errors: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        content: null,
        message: "Failed to fetch waitlist",
        errors: null,
      },
      { status: 500 },
    );
  }
}
