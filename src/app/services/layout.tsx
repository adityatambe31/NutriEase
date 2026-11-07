import { AuthListener } from '@/auth/components/auth-detection';
import { AuthSessionProvider } from '@/auth/components/session-provider';
import { Footer } from '@/components/home/Footer';
import { Header } from '@/components/layout/header-section';
import { header } from '@/config/landing-page';
import { Geist, Geist_Mono } from 'next/font/google';

import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Services',
  description: 'Services provided by Nutriease',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { headerBrandName, headerItems } = header[0];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AuthSessionProvider>
        <AuthListener>
          <Header items={headerItems} brandName={headerBrandName} />
          <main>{children}</main>
          <Footer />
        </AuthListener>
      </AuthSessionProvider>
    </div>
  );
}
