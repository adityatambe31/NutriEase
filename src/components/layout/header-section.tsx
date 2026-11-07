'use client';

import {
  AuthButton,
  MobileAuthButton,
} from '@/components/layout/auth-button.client-entry';
import { EnvironmentBadge } from '@/components/layout/environment-badge';
import { ServicesDropdown } from '@/components/layout/services-dropdown-menu';
import { useMenu } from '@/hooks/use-menu';
import { useServices } from '@/hooks/use-services';
import { IconButton } from '@mui/material';
import { Home, Info, Menu as MenuIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {
  brandName: { name: string; path: string };
  items: { name: string; path: string }[];
}

const getItemIcon = (itemName: string) => {
  const iconMap: Record<string, React.ElementType> = {
    Home: Home,
    About: Info,
  };

  return iconMap[itemName] || Info;
};

export function Header({ brandName, items }: HeaderProps) {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMenu();
  const { services } = useServices();

  return (
    <div className="w-full bg-white  top-0 z-100 border-b border-gray-200">
      <header className="container flex items-center justify-between mx-auto h-16">
        <Link
          href={brandName.path}
          className="flex items-center space-x-3 px-4 py-2"
          prefetch={false}
        >
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={36}
            height={36}
            className="flex-shrink-0"
          />
          <h3 className="text-lg font-bold truncate max-w-[120px] sm:max-w-full">
            {brandName.name}
          </h3>
          <EnvironmentBadge />
        </Link>

        <nav className="hidden lg:flex items-center gap-4 h-full pr-4">
          {items.map((item) => (
            <div key={item.name} className="h-full flex items-center">
              <Link
                href={item.path}
                className="px-4 py-2 text-sm font-medium hover:bg-green-100 rounded-md h-10 flex items-center"
              >
                {item.name}
              </Link>
            </div>
          ))}
          <ServicesDropdown />
          <AuthButton />
        </nav>
        <div className="lg:hidden flex items-center pr-4">
          <IconButton
            onClick={toggleMobileMenu}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            size="small"
            className="hover:bg-gray-100 rounded-full"
          >
            {mobileMenuOpen ? (
              <X className="text-gray-900" size={24} />
            ) : (
              <MenuIcon className="text-gray-900" size={24} />
            )}
          </IconButton>
        </div>
      </header>

      {/* Separate mobile menu that slides down */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden w-full bg-white border-t border-gray-200"
        >
          <div className="container mx-auto py-4 space-y-2">
            {items.map((item) => {
              const ItemIcon = getItemIcon(item.name);
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className="flex items-center gap-3 w-full px-4 py-3 text-base font-medium hover:bg-green-100 rounded-md"
                  onClick={closeMobileMenu}
                >
                  <div className="p-1.5 rounded-full flex items-center justify-center bg-gray-100">
                    <ItemIcon className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <h3 className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Services
              </h3>
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.name}
                    href={service.path}
                    className="flex items-center gap-3 px-4 py-3 w-full hover:bg-green-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    <div
                      className={`p-1.5 rounded-full flex items-center justify-center ${service.bgColor}`}
                    >
                      <Icon className={`w-4 h-4 ${service.color}`} />
                    </div>
                    <span className="font-medium text-gray-900">
                      {service.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <h3 className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Account
              </h3>
              <div className="px-4">
                <MobileAuthButton closeMobileMenu={closeMobileMenu} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
