import { FooterContainer, FooterBottom } from "@/components/ui/footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { footer } from "@/config/landing-page";

export function Footer() {
  const { footerBrandName, footerTeamName, footerTeamLogo, footerItems } =
    footer[0];

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <footer className="w-full bg-background px-4">
        <div className="mx-auto max-w-container">
          <FooterContainer className="pt-0">
            <FooterBottom className="mt-0 flex flex-col items-center gap-4 sm:flex-col md:flex-row">
              <div className="flex items-center">
                <Image
                  src={footerTeamLogo.path}
                  alt={footerTeamLogo.alt}
                  width={35}
                  height={35}
                />
                <Link href={footerTeamName.path}>
                  <h3 className="group inline-flex w-max text-black items-center justify-center rounded-md px-4 py-2 text-xl font-bold transition-colors hover:text-primary focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-white">
                    {footerTeamName.name}
                  </h3>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                © {new Date().getFullYear()} {footerBrandName.name}. All rights
                reserved
              </div>
              <div className="flex items-center gap-4">
                {footerItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </FooterBottom>
          </FooterContainer>
        </div>
      </footer>
    </div>
  );
}
