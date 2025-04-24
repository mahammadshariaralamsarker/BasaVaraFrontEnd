"use client";
import { useSelector } from "react-redux";

export default function Home() {
  const token = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);

  console.log("🔥 Redux Token:", token);
  console.log("🧠 Redux User:", user);

  return <div>Check the console.</div>;
}
