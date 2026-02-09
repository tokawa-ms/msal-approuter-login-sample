import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n/resources";
import { getLocaleFromCookie } from "@/lib/i18n/locale";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MSAL Login Demo",
  description: "MSAL.js login and Azure SDK integration on Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocaleFromCookie();
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale}>
      <body className={`${spaceGrotesk.variable} ${fraunces.variable} antialiased`}>
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Header locale={locale} dictionary={dictionary} />
            <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
              {children}
            </main>
            <Footer dictionary={dictionary} />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
