"use client"

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "../globals.css"
import { ChefHat, ArrowLeft, Plus, X, Upload } from 'lucide-react';
import { RecipeProps, UploadRecipeProps } from '@/typescript/layout';
// import { console } from 'inspector';

function CreateRecipe() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const recipe: UploadRecipeProps = {
      title: (document.getElementById("recipe-title") as HTMLInputElement)?.value,
      ingredients: ingredients.join(","),
      instructions: instructions.join(","),
      preparation_time: (document.getElementById("cook-time") as HTMLInputElement)?.value,
      serving_size: (document.getElementById("servings") as HTMLInputElement)?.value,
      difficulty: (document.getElementById("difficulty") as HTMLSelectElement)?.value,
      locale: "en-us", // Default locale
      category: (document.getElementById("category") as HTMLSelectElement)?.value,
      description: (document.getElementById("description") as HTMLTextAreaElement)?.value,
      recipe_image: ""
    };
    const formData = new FormData();
    formData.append("file", file!); // Attach file
    formData.append("base",imagePreview!)

    const assetResponse = await fetch("/api/upload", {
      method: "POST",
      body: formData, // Send file in FormData
    });
    const assetResult = await assetResponse.json();
    
    recipe.recipe_image = assetResult.asset.uid;

    const recipeEntryData = {
      entry: {
        ...recipe,
      },
    };

    const recipeResponse = await fetch("/api/create-recipe-entry", {
      method: "POST",
      body: JSON.stringify(recipeEntryData), // Send file in FormData
    });
    const re = await recipeResponse.json();

    if (re.success) {
      window.location.href = "/"; 
    }

    } catch (error) {
      console.error(error)
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      setFile(file)
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // console.log("file",file)
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Recipes
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <ChefHat className="w-10 h-10 text-orange-500 mr-3" />
            <h1 className="text-3xl font-bold">Create New Recipe</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Title
                </label>
                <input
                  type="text"
                   
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter recipe title"
                  id='recipe-title'
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                   
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Describe your recipe"
                  id='description'
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                     
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    id='category'
                  >
                    <option value="">Select category</option>
                    <option value="Quick & Easy">Quick & Easy</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Trending">Trending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cook Time (minutes)
                  </label>
                  <input
                    type="number"
                     
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    id='cook-time'
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servings
                  </label>
                  <input
                    type="number"
                     
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    id='servings'
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Image
                </label>
                <div
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="mb-4">
                        <img
                          src={imagePreview}
                          alt="Recipe preview"
                          className="mx-auto h-32 w-auto rounded-lg"
                        />
                      </div>
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                         
                      />
                      <p className="pl-1">
                        {imagePreview ? 'Click to change image' : 'Click to upload recipe image'}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                   
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  id='difficulty'
                >
                  <option value="">Select difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Ingredients</h2>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center text-orange-500 hover:text-orange-600"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Ingredient
                </button>
              </div>
              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter ingredient"
                    />
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Instructions</h2>
                <button
                  type="button"
                  onClick={addInstruction}
                  className="flex items-center text-orange-500 hover:text-orange-600"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Step
                </button>
              </div>
              <div className="space-y-3">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder={`Step ${index + 1}`}
                    />
                    {instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Create Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;
