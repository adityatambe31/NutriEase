import Image from "next/image";

interface MealImageProps {
  mealType: string;
  imageUrl?: string; // Add imageUrl prop
}

const MealImage: React.FC<MealImageProps> = ({ mealType, imageUrl }) => {
  return (
    <div className="relative w-full aspect-[3/2] rounded-t-xl overflow-hidden">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${mealType} image`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span>No image available</span>
        </div>
      )}
    </div>
  );
};

export default MealImage;
