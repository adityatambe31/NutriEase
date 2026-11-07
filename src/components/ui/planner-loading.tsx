export function PlannerLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-8 shadow-xl flex flex-col items-center max-w-md mx-4 border-2 border-blue-200">
        <div className="relative h-20 w-20 mb-4">
          <div className="animate-spin absolute h-full w-full rounded-full border-4 border-t-blue-500 border-r-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            📅
          </div>
        </div>
        <p className="text-lg font-medium text-blue-700">Preparing your meal plan...</p>
      </div>
    </div>
  );
}