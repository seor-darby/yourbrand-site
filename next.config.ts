import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./app/i18n.ts");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);