/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

export type UserData = {
  name: string;
  email: string;
  password: string;
  role: "tenant" | "landlord";
  phone: number;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const onSubmit = async (data: UserData) => {
    console.log("Submitted Data:", data);

    try {
      // Replace this with your actual API call
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const result = await response.json();
      console.log("Server Response:", result);

      // Optionally redirect or show success message
    } catch (err: any) {
      console.error("Registration Error:", err.message);
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
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="User Name"
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Role
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
          <input
            type="radio"
            value="tenant"
            {...register("role")}
            className="mr-2"
            required
          />
          Tenant
            </label>
            <label className="flex items-center">
          <input
            type="radio"
            value="landlord"
            {...register("role")}
            className="mr-2"
            required
          />
          Landlord
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Phone
          </label>
          <input
            type="number"
            {...register("phone", { valueAsNumber: true })}
            placeholder="Phone"
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full border border-teal-500 text-teal-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-teal-500 hover:text-black"
          >
            Register
          </button>
        </div>

        <p className="text-center text-gray-600">
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
