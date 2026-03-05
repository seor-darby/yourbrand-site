import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";

  return {
    title: {
      default: "Seor",
      template: "%s | Seor",
    },
    description: isKo
      ? "감각을 통해 존재를 해석하는 사람 — 식재료, 글, 감각의 기록"
      : "Interpreting existence through the senses — ingredients, writing, and sensory records",
    keywords: isKo
      ? ["Seor", "감각", "식재료", "브랜딩", "글쓰기", "존재"]
      : ["Seor", "sensory", "ingredients", "branding", "writing", "existence"],
    authors: [{ name: "Seor" }],
    openGraph: {
      title: "Seor",
      description: isKo
        ? "감각을 통해 존재를 해석하는 사람"
        : "Interpreting existence through the senses",
      url: "https://seor-web.vercel.app",
      siteName: "Seor",
      locale: isKo ? "ko_KR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Seor",
      description: isKo
        ? "감각을 통해 존재를 해석하는 사람"
        : "Interpreting existence through the senses",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://seor-web.vercel.app",
      languages: {
        ko: "https://seor-web.vercel.app/ko",
        en: "https://seor-web.vercel.app/en",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
