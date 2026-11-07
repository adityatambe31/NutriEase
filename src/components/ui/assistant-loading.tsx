export function AssistantLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-8 shadow-xl flex flex-col items-center max-w-md mx-4 border-2 border-orange-200">
        <div className="relative h-20 w-20 mb-4">
          <div className="animate-spin absolute h-full w-full">
            <svg className="h-full w-full text-orange-500" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            👩‍🍳
          </div>
        </div>
        <p className="text-lg font-medium text-orange-700">Preparing your cooking assistant...</p>
      </div>
    </div>
  );
}