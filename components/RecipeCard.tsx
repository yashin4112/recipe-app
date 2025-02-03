// import React from 'react';
// import { Clock, Users, Utensils } from 'lucide-react';
// import { RecipeProps } from '@/typescript/layout'; // Importing the type for the recipe

// interface RecipeCardProps {
//   recipe: RecipeProps;
// }

// const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
//   console.log("RecipeCard rendered", recipe); // Check if recipe is being passed

//   // Check if recipe.recipe is an array and contains items
//   const {
//     title,
//     category,
//     description,
//     cook_time,
//     serving_size,
//     recipe_image, // Assuming this is the field for the recipe image
//   } = recipe; // Accessing the first recipe

//   return (
//     <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//       {/* Recipe Image */}
//       <img
//         src={recipe_image[0]?.url} // Assuming recipe_image is an array and we're taking the first one
//         alt={title}
//         className="w-full h-48 object-cover"
//       />

//       {/* Content Section */}
//       <div className="p-6">
//         {/* Title and Category */}
//         <div className="flex justify-between items-start mb-4">
//           <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
//           <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
//             {category}
//           </span>
//         </div>

//         {/* Description */}
//         <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

//         {/* Recipe Metadata */}
//         <div className="flex items-center justify-between text-gray-500">
//           <div className="flex items-center">
//             <Clock className="w-4 h-4 mr-1" />
//             <span className="text-sm">{cook_time}</span>
//           </div>
//           <div className="flex items-center">
//             <Users className="w-4 h-4 mr-1" />
//             <span className="text-sm">{serving_size} servings</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeCard;

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Next.js router
import { Clock, Users, Utensils } from 'lucide-react';
import { RecipeProps } from '@/typescript/layout';
import qs from 'query-string'; // Install query-string for serialization

interface RecipeCardProps {
  recipe: RecipeProps;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const router = useRouter();

  const handleNavigation = () => {
    const query = qs.stringify({ recipe: JSON.stringify(recipe) }); // Serialize the object
    router.push(`/recipe-details?${query}`); // Pass the serialized recipe as a query parameter
  };

  const { title, category, description, preparation_time, serving_size, recipe_image } = recipe;

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleNavigation}
    >
      <img
      //@ts-ignore 
        src={recipe_image[0]?.url}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
            {category}
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{preparation_time} min </span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{serving_size} servings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
