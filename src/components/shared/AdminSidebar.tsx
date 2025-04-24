'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaHome } from "react-icons/fa";

const AdminSidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="bg-slate-100 h-full p-4 rounded-xl">
      <ul className="space-y-4">
        <li>
          <Link
            href="/admin/listing"
            className={`flex items-center space-x-2 p-3 rounded-md text-gray-700
              ${isActive("/admin/listing") ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-200"}
            `}
          >
            <FaHome className="h-5 w-5" />
            <span>All Landlord</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/user"
            className={`flex items-center space-x-2 p-3 rounded-md text-gray-700
              ${isActive("/admin/user") ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-200"}
            `}
          >
            <FaUser className="h-5 w-5" />
            <span>User Info</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
