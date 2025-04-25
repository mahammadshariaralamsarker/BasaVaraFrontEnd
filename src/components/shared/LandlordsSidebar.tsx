import Link from "next/link";
import { FaUser, FaCog } from "react-icons/fa";

const LandlordsSidebar = () => {
  return (
    <div className="bg-slate-100 min-h-screen p-4 rounded-xl">
      <ul className="space-y-4">
        <li>
          <Link
            href="/landlords/listings "
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 text-gray-700"
          >
            <FaUser className="h-5 w-5" />
            <span>Listing</span>
          </Link>
        </li>
        <li>
          <Link
            href="/landlords/requests"
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

export default LandlordsSidebar;
