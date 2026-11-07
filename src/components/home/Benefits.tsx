import Image from "next/image";
import React from "react";
import { Container } from "@/components/home/Container";
import { StaticImageData } from "next/image";

interface BenefitItem {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface BenefitsProps {
  imgPos?: "left" | "right";
  data: {
    title: string;
    desc: string;
    image: StaticImageData | string;
    bullets: BenefitItem[];
  };
}

export const Benefits = (props: Readonly<BenefitsProps>) => {
  const { data, imgPos } = props;

  return (
    <div>
      <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap">
        <div
          className={`flex items-center justify-center w-full lg:w-1/2 ${
            imgPos === "right" ? "lg:order-1" : ""
          }`}
        >
          <div>
            <Image
              src={data.image}
              width={600}
              height={600}
              alt={`${data.title} benefit illustration`}
              className="object-cover"
              quality={100}
              priority={true}
            />
          </div>
        </div>

        <div className={`flex flex-wrap items-center w-full lg:w-1/2`}>
          <div>
            <div className="flex flex-col w-full mt-4">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                {data.title}
              </h3>
              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                {data.desc}
              </p>
            </div>

            <div className="w-full mt-5">
              {data.bullets.map((item, index) => (
                <BenefitItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const BenefitItem = ({ title, desc, icon: Icon }: BenefitItem) => {
  return (
    <div className="flex items-start mt-8 space-x-3">
      <div className="flex items-center justify-center shrink-0 mt-1 bg-green-500 rounded-md w-11 h-11">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {title}
        </h4>
        <p className="mt-1 text-gray-500 dark:text-gray-400">{desc}</p>
      </div>
    </div>
  );
};
