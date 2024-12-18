import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Denise's Form",
  description: 'Denise\'s Form',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon"  href="/denisefavicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
