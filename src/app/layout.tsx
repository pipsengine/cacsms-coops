
import "./globals.css";
import { Inter } from "next/font/google";
import SessionClientProvider from "./Session";
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cacsms Coops - Cooperative Platform',
  description: 'Enterprise cooperative society management platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SessionClientProvider>
          {children}
        </SessionClientProvider>
      </body>
    </html>
  );
}
