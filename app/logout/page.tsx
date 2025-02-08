// pages/logout.tsx

"use client"

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      await signOut({ redirect: false });  // Sign out without redirecting automatically
      router.push("/login");  // After logging out, redirect to login page
    };

    logoutUser();  // Call the logout function on page load
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl">Logging out...</div>  {/* Optional loading text */}
    </div>
  );
};

export default LogoutPage;
