"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { ROLES } from "@src/utils/helper";
import CustomInput from "../customeFormField";
import { useUserLogin } from "@src/hooks/apiHooks";
import { setAuthToken } from "@src/redux/reducers/authSlice";

const LoginComponent = () => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const dispatch = useDispatch();
  const router = useRouter();
  const { isError, isLoading, data, error, mutate } = useUserLogin();

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setAuthToken(data.data.token));
      toast.success(data?.message ?? "Login Successful");
      reset();
      router.push("/traking");
    }
    if (isError) {
      toast.error(error.message);
      router.push("/login");
    }
  }, [data, isLoading, error, isError, reset, router, dispatch]);

  const onSubmit = (formData: { email: string; password: string }) => {
    mutate(formData);
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
            Seamless Login for Exclusive Access
          </h2>
          <p className="text-sm mt-6 text-slate-500 leading-relaxed">
            Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.
          </p>
          <p className="text-sm mt-12 text-slate-500">
            Don&apos;t have an account?
            <Link href="/signup" className="text-blue-600 font-medium hover:underline ml-1">
              Register here
            </Link>
          </p>
        </div>

        <div className="w-full">
          <h1 className="text-2xl mb-12 text-center">Login here</h1>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full md:ml-auto space-y-6">
              <CustomInput
                name="email"
                type="email"
                label="Enter Your Email"
                placeholder="Enter Email"
              />
              <CustomInput
                name="password"
                type="password"
                label="Enter Your Password"
                placeholder="Enter Password"
              />
              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Log in
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
