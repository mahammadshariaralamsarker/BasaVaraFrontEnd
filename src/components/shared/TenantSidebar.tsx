// components/shared/TenantSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaClipboardList, FaMoneyCheckAlt } from "react-icons/fa";
import { ProfileMenu } from "./CommonProfile";

const TenantSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/tenant/requests",
      icon: <FaClipboardList className="h-5 w-5" />,
      label: "Rental Requests",
      isActive: pathname.startsWith("/tenant/requests"),
    },
    {
      href: "/tenant/payments",
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Payments",
      isActive: pathname.startsWith("/tenant/payments"),
    },
  ];

  return (
    <div className="bg-slate-50 w-full h-full p-4  border-r border-slate-200 flex flex-col rounded-md ">
      {/* Header Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Tenant Portal</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  item.isActive
                    ? "text-blue-600 font-medium bg-slate-200"
                    : "text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="pt-4 border-t border-slate-200">
        <ProfileMenu />
      </div>
    </div>
  );
};

export default TenantSidebar;
