import Link from "next/link";
import { FaUser, FaCog, FaHome } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-slate-100 min-h-screen p-4 rounded-xl">
      <ul className="space-y-4">
        <li>
          <Link
            href="/admin/listing"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700"
          >
            <FaHome className="h-5 w-5" />
            <span>All Landlord</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/user "
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700"
          >
            <FaUser className="h-5 w-5" />
            <span>User Info</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/request"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700"
          >
            <FaCog className="h-5 w-5" />
            <span>Request</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
