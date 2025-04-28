import { useMutation } from "react-query";
import useAxios from "../useAxios";
import { apiRoutes } from "./route";
import {
  ILoginRequest,
  ILoginResponce,
} from "@src/utils/@types/ILoginResponce";
import {
  IuserRequest,
  IuserResponce,
} from "@src/utils/@types/IGetUserResponce";
import {
  ISignupRequest,
  ISignupResponce,
} from "@src/utils/@types/IRegisterResponce";

const { login, allusers, Signup } = apiRoutes;

export const useUserLogin = () => {
  const { url, method } = login.POST;
  const callApi = useAxios();
  return useMutation<ILoginResponce, string, ILoginRequest>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response as ILoginResponce;
  });
};
export const useGetAllUser = () => {
  const { url, method } = allusers.GET;
  const callApi = useAxios();

  return useMutation<IuserResponce, string, IuserRequest>(async (data) => {
    const response = await callApi({
      method,
      url: `${url}${"?filter="}${data?.filter}${"&&"}${"userId="}${
        data.userId
      }`,
    });
    return response as IuserResponce;
  });
};
export const useUserSignup = () => {
  const { url, method } = Signup.POST;
  const callApi = useAxios();
  return useMutation<ISignupResponce, string, ISignupRequest>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response as ISignupResponce;
  });
};
