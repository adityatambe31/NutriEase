'use client';

interface RecipeCardProps {
    title: string;
    description: string;
    onClick: () => void;
}

export default function RecipeCard({ title, description, onClick }: RecipeCardProps) {
    return (
        <div 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer" 
            onClick={onClick}
        >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}