"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { baseApi } from "@/redux/apis/baseApi";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "react-hot-toast";

export default function RoleGuard({
  children,
  allowedRole,
}: {
  children: ReactNode;
  allowedRole: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role !== allowedRole) {
        toast.error("You are not authorized to access this page");
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        localStorage.removeItem("token");
        router.replace("/login");
      }
    } else if (checked) {
      // Already checked once, no user — redirect
      toast.error("Please log in to continue");
      router.replace("/login");
    } else {
      setChecked(true); // flag Redux has hydrated once
    }
  }, [user, allowedRole, dispatch, router, checked]);

  // While Redux is hydrating
  if (!user && !checked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  // When redirecting, we return nothing
  if (!user || user.role !== allowedRole) {
    return null;
  }

  // ✅ Authorized
  return <>{children}</>;
}
