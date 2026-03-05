"use client";

import Nav from "../components/Nav";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>
      <Nav />
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
          <a href={`/${locale}/writing`} className="text-sm tracking-widest uppercase transition-all duration-300" style={{ color: "#8EA88A", borderBottom: "1px solid #C7C9C2" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#8EA88A")}>
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