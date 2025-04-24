// components/shared/TenantSidebar.tsx

import Link from "next/link";
import { FaUser, FaClipboardList, FaMoneyCheckAlt } from "react-icons/fa";

const TenantSidebar = () => {
  return (
    <div className="bg-slate-100 min-h-screen p-4 rounded-xl">
      <ul className="space-y-4">
        <li>
          <Link
            href="/tenant"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700"
          >
            <FaUser className="h-5 w-5" />
            <span>My Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/tenant/requests"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700"
          >
            <FaClipboardList className="h-5 w-5" />
            <span>Rental Requests</span>
          </Link>
        </li>
        <li>
          <Link
            href="/tenant/payments"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700"
          >
            <FaMoneyCheckAlt className="h-5 w-5" />
            <span>Payments</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TenantSidebar;
