import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const syne = Syne({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";

  return {
    title: { default: "Seor", template: "%s | Seor" },
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
      url: "https://seorfield.com",
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
    robots: { index: true, follow: true },
    alternates: {
      canonical: "https://seorfield.com",
      languages: {
        ko: "https://seorfield.com/ko",
        en: "https://seorfield.com/en",
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
      <body className={`${syne.variable} ${plusJakarta.variable} antialiased`}>
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}