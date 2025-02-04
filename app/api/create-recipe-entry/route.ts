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

        const publishRecipeData = {
                "entries": [{
                    "uid": data.entry.uid,
                    "content_type": "recipe",
                    "version": 1,
                    "locale": "en-us"
                }],
                "locales": [
                    "en-us"
                ],
                "environments": [
                    "development"
                ],
                "publish_with_reference": true,
                "skip_workflow_stage_check": true
        };

        const publishEntry = await axios.post(
            `https://api.contentstack.io/v3/bulk/publish?x-bulk-action=publish`,
            publishRecipeData,
            {
                headers: {
                    "api_key": process.env.CONTENTSTACK_API_KEY,
                    "authorization": process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
                },
            }
        );

        const getResponse = await axios.get(`https://api.contentstack.io/v3/content_types/home_page/entries/bltb9b7daa44e1dcc7d`, {
            headers: {
                api_key: process.env.CONTENTSTACK_API_KEY,
                authorization: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
                "Content-Type": "application/json",
            },
        });

        const existingEntry = getResponse.data.entry;
        const newBlock = {
            recipe: {
                reference: [
                    {
                        uid: data.entry.uid, 
                        _content_type_uid: "recipe",
                    },
                ],
            },
        };

        if (!existingEntry.recipes) {
            existingEntry.recipes = [];
        }

        existingEntry.recipes.push(newBlock);
        const upEntry = {"recipes":existingEntry.recipes};

        const updateUrl = `https://api.contentstack.io/v3/content_types/home_page/entries/bltb9b7daa44e1dcc7d`;
        const updateResponse = await axios.put(updateUrl, { entry: upEntry }, {
            headers: {
                api_key: process.env.CONTENTSTACK_API_KEY,
                authorization: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
                "Content-Type": "application/json",
            },
        });

        const publishData = {
            entry: {
                environments: [process.env.CONTENTSTACK_ENVIRONMENT], // Specify the target environment
                locales: ["en-us"], // Adjust locale as needed
            },
            "locale": "en-us",
            "publish_with_reference": true
        };

        const publishHomePage = await axios.post(
            `https://api.contentstack.io/v3/content_types/home_page/entries/bltb9b7daa44e1dcc7d/publish`,
            publishData,
            {
                headers: {
                    "api_key": process.env.CONTENTSTACK_API_KEY,
                    "authorization": process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
                },
            }
        );

        // Respond with the created recipe entry
        return NextResponse.json({
            success: true,
            recipe: createEntryResponse.data,
        });
    } catch (error) {
        console.error("Error creating recipe entry:", error);
        return NextResponse.json({ error: "Entry creation failed", "msg":error}, { status: 500 });
    }
}
