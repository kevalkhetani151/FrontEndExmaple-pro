import { ICommonResponse } from "./ICommonResponse";

export interface IuserResponce extends ICommonResponse {
  data: {
    id: string;
    user_id: number;
    name: string;
    email: string;
    password: string;
    salt: string;
    Role: string;
    avatar: string;
    totalpoints: number;
    lastupdated: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export interface IuserRequest {
  filter?: string | undefined;
  userId?: string | undefined;
}
