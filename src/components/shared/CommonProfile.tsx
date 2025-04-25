"use client"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { baseApi } from "@/redux/apis/baseApi"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button" 
import { CgProfile } from "react-icons/cg"
import { User, Settings, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link" 
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; 
import { RootState } from "@/redux/store";

 
export function ProfileMenu() { 
  const router = useRouter()
  const dispatch = useDispatch()
  interface User {
    role?: string;
    email?: string;
  }

  const user = useSelector((state: RootState) => state.auth.user) as User | null;

  console.log(user);
 
 

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    localStorage.removeItem("token");
    router.push("/login");
    toast.success("Logged out successfully!",  {
      position: "top-center",
    }); 
  };
   


  return ( 
      <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start px-2">
        <CgProfile />
          <span>My Profile</span>
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href={`/${user?.role}/profile`} className="flex cursor-pointer items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${user?.role}/settings`} className="flex cursor-pointer items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="flex cursor-pointer items-center text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> 
  )
}