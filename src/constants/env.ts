import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const env = createEnv({
  // Server environment variables configuration
  server: {},

  // Client environment variables configuration
  client: {
    NEXT_PUBLIC_FE_URL: requiredString.url(),
    NEXT_PUBLIC_BE_URL: requiredString.url(),
    NEXT_PUBLIC_SUPABASE_URL: requiredString.url(),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: requiredString,
  },

  // Runtime environment variables captured from process.env
  runtimeEnv: {
    NEXT_PUBLIC_FE_URL: process.env.NEXT_PUBLIC_FE_URL,
    NEXT_PUBLIC_BE_URL: process.env.NEXT_PUBLIC_BE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  },

  // Skip validation if the SKIP_ENV_VALIDATION environment variable is set
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  // Treat empty strings as undefined
  emptyStringAsUndefined: true,
});
