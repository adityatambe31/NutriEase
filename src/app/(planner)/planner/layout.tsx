import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '../../globals.css';

import { AuthListener } from '@/auth/components/auth-detection';
import { Footer } from '@/components/home/Footer';
import { Header } from '@/components/layout/header-section';
import { header } from '@/config/planner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Planner',
  description: 'AI Driven Health Planner',
};

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { headerBrandName, headerItems } = header[0];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AuthListener>
        <Header items={headerItems} brandName={headerBrandName} />
        <main>{children}</main>
        <Footer />
      </AuthListener>
    </div>
  );
}
