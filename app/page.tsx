"use client";  // Ensure this is a client-side component

import { useState, useEffect } from "react";  // Import useState and useEffect
import { useSession } from "next-auth/react";  // Import useSession hook
import { useRouter } from "next/navigation";  // Import useRouter for redirection
import Home from '../components/home';  // Import the Home component
import { HomePageProps } from "@/typescript/layout";
import LoadingSpinner from "@/components/loadingspiner";  // Import the loading spinner

// Define the HomePageProps interface (example)
export const dynamic = "force-dynamic";

export default function Page() {
  const { data: session, status } = useSession();  // Use session hook to check session data
  const router = useRouter();  // Use router for navigation

  // Initialize homePageData with correct type
  const [homePageData, setHomePageData] = useState<HomePageProps | null>(null);  // State to store fetched data
  const [loading, setLoading] = useState(true);  // State to manage loading state
  const [error, setError] = useState<string | null>(null);  // State for handling errors

  // Effect to check session status and fetch home page data if authenticated
  useEffect(() => {
    if (status === "loading") router.push("/login");  // Wait until the session is loaded

    if (!session) {
      // Redirect to login page if not authenticated
      router.push("/login");
    } else {
      // Fetch home page data once session is available
      const fetchData = async () => {
        try {
          const response = await fetch("/api/get-recipes");  // Make API call to fetch home page data
          
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();  // Parse the response data
          setHomePageData(data.recipes);  // Update state with the fetched data
        } catch (error: any) {
          setError(error.message);  // Handle errors during data fetch
        } finally {
          setLoading(false);  // Stop loading once data is fetched or error occurs
        }
      };

      fetchData();
    }
  }, [session, status, router]);  // Run the effect when session or status changes

  // Block rendering if still loading
  if (loading || status === "loading") {
    return <LoadingSpinner />;  // Display loading state while the session is being checked or data is loading
  }

  // If not logged in, don't render the page
  if (!session) {
    return null;  // Prevent rendering any content if the user is not logged in
  }

  // If no data is available after fetching
  if (!homePageData) {
    return <div>No data available</div>;  // Handle the case where no data is fetched
  }

  // If there was an error fetching the data
  if (error) {
    return <div>Error: {error}</div>;  // Display the error message
  }

  return (
    <div>
      <Home homePageData={homePageData} />  {/* Passing the data as a prop */}
    </div>
  );
}
