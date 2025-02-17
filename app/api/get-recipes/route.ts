// app/api/get-recipes/route.ts (for Next.js 13+ with App Directory)
import { NextResponse } from "next/server";
import { getAllEntries } from "@/helper"; // Assuming getAllEntries function fetches data from DB or any source

// API route to fetch recipes
export async function GET() {
  try {
    const recipes = await getAllEntries();  // Fetch all entries (recipes)
    return NextResponse.json({ success: true, recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch recipes." }, { status: 500 });
  }
}
