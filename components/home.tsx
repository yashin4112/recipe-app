
"use client";

import { useState, useEffect } from "react";
import {useRouter} from "next/navigation";
import { Search, ChefHat, PlusCircle } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import "../app/globals.css";
import { HomePageProps } from "@/typescript/layout";

interface HomeProps {
  homePageData: HomePageProps;
}

export default function Home({ homePageData }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const router = useRouter()

  useEffect(() => {
    if (!homePageData || !homePageData.recipes) return;

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = homePageData.recipes.filter((recipe) => {
      //@ts-ignore
      const recipeData = recipe.recipe.reference[0];
      const titleMatch = recipeData.title
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const descriptionMatch = recipeData.description
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const ingredientsMatch = recipeData.ingredients
        .toLowerCase()
        .split(",")
        .some((ingredient: string) =>
          ingredient.toLowerCase().includes(lowercasedSearchTerm)
        );

      return titleMatch || descriptionMatch || ingredientsMatch;
    });

    setFilteredRecipes(filtered);
  }, [searchTerm, homePageData]);

  if (!homePageData) {
    return <div>Error: No data available</div>;
  }

  const { banner_image, banner_title, banner_subtitle, chips, recipe_title } =
    homePageData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            banner_image?.url ||
            "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <ChefHat className="w-16 h-16 text-white mb-6" />
            <h1 className="text-5xl font-bold text-white mb-4">{banner_title}</h1>
            <p className="text-xl text-gray-200 mb-8">{banner_subtitle}</p>
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 pl-14"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {chips?.map((chip, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">
                {chip.category.category}
              </h3>
              <p className="text-gray-600">{chip.category.subdescription}</p>
            </div>
          ))}
        </div>

        {/* Recipes Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{recipe_title}</h2>
          <button
            className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            onClick={() => router.push("/create-recipe")}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create Recipe
          </button>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipe.reference[0].uid}
              recipe={recipe.recipe.reference[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
