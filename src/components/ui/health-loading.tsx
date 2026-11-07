export function HealthLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-8 shadow-xl flex flex-col items-center max-w-md mx-4 border-2 border-green-200">
        <div className="relative h-20 w-20 mb-4">
          <div className="animate-pulse absolute h-full w-full rounded-full bg-green-100"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        <p className="text-lg font-medium text-green-700">Loading health tracker...</p>
      </div>
    </div>
  );
}