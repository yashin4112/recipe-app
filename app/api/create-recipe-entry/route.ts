import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.json(); // Get the JSON data from the body
        const recipeData = formData.entry; // Extract recipe data (including asset UID)

        // Prepare the recipe entry payload
        const recipeEntryData = {
            "entry": {
                "title": recipeData.title,
                "description": recipeData.description,
                "ingredients": recipeData.ingredients,
                "instructions": recipeData.instructions,
                "category": recipeData.category,
                "serving_size": recipeData.serving_size,
                "difficulty": recipeData.difficulty,
                "cook_time": recipeData.preparation_time,
                "recipe_image": recipeData.recipe_image, // The uploaded asset UID will be used here
            },
        };

        // Create the recipe entry in Contentstack
        const createEntryResponse = await axios.post(
            "https://api.contentstack.io/v3/content_types/recipe/entries",
            recipeEntryData,
            {
                headers: {
                    "api_key": process.env.CONTENTSTACK_API_KEY!,
                    "authorization": process.env.CONTENTSTACK_MANAGEMENT_TOKEN!,
                },
            }
        );
        const data = await createEntryResponse.data;
        console.log("entry uid ", data.entry.uid)

        // const env = process.env.CONTENTSTACK_ENVIRONMENT!;

        // console.log("env ",env)
        const currentTime = new Date().toISOString();
        console.log(currentTime)
        const publishData = {
            entry: {
                environments: [process.env.CONTENTSTACK_ENVIRONMENT], // Specify the target environment
                locales: ["en-us"], // Adjust locale as needed
            },
            "locale": "en-us",
	        // "version": 1,
	        // "scheduled_at": currentTime
        };

        const publishEntry = await axios.post(
            `https://api.contentstack.io/v3/content_types/recipe/entries/${data.entry.uid}/publish`,
            publishData,
            {
                headers: {
                    "api_key": process.env.CONTENTSTACK_API_KEY!,
                    "authorization": process.env.CONTENTSTACK_MANAGEMENT_TOKEN!,
                },
            }
        );
        // Respond with the created recipe entry
        return NextResponse.json({
            success: true,
            recipe: createEntryResponse.data,
            publish:publishEntry.data
        });
    } catch (error) {
        console.error("Error creating recipe entry:", error);
        return NextResponse.json({ error: "Entry creation failed", "msg":error}, { status: 500 });
    }
}
