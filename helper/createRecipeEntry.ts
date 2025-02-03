// helpers/createRecipeEntry.ts

import axios from "axios";

export async function createRecipeEntry(recipeData: {
    title: string | FormDataEntryValue;
    description: string | FormDataEntryValue;
    ingredients: string | FormDataEntryValue;
    instructions: string | FormDataEntryValue;
    category: string | FormDataEntryValue;
    serving_size: string | FormDataEntryValue;
    difficulty: string | FormDataEntryValue;
    cook_time: string | FormDataEntryValue;
    recipe_image: string;
}) {
    try {
        const recipeEntry = {
            entry: {
                title: recipeData.title,
                description: recipeData.description,
                ingredients: recipeData.ingredients,
                instructions: recipeData.instructions,
                category: recipeData.category,
                serving_size: recipeData.serving_size,
                difficulty: recipeData.difficulty,
                cook_time: recipeData.cook_time,
                recipe_image: recipeData.recipe_image, // Use asset UID here
            },
        };

        const createEntryResponse = await axios.post(
            "https://api.contentstack.io/v3/content_types/recipe/entries",
            recipeEntry,
            {
                headers: {
                    api_key: process.env.CONTENTSTACK_API_KEY!,
                    authorization: process.env.CONTENTSTACK_MANAGEMENT_TOKEN!,
                    "Content-Type": "application/json",
                },
            }
        );

        // Return the created entry
        return {
            recipe: createEntryResponse.data,
        };
    } catch (error) {
        console.error("Error creating recipe entry:", error);
        return { error: "Failed to create recipe entry" };
    }
}
