'use client';

interface RecipeDetailsProps {
    title: string;
    ingredients: string[];
    instructions: string;
}

export default function RecipeDetails({ title, ingredients, instructions }: RecipeDetailsProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h2>
            
            <div className="mb-6">
                <h3 className="text-lg font-medium text-blue-600 mb-3">Ingredients:</h3>
                <ul className="space-y-2">
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <span className="mt-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            </span>
                            <span className="text-gray-700">{ingredient}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div>
                <h3 className="text-lg font-medium text-blue-600 mb-3">Instructions:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{instructions}</p>
            </div>
        </div>
    );
}