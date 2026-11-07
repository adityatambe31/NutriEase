interface HeroSectionProps {
  title: string;
  subtitle?: string;
}

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 mb-12 rounded-xl overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px]" />
      <div className="absolute h-full w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse" />

      <div className="relative px-6 py-16 sm:py-20 text-center flex flex-col items-center justify-center">
        <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl backdrop-blur-sm w-fit mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
