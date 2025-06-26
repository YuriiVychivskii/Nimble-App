import { cn } from '@/shared/lib/utils';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Nimble - Subscription Tracker',
  description: 'Easily track and manage your subscriptions in one place.',
  keywords: ['subscriptions', 'tracker', 'management'],
  authors: [
    {
      name: 'Yurii Vychivskii',
      url: 'https://www.linkedin.com/in/yurii-vychivskii/',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable)}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <main className="grow">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
