"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import CustomInput from "../customeFormField";
import { FormProvider, useForm } from "react-hook-form";
import { useUserSignup } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

// Define form data interface
interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const SignupComponent = () => {
  const method = useForm<SignupFormData>();
  const { handleSubmit, reset } = method;
  const router = useRouter();

  const {
    isError: isSignupError,
    isLoading: isSignupLoading,
    data: signupData,
    error: signupError,
    mutate: signup,
  } = useUserSignup();

  useEffect(() => {
    if (signupData && !isSignupLoading) {
      toast.success(signupData?.message ?? "Signup successful");
      reset();
      router.push("/login");
    }
    if (isSignupError && signupError) {
      toast.error((signupError as any)?.message ?? "Signup failed");
    }
  }, [signupData, isSignupLoading, isSignupError, signupError, reset, router]);

  const onSubmit = (data: SignupFormData) => {
    console.log("Submitting signup data:", data);
    signup(data); // Corrected: using `signup` not `login`
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
            Seamless Signup for Exclusive Access
          </h2>
          <p className="text-sm mt-6 text-slate-500 leading-relaxed">
            Immerse yourself in a hassle-free signup journey with our
            intuitively designed form. Effortlessly create your account.
          </p>
          <p className="text-sm mt-12 text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </div>

        <div className="w-full">
          <h1 className="text-2xl mb-12 text-center">Signup here</h1>
          <FormProvider {...method}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md w-full md:ml-auto"
            >
              <div className="space-y-6">
                <div>
                  <CustomInput
                    name="name"
                    type="text"
                    label="Enter Your Name"
                    placeholder="Enter Name"
                  />
                </div>
                <div>
                  <CustomInput
                    name="email"
                    type="email"
                    label="Enter Your Email"
                    placeholder="Enter Email"
                  />
                </div>
                <div>
                  <CustomInput
                    name="password"
                    type="password"
                    label="Enter Your Password"
                    placeholder="Enter Password"
                  />
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign up
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
