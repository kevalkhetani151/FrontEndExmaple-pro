import { ICommonResponse } from "./ICommonResponse";

export interface ISignupResponce extends ICommonResponse {
  data: {
    id: string;
    user_id: number;
    name: string;
    email: string;
    Role: string;
    avatar: string | null;
    totalpoints: number;
    lastupdated: string;
  };
}

export interface ISignupRequest {
  name: string;
  email: string;
  password: string;
}
