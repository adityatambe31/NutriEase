import { AuthListener } from '@/auth/components/auth-detection';
import { Footer } from '@/components/home/Footer';
import { Header } from '@/components/layout/header-section';
import { header } from '@/config/landing-page';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NutriEase',
  description: 'AI Driven - Food Planner - Smart Bites, Better Lives',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
