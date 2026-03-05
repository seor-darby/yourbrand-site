"use client";

import Nav from "../../components/Nav";
import { useLocale, useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>
      <Nav current="about" />
      <section className="max-w-3xl mx-auto px-12 py-32">
        <p className="text-xs tracking-[0.3em] uppercase mb-10" style={{ color: "#8EA88A" }}>
          {t("about.tag")}
        </p>
        <h1 style={{ fontFamily: "var(--font-cormorant)", lineHeight: 1.1 }} className="text-4xl font-light mb-16">
          {t("about.title1")}<br />
          <span style={{ color: "#3F5A3C" }}>{t("about.title2")}</span>
        </h1>
        <div className="flex flex-col gap-8 text-base leading-relaxed" style={{ color: "#4A4A45" }}>
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
        </div>
        <div className="mt-20 pt-12 flex flex-col gap-4 text-sm" style={{ borderTop: "1px solid #C7C9C2", color: "#A8B0A6" }}>
          <div className="flex gap-2">
            <span className="uppercase tracking-widest w-24">{t("about.based")}</span>
            <span>{t("about.location")}</span>
          </div>
          <div className="flex gap-2">
            <span className="uppercase tracking-widest w-24">{t("about.interest")}</span>
            <span>{t("about.interestVal")}</span>
          </div>
          <div className="flex gap-2">
            <span className="uppercase tracking-widest w-24">{t("about.contact")}</span>
            <span>{t("about.email")}</span>
          </div>
        </div>
      </section>
    </main>
  );
}