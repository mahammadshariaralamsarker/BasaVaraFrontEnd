// app/components/Navbar.tsx
'use client';

import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = ({ token }: { token?: string }) => {
  let isTenant = false;
  let isAdmin = false;
  let isLandlord = false;

  try {
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      isTenant = decoded.role === 'tenant';
      isAdmin = decoded.role === 'admin';
      isLandlord = decoded.role === 'landlord';
    }
  } catch (e) {
    console.error("Invalid token", e);
  }

  const menuItems = (
    <>
      <li className="hover:text-gray-600"><Link href="/">Home</Link></li>
      <li className="hover:text-gray-600"><Link href="/about">About Us</Link></li>
      <li className="hover:text-gray-600"><Link href="/support">Support</Link></li>
      {!isTenant && (
        <li className="hover:text-gray-600"><Link href="/dashboard">Dashboard</Link></li>
      )}
    </>
  );

  return (
    <div className="w-[90%] mx-auto flex items-center justify-between bg-white border-b py-4">
      {/* Logo & menu */}
      <div className="flex items-center">
        <div className="relative lg:hidden">
          {/* Mobile dropdown */}
          <div tabIndex={0} role="button" className="p-2 rounded-md hover:bg-gray-100 focus:outline-none">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="absolute mt-3 z-10 p-2 shadow-md bg-white rounded-md w-52">
            {menuItems}
          </ul>
        </div>

        <Link href="/" className="ml-4 text-xl font-semibold text-gray-800 hover:text-gray-600">
          NextAuth
        </Link>
      </div>

      <div className="hidden lg:flex">
        <ul className="flex space-x-6 text-gray-800">{menuItems}</ul>
      </div>

      <div className="flex items-center">
        {token ? (
          <button onClick={() => signOut()}
            className="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-black transition duration-200">
            Logout
          </button>
        ) : (
          <Link href="/login"
            className="border border-teal-500 text-teal-500 px-5 py-2 rounded-full hover:bg-teal-500 hover:text-black transition duration-200">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
