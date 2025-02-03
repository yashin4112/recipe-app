// import React from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { ChefHat, Clock, Users, Utensils, ArrowLeft } from 'lucide-react';
// // import { recipes } from '../data/recipes';

// const RecipeDetails = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   // Find the recipe by ID
//   const recipe = recipes.find((r) => r.id === Number(id));

//   if (!recipe) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
//           <Link href="/" className="text-orange-500 hover:text-orange-600 flex items-center justify-center">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <Link href="/" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-8">
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Recipes
//         </Link>

//         {/* Hero Section */}
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
//           <div className="relative h-[400px]">
//             <img
//               src={recipe.image}
//               alt={recipe.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
//               <div className="p-8 text-white">
//                 <span className="px-3 py-1 bg-orange-500 rounded-full text-sm mb-4 inline-block">
//                   {recipe.category}
//                 </span>
//                 <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
//                 <p className="text-lg text-gray-200">{recipe.description}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recipe Info */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//           <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
//             <Clock className="w-6 h-6 text-orange-500 mr-3" />
//             <div>
//               <p className="text-sm text-gray-500">Cook Time</p>
//               <p className="font-semibold">{recipe.cookTime} minutes</p>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
//             <Users className="w-6 h-6 text-orange-500 mr-3" />
//             <div>
//               <p className="text-sm text-gray-500">Servings</p>
//               <p className="font-semibold">{recipe.servings} people</p>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
//             <Utensils className="w-6 h-6 text-orange-500 mr-3" />
//             <div>
//               <p className="text-sm text-gray-500">Difficulty</p>
//               <p className="font-semibold">{recipe.difficulty}</p>
//             </div>
//           </div>
//         </div>

//         {/* Ingredients & Instructions */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-6 flex items-center">
//               <ChefHat className="w-6 h-6 text-orange-500 mr-2" />
//               Ingredients
//             </h2>
//             <ul className="space-y-3">
//               {recipe.ingredients.map((ingredient, index) => (
//                 <li key={index} className="flex items-center">
//                   <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
//                   {ingredient}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-6 flex items-center">
//               <Utensils className="w-6 h-6 text-orange-500 mr-2" />
//               Instructions
//             </h2>
//             <ol className="space-y-4">
//               {recipe.instructions.map((instruction, index) => (
//                 <li key={index} className="flex">
//                   <span className="font-bold text-orange-500 mr-3">{index + 1}.</span>
//                   {instruction}
//                 </li>
//               ))}
//             </ol>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetails;
