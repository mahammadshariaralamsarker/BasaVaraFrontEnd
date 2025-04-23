"use client";

import UserProvider from "@/context/UserContext";
import StoreProviders from "./StoreProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <StoreProviders>{children}</StoreProviders>
    </UserProvider>
  );
};
export default Providers;
