"use client";

import { redirect, useRouter } from "next/navigation";

export default function Container() {
  const handleLogout = () => {
    redirect("/api/logout");
  };

  return (
    <section className="w-full">
      <div className="mx-auto w-[90%] px-4 py-8">
        <h1 className="mb-4">Dashboard</h1>
        <button
          className="rounded-md bg-blue-400 px-8 py-2 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </section>
  );
}
