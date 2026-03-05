"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function Nav({ current }: { current?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const nextLocale = locale === "ko" ? "en" : "ko";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  const links = [
    { href: `/${locale}/about`, labelKo: "소개", labelEn: "About", key: "about" },
    { href: `/${locale}/writing`, labelKo: "글", labelEn: "Writing", key: "writing" },
    { href: `/${locale}/contact`, labelKo: "연락", labelEn: "Contact", key: "contact" },
  ];

  return (
    <nav className="flex justify-between items-center px-12 py-8" style={{ borderBottom: "1px solid #C7C9C2" }}>
      <a href={`/${locale}`} style={{ fontFamily: "var(--font-cormorant)", color: "#3F5A3C", fontSize: "1.6rem", letterSpacing: "0.15em" }} className="font-light">Seor</a>
      <div className="flex items-center gap-10 text-sm">
        {links.map((link) => (
          <a key={link.key} href={link.href} className="transition-all duration-300" style={{ color: current === link.key ? "#3F5A3C" : "#A8B0A6", borderBottom: current === link.key ? "1px solid #3F5A3C" : "none" }} onMouseEnter={e => { if (current !== link.key) e.currentTarget.style.color = "#3F5A3C"; }} onMouseLeave={e => { if (current !== link.key) e.currentTarget.style.color = "#A8B0A6"; }}>
            {locale === "ko" ? link.labelKo : link.labelEn}
          </a>
        ))}
        <button onClick={toggleLocale} className="text-xs tracking-widest uppercase px-3 py-1 rounded-full transition-all duration-300" style={{ border: "1px solid #A8B0A6", color: "#A8B0A6" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#3F5A3C"; e.currentTarget.style.color = "#3F5A3C"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#A8B0A6"; e.currentTarget.style.color = "#A8B0A6"; }}>
          {locale === "ko" ? "EN" : "KO"}
        </button>
      </div>
    </nav>
  );
}