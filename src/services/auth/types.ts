import { z } from "zod";

// login
export const schemaLoginRequest = z.object({
  email: z.string(),
  password: z.string(),
});

export type TLoginRequest = z.infer<typeof schemaLoginRequest>;

export const schemaLoginResponse = z.object({
  user: z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    status: z.string(),
  }),
  token: z.string(),
});

export type TLoginResponse = z.infer<typeof schemaLoginResponse>;

// verify token
export const schemaVerifyRequest = z.object({
  token: z.string(),
});

export type TVerifyRequest = z.infer<typeof schemaVerifyRequest>;

export const schemaVerifyResponse = z.object({
  user: schemaLoginResponse.shape.user,
  token: z.string(),
});

export type TVerifyResponse = z.infer<typeof schemaVerifyResponse>;
