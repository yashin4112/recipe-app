// "use client";  // Ensure this is a client-side component

// import { useState, useEffect } from "react";  // Import useState and useEffect
// import { useSession } from "next-auth/react";  // Import useSession hook
// import { useRouter } from "next/navigation";  // Import useRouter for redirection
// import Home from '../components/home';  // Import the Home component
// import { HomePageProps } from "@/typescript/layout";
// import LoadingSpinner from "@/components/loadingspiner";

// // Define the HomePageProps interface (example)

// export const dynamic = "force-dynamic";

// export default function Page() {
//   const { data: session, status } = useSession();  // Use session hook to check session data
//   const router = useRouter();  // Use router for navigation

//   // Initialize homePageData with correct type
//   const [homePageData, setHomePageData] = useState<HomePageProps | null>(null);  // State to store fetched data
//   const [loading, setLoading] = useState(true);  // State to manage loading state

//   // Redirect logic: If session is loading or user is not logged in, redirect to login page
//   useEffect(() => {
//     if (status === "loading") return;  // Wait until the session is loaded
//     if (!session) {
//       router.push("/login");  // Redirect to login page if not authenticated
//     } else {
//       // Fetch home page data once session is available
//       const fetchData = async () => {
//         try {
//           // Make API call to fetch home page data
//           const response = await fetch("/api/get-recipes");  // This is the new API call
          
//           if (!response.ok) {
//             throw new Error("Failed to fetch data");
//           }
//           const data = await response.json();  // Parse the response data
//           // console.log(data.recipes)
//           setHomePageData(data.recipes);  // Update state with the fetched data
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         } finally {
//           setLoading(false);  // Stop loading once data is fetched
//         }
//       };

//       fetchData();
//     }
//   }, [session, status, router]);  // Run the effect when session or status changes

//   if (loading) {
//     return <LoadingSpinner/>;  // Display loading state while the session is being checked
//   }

//   if (!homePageData) {
//     return <div>No data available</div>;  // Handle the case where no data is fetched
//   }

//   return (
//     <div>
//       <Home homePageData={homePageData} />  {/* Passing the data as a prop */}
//     </div>
//   );
// }

"use client";  // Ensure this is a client-side component

import { useState, useEffect } from "react";  // Import useState and useEffect
import { useSession } from "next-auth/react";  // Import useSession hook
import { useRouter } from "next/navigation";  // Import useRouter for redirection
import Home from '../components/home';  // Import the Home component
import { HomePageProps } from "@/typescript/layout";
import LoadingSpinner from "@/components/loadingspiner";

// Define the HomePageProps interface (example)

export const dynamic = "force-dynamic";

export default function Page() {
  const { data: session, status } = useSession();  // Use session hook to check session data
  const router = useRouter();  // Use router for navigation

  // Initialize homePageData with correct type
  const [homePageData, setHomePageData] = useState<HomePageProps | null>(null);  // State to store fetched data
  const [loading, setLoading] = useState(true);  // State to manage loading state

  // Redirect logic: If session is loading or user is not logged in, redirect to login page
  useEffect(() => {
    if (status === "loading") return;  // Wait until the session is loaded

    if (!session) {
      router.push("/login");  // Redirect to login page if not authenticated
    } else {
      // Fetch home page data once session is available
      const fetchData = async () => {
        try {
          // Make API call to fetch home page data
          const response = await fetch("/api/get-recipes");  // This is the new API call
          
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();  // Parse the response data
          setHomePageData(data.recipes);  // Update state with the fetched data
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);  // Stop loading once data is fetched
        }
      };

      fetchData();
    }
  }, [session, status, router]);  // Run the effect when session or status changes

  // Block rendering if still loading or no session
  if (loading || status === "loading") {
    return <LoadingSpinner />;  // Display loading state while the session is being checked
  }

  if (!session) {
    return null;  // Prevent rendering any content if the user is not logged in
  }

  if (!homePageData) {
    return <div>No data available</div>;  // Handle the case where no data is fetched
  }

  return (
    <div>
      <Home homePageData={homePageData} />  {/* Passing the data as a prop */}
    </div>
  );
}
