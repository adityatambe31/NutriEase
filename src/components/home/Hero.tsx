import { Container } from "@/components/home/Container";
import Link from "next/link";

interface HeroProps {
  heading: string;
  subHeading: string;
  description: string;
  button: { title: string; linkTo: string }[];
}

export function Hero({ heading, subHeading, description, button }: HeroProps) {
  return (
    <div className="relative bg-cover bg-center bg-[url(/LandingBG.jpg)] bg-blend-multiply">
      <div className="absolute inset-0 bg-black/40"></div>
      <Container className="relative flex flex-col items-center text-center text-white px-6 py-20 lg:flex-row lg:text-left">
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight sm:text-4xl lg:text-6xl">
            {heading}
          </h1>
          <p className="text-lg sm:text-xl font-semibold italic text-green-400 mt-2">
            {subHeading}
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed font-normal text-gray-100">
            {description}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            {button.map((btn, index) => (
              <Link
                key={index}
                href={btn.linkTo}
                rel="noopener"
                className="px-6 py-3 text-lg font-medium bg-green-500 hover:bg-green-700 rounded-lg text-white transition-all duration-300"
              >
                {btn.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden lg:block lg:min-h-[450px] w-1/2"></div>
      </Container>
    </div>
  );
}
