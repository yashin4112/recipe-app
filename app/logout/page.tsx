"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loadingspiner";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      // Call signOut to log out the user and prevent auto-redirect.
      await signOut({ redirect: false });

      // Once logged out, redirect the user to the login page manually.
      // window.location.href = "/login"; 
      router.push("/")
    };

    logoutUser();  // Call the logout function on page load
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl"><LoadingSpinner/></div> {/* Optional loading text */}
    </div>
  );
};

export default LogoutPage;
