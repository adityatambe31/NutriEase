import { FooterContainer, FooterBottom } from "@/components/ui/footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FooterProps extends React.ComponentPropsWithoutRef<"div"> {
  brandName: { name: string; path: string };
  teamName: { name: string; path: string };
  teamLogo: { alt: string; path: string };
  footerItems: { name: string; path: string }[];
}

export function Footer({
  brandName,
  teamName,
  teamLogo,
  footerItems,
  ...props
}: FooterProps) {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8" {...props}>
      <footer className="w-full bg-background px-4">
        <div className="mx-auto max-w-container">
          <FooterContainer className="pt-0">
            <FooterBottom className="mt-0 flex flex-col items-center gap-4 sm:flex-col md:flex-row">
              <div className="flex items-center">
                <Image
                  src={teamLogo.path}
                  alt={teamLogo.alt}
                  width={35}
                  height={35}
                />
                <Link href={teamName.path}>
                  <h3 className="group inline-flex w-max text-black items-center justify-center rounded-md px-4 py-2 text-xl font-bold transition-color focus:outline-hidden disabled:pointer-events-none disabled:opacity-50">
                    {teamName.name}
                  </h3>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                © 2025 {brandName.name}. All rights reserved
              </div>
              <div className="flex items-center gap-4">
                {footerItems.map((item) => (
                  <a key={item.name} href={item.path}>
                    {item.name}
                  </a>
                ))}
              </div>
            </FooterBottom>
          </FooterContainer>
        </div>
      </footer>
    </div>
  );
}
