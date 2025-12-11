import { TPaginationRequest } from "@/types/request";
import { default as _axios, AxiosError } from "axios";
import { getSession } from "./session";

export const apiBase = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});

export const api = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

export const setToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
};

export const getError = (error: AxiosError | unknown) => {
  if (_axios.isAxiosError(error)) {
    return {
      content: error.response?.data?.content || null,
      message: error.response?.data?.message || "Something went wrong",
      errors: error.response?.data?.errors || [],
    };
  }

  return { message: "Something went wrong" };
};

export const getParams = (params: TPaginationRequest) => {
  const queryParams = new URLSearchParams();

  if (params?.page) {
    queryParams.append("page", params?.page.toString());
  }
  if (params?.rows) {
    queryParams.append("rows", params?.rows.toString());
  }
  if (params?.searchFilters) {
    queryParams.append("searchFilters", JSON.stringify(params.searchFilters));
  }
  if (params?.filters) {
    queryParams.append("filters", JSON.stringify(params.filters));
  }
  if (params?.rangedFilters) {
    queryParams.append("rangedFilters", JSON.stringify(params.rangedFilters));
  }
  if (params?.orderKey) {
    queryParams.append("orderKey", params?.orderKey);
  }
  if (params?.orderRule) {
    queryParams.append("orderRule", params?.orderRule);
  }

  return queryParams.toString();
};
