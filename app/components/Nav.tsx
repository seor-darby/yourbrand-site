"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";

export default function Nav({ current }: { current?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => {
    const nextLocale = locale === "ko" ? "en" : "ko";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  const links = [
    { href: `/${locale}/about`,   labelKo: "소개",  labelEn: "About",   key: "about"   },
    { href: `/${locale}/writing`, labelKo: "글",    labelEn: "Writing", key: "writing" },
    { href: `/${locale}/contact`, labelKo: "연락",  labelEn: "Contact", key: "contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 md:px-16 transition-all duration-500"
      style={{
        paddingTop: scrolled ? "1.2rem" : "1.8rem",
        paddingBottom: scrolled ? "1.2rem" : "1.8rem",
        backgroundColor: scrolled ? "rgba(243,244,241,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #E8E9E5" : "none",
      }}
    >
      {/* 로고 */}
      <a
        href={`/${locale}`}
        style={{
          fontFamily: "var(--font-cormorant)",
          color: "#262623",
          fontSize: "1.5rem",
          letterSpacing: "0.25em",
          fontWeight: 300,
        }}
      >
        SEOR
      </a>

      {/* 링크 */}
      <div className="flex items-center gap-8 md:gap-12">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className="relative text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: current === link.key ? "#262623" : "#A8B0A6" }}
            onMouseEnter={e => { if (current !== link.key) e.currentTarget.style.color = "#262623"; }}
            onMouseLeave={e => { if (current !== link.key) e.currentTarget.style.color = "#A8B0A6"; }}
          >
            {locale === "ko" ? link.labelKo : link.labelEn}
            {current === link.key && (
              <span
                className="absolute left-0 right-0"
                style={{
                  bottom: "-4px",
                  height: "1px",
                  backgroundColor: "#3F5A3C",
                  display: "block",
                }}
              />
            )}
          </a>
        ))}

        {/* 언어 전환 */}
        <button
          onClick={toggleLocale}
          className="text-xs tracking-[0.2em] uppercase transition-colors duration-300"
          style={{ color: "#C7C9C2" }}
          onMouseEnter={e => e.currentTarget.style.color = "#262623"}
          onMouseLeave={e => e.currentTarget.style.color = "#C7C9C2"}
        >
          {locale === "ko" ? "EN" : "KO"}
        </button>
      </div>
    </nav>
  );
}