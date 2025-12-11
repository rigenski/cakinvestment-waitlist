import { z } from "zod";
import type { TPaginationRequest } from "./../../types/request";

// get all

export type TGetAllUserRequest = TPaginationRequest;

export const schemaGetAllUserResponse = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TGetAllUserResponse = z.infer<typeof schemaGetAllUserResponse>;

// get detail
export const schemaGetDetailUserRequest = z.object({
  id: z.string(),
});

export type TGetDetailUserRequest = z.infer<typeof schemaGetDetailUserRequest>;

export const schemaGetDetailUserResponse = schemaGetAllUserResponse;

export type TGetDetailUserResponse = z.infer<
  typeof schemaGetDetailUserResponse
>;

// create
export const schemaCreateUserRequest = z.object({
  email: z.string(),
  fullName: z.string(),
});

export type TCreateUserRequest = z.infer<typeof schemaCreateUserRequest>;

export const schemaCreateUserResponse = schemaGetAllUserResponse;

export type TCreateUserResponse = z.infer<typeof schemaCreateUserResponse>;

// update
export const schemaUpdateUserRequest = z.object({
  email: z.string(),
  fullName: z.string(),
});

export type TUpdateUserRequest = z.infer<typeof schemaUpdateUserRequest>;

export const schemaUpdateUserResponse = schemaGetAllUserResponse;

export type TUpdateUserResponse = z.infer<typeof schemaUpdateUserResponse>;

// delete
export const schemaDeleteUserRequest = z.object({});

export type TDeleteUserRequest = z.infer<typeof schemaDeleteUserRequest>;

export const schemaDeleteUserResponse = z.object({});

export type TDeleteUserResponse = z.infer<typeof schemaDeleteUserResponse>;
