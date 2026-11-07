import { Footer } from '@/components/home/Footer';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};