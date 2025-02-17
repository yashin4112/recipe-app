"use client";

import { useRouter } from "next/navigation"; // App Router
// import { useRouter } from "next/router"; // Pages Router
import { useEffect } from "react";
import "../globals.css"

const UnauthorizedPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/"); // Redirect to home or login page after a few seconds
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-2 text-lg">You do not have permission to view this page.</p>
      <p className="mt-4 text-gray-500">Redirecting to homepage...</p>
    </div>
  );
};

export default UnauthorizedPage;
