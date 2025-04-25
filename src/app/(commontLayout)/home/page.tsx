"use client";
import { useSelector } from "react-redux";

export default function Home() {
  interface RootState {
    auth: {
      token: string;
      user: string; // Adjust the type based on your actual user structure
    };
  }

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  console.log("🔥 Redux Token:", token);
  console.log("🧠 Redux User:", user);

  return <div>Check the console.</div>;
}
