import { BASE_URL } from "@src/config/config";

export const apiRoutes = {
  Signup: {
    POST: {
      query: "Signup",
      method: "POST",
      url: `${BASE_URL}/user/signup`,
    },
  },
  login: {
    POST: {
      query: "Login",
      method: "POST",
      url: `${BASE_URL}/user/login`,
    },
  },
  allusers: {
    GET: {
      query: "Login",
      method: "GET",
      url: `${BASE_URL}/user/users`,
    },
  },
};
