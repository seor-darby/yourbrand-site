import type { Metadata } from "next";

export const metadata: Metadata = {
  verification: {
    google: "SodPK_pDn9QZu7yfbYAF-gMUCRdRgUD_QmKUVR--s-I",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}