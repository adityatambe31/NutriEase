import { MealOption } from "@/types/meal-plan";
import MealImage from "@/app/(planner)/view-planner/components/meal-image";

interface MealCardProps {
  mealType: string;
  option: MealOption;
  onSelect: (option: MealOption) => void;
  className?: string;
}

export default function MealCard({
  mealType,
  option,
  onSelect,
}: MealCardProps) {
  return (
    <div
      className="relative bg-white flex flex-col rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer
                 w-full sm:w-auto aspect-[3/4] hover:scale-105"
      onClick={() => onSelect(option)}
    >
      {/* Image */}
      <div className="w-full h-auto">
        <MealImage mealType={mealType} imageUrl={option.imageUrl} />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-4 flex flex-col flex-grow overflow-hidden">
        <h3 className="text-left text-sm sm:text-sm text-gray-800 font-medium mb-1 capitalize">
          {mealType}
        </h3>
        <h4 className="text-left text-md sm:text-md md:text-base font-semibold text-gray-900 mb-1 line-clamp-2">
          {option.option}
        </h4>
        <p className="text-left text-md sm:text-md text-gray-700 line-clamp-3 flex-grow">
          {option.recipe}
        </p>
      </div>
    </div>
  );
}
