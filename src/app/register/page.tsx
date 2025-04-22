/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type UserData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "tenant" | "landlord";
  phone: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserData>();

  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: UserData) => {
    const { confirmPassword, ...userData } = data;

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register user");
      }

      const result = await response.json();
      console.log("Server Response:", result);
      window.location.href = "/";
      alert("Registration successful!");
      setSuccess("Registration successful!");
      setErrorMsg("");
    } catch (err: any) {
      console.error("Registration Error:", err.message);
      setErrorMsg(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="my-10">
      <h1 className="text-center text-4xl font-bold mb-5">
        Register <span className="text-teal-500">Now</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?t=st=1710081713~exp=1710085313~hmac=f637c194f1f143e63a84950cbf978997453777c872adf4aebbbecdaa445601a1&w=740"
            width={500}
            height={200}
            alt="login page"
            className="w-full h-[85%] object-cover"
          />
        </div>

        <div className="w-[80%] mx-auto bg-white p-6 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="User Name"
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Role
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="tenant"
                    {...register("role", { required: "Role is required" })}
                    className="mr-2"
                  />
                  Tenant
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="landlord"
                    {...register("role", { required: "Role is required" })}
                    className="mr-2"
                  />
                  Landlord
                </label>
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Phone
              </label>
              <input
                type="number"
                {...register("phone", {
                  required: "Phone is required",
                  // valueAsNumber: true,
                })}
                placeholder="Phone"
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full border border-teal-500 text-teal-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-teal-500 hover:text-black"
              >
                Register
              </button>
            </div>

            {/* Messages */}
            {success && <p className="text-green-600 text-center">{success}</p>}
            {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}

            {/* Redirect to Login */}
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link className="text-teal-500 hover:underline" href="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
