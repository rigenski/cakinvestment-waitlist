import type { TResponse } from "@/types/response";
import { apiBase, getError } from "@/utils/api";
import type {
  TCreateWaitlistRequest,
  TCreateWaitlistResponse,
} from "./types";

export const createWaitlist = async (data: TCreateWaitlistRequest) => {
  try {
    const response = await apiBase.post<TResponse<TCreateWaitlistResponse>>(
      "/api/waitlist",
      data,
    );

    return response.data;
  } catch (error) {
    throw getError(error);
  }
};

