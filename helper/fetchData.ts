// helper/fetchData.ts

import { getAllEntries } from "@/helper";  // Import your original getAllEntries function

// Function to fetch home page data
export const fetchHomePageData = async () => {
  try {
    const data = await getAllEntries();  // Fetch the data
    return data;  // Return the fetched data
  } catch (error) {
    console.error("Error fetching home page data:", error);
    throw error;  // Rethrow the error so it can be caught in the component
  }
};
