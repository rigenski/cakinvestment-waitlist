import type { TResponse, TResponseGetAll } from "@/types/response";
import { api, apiBase, getError, getParams } from "@/utils/api";
import type {
  TCreateUserRequest,
  TCreateUserResponse,
  TDeleteUserRequest,
  TDeleteUserResponse,
  TGetAllUserRequest,
  TGetAllUserResponse,
  TGetDetailUserRequest,
  TGetDetailUserResponse,
  TUpdateUserRequest,
  TUpdateUserResponse,
} from "./types";

export const getAllUser = async (data: TGetAllUserRequest) => {
  try {
    const response = await apiBase.post<TResponseGetAll<TGetAllUserResponse>>(
      "/users",
      {
        params: getParams(data),
      },
    );

    return response.data;
  } catch (error) {
    throw getError(error);
  }
};

export const getDetailUser = async (
  data: TGetDetailUserRequest,
  id: string,
) => {
  try {
    const response = await api.post<TResponse<TGetDetailUserResponse>>(
      `/users/detail/${id}`,
      data,
    );

    return response.data;
  } catch (error) {
    throw getError(error);
  }
};

export const createUser = async (data: TCreateUserRequest, id: string) => {
  try {
    const response = await apiBase.post<TResponse<TCreateUserResponse>>(
      `/users/${id}`,
      data,
    );

    return response.data;
  } catch (error) {
    throw getError(error);
  }
};

export const updateUser = async (data: TUpdateUserRequest, id: string) => {
  try {
    const response = await apiBase.put<TResponse<TUpdateUserResponse>>(
      `/users/${id}`,
      data,
    );

    return response.data;
  } catch (error) {
    throw getError(error);
  }
};

export const deleteUser = async (data: TDeleteUserRequest, id: string) => {
  try {
    const response = await apiBase.delete<TResponse<TDeleteUserResponse>>(
      `/users/${id}`,
      data,
    );

    return response.data;
  } catch (error) {
    throw getError(error);
  }
};
