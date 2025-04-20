// app/components/NavbarWrapper.tsx
import { cookies } from "next/headers"; 
import Navbar from "./shared/Navbar";

const NavbarWrapper = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;
  return <Navbar token={token} />;
};

export default NavbarWrapper;
