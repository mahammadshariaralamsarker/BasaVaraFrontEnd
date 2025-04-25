"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { baseApi } from "@/redux/apis/baseApi";
import { RootState } from "@/redux/store";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  interface User {
    role?: string;
    email?: string;
  }

  const user = useSelector<RootState, User | null>((state) => state.auth.user);

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    localStorage.removeItem("token");
    router.push("/login");
    toast.success("Logged out successfully!");
  };

  const dashboard = () => {
    if (user?.role) {
      router.push(`/${user.role}`);
    }
  };

  const navClass = (path: string) =>
    pathname === path
      ? "font-bold text-[#14B8A6]   "
      : "hover:bg-black hover:text-white transition duration-200 rounded-md px-2 ";

  const menuItems = (
    <>
      <li className={navClass("/home")}>
        <Link href="/">Home</Link>
      </li>
      <li className={navClass("/tenants")}>
        <Link href="/tenants">Tenants</Link>
      </li>
      <li className={navClass("/about")}>
        <Link href="/about">About Us</Link>
      </li>
      <li className={navClass("/contact")}>
        <Link href="/contact">Contact Us</Link>
      </li>
      {user && (
        <li onClick={dashboard} className={navClass("/dashboard")}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="w-[90%] mx-auto flex items-center justify-between bg-white border-b py-4">
      {/* Logo & Mobile Menu */}
      <ToastContainer />
      <div className="flex items-center">
        <div className="relative lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="absolute mt-3 z-10 p-2 shadow-md bg-white rounded-md w-52"
          >
            {menuItems}
          </ul>
        </div>

        <Link
          href="/"
          className="ml-4 text-xl font-semibold text-gray-800 hover:text-gray-600"
        > 
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:flex">
        <ul className="flex space-x-6 text-gray-800">{menuItems}</ul>
      </div>

      {/* User and Auth Button */}
      <h1>{user?.email}</h1>
      <div className="flex items-center">
        {user?.email ? (
          <button
            onClick={handleLogout}
            className="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-black transition duration-200"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="border border-teal-500 text-teal-500 px-5 py-2 rounded-full hover:bg-teal-500 hover:text-black transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
