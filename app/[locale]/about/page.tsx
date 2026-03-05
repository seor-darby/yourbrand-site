"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "ko" ? "en" : "ko";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>
      <nav className="flex justify-between items-center px-12 py-8" style={{ borderBottom: "1px solid #C7C9C2" }}>
        <span style={{ fontFamily: "var(--font-cormorant)", color: "#3F5A3C", fontSize: "1.6rem", letterSpacing: "0.15em" }} className="font-light">Seor</span>
        <div className="flex items-center gap-10 text-sm">
          <a href={`/${locale}/about`} style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300">{t("nav.about")}</a>
          <a href="#" style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300">{t("nav.work")}</a>
          <a href="#" style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300">{t("nav.writing")}</a>
          <a href="#" style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300">{t("nav.contact")}</a>
          <button onClick={toggleLocale} className="text-xs tracking-widest uppercase px-3 py-1 rounded-full transition-all duration-300" style={{ border: "1px solid #A8B0A6", color: "#A8B0A6" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#3F5A3C"; e.currentTarget.style.color = "#3F5A3C"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#A8B0A6"; e.currentTarget.style.color = "#A8B0A6"; }}>
            {locale === "ko" ? "EN" : "KO"}
          </button>
        </div>
      </nav>
      <section className="max-w-5xl mx-auto px-12 py-40">
        <p className="text-xs tracking-[0.3em] uppercase mb-10" style={{ color: "#8EA88A" }}>{t("hero.tag")}</p>
        <h1 style={{ fontFamily: "var(--font-cormorant)", color: "#262623", lineHeight: 1.1 }} className="text-7xl font-light mb-12">
          {t("hero.title1")}<br />
          <span style={{ color: "#3F5A3C" }}>{t("hero.title2")}</span><br />
          {t("hero.title3")}
        </h1>
        <p className="text-base max-w-md leading-relaxed tracking-wide" style={{ color: "#A8B0A6" }}>{t("hero.desc")}</p>
        <div className="mt-16 flex items-center gap-6">
          <a href={`/${locale}/about`} className="text-sm tracking-widest uppercase px-6 py-3 transition-all duration-300" style={{ backgroundColor: "#4A6A4E", color: "#F3F4F1" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4A6A4E")}>
            About Seor
          </a>
          <a href="#" className="text-sm tracking-widest uppercase transition-all duration-300" style={{ color: "#8EA88A", borderBottom: "1px solid #C7C9C2" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#8EA88A")}>
            View Work
          </a>
        </div>
        <div className="mt-20 flex items-center gap-4">
          <div className="w-12 h-px" style={{ backgroundColor: "#C7C9C2" }}></div>
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#A8B0A6" }}>Scroll</span>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-12 py-16" style={{ borderTop: "1px solid #C7C9C2" }}>
        <div className="flex gap-16 text-xs tracking-[0.3em] uppercase">
          <span style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300 cursor-default">Research</span>
          <span style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300 cursor-default">Writing</span>
          <span style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300 cursor-default">Sensory</span>
        </div>
      </section>
    </main>
  );
}