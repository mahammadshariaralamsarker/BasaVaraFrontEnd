import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="flex">
      {session?.user ? (
        <>
          {session?.user?.name} 
          <Image
            width={100}
            height={100}
            src={session?.user?.image as string} 
            
            alt="profile"
            className="rounded-full "
          />
        </>
      ) : null}
    </div>
  );
};

export default DashboardPage;
