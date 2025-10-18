"use client";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();
  return (
    <main className="flex items-center justify-center">
      <h1 className="text-3xl font-bold">Admin Page</h1>
    </main>
  );
}
