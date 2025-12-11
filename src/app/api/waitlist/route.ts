import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Email is invalid"),
  phone: z.string().trim().min(5, "Phone is required"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = payloadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          content: null,
          message: "Failed to add you to the waitlist",
          errors: parsed.error.issues.map((issue) => ({
            field: issue.path.join(".") || "unknown",
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const { name, email, phone } = parsed.data;

    const { data, error } = await supabase
      .from("waitlist")
      .insert({ name, email, phone })
      .select()
      .single();

    if (error) {
      const isDuplicate = error.code === "23505";
      return NextResponse.json(
        {
          content: null,
          message: isDuplicate
            ? "Email or phone already in the waitlist"
            : error.message,
          errors: null,
        },
        { status: isDuplicate ? 409 : 400 },
      );
    }

    return NextResponse.json({
      content: data,
      message: "You have been added to the waitlist",
      errors: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        content: null,
        message: "Failed to add you to the waitlist",
        errors: null,
      },
      { status: 500 },
    );
  }
}
