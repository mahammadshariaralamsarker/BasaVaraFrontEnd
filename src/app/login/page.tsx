/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

import { useAppDispatch } from "@/redux/hooks";

import { verifyToken } from "@/utils/verifyToken";
import { JwtPayload } from "jsonwebtoken";
import { setUser } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation(); //ekta array return korbe

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    const res = await login(userInfo).unwrap();
    const token = res.data.token;

    // Save in localStorage for client-side access

    const decoded = verifyToken(token) as JwtPayload & { role: string };
    localStorage.setItem("token", token);
    dispatch(setUser({ user: decoded, token }));

    console.log(res);
    if (res?.status) {
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
    // toast.success("Login Successfully");
    router.push(`/${decoded?.role}`);
  };

  return (
    <div className="my-10 w-[90%] mx-auto">
      <Toaster />
      <h1 className="text-center text-4xl mb-5 font-bold">
        Login <span className="text-teal-500">Here</span>
      </h1>

      <div className="w-full md:w-[50%] mx-auto bg-white p-6 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full border border-teal-500 text-teal-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-teal-500 hover:text-black"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-teal-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
