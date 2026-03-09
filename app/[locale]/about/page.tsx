"use client";

import Nav from "../../components/Nav";
import { useLocale, useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}
    >
      <Nav current="about" />

      <section className="max-w-2xl mx-auto px-10 md:px-16" style={{ paddingTop: "20vh", paddingBottom: "16vh" }}>

        {/* 태그 */}
        <p
          className="text-xs tracking-[0.35em] uppercase mb-16"
          style={{ color: "#C7C9C2" }}
        >
          {t("about.tag")}
        </p>

        {/* 제목 */}
        <h1
          className="font-light mb-20"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            lineHeight: 1.15,
            color: "#262623",
          }}
        >
          {t("about.title1")}<br />
          <span style={{ color: "#3F5A3C", fontStyle: "italic" }}>{t("about.title2")}</span>
        </h1>

        {/* 본문 */}
        <div
          className="flex flex-col gap-8 text-sm leading-loose"
          style={{ color: "#5A5A55", maxWidth: "36rem" }}
        >
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
        </div>

        {/* 메타 정보 */}
        <div
          className="mt-20 pt-12 flex flex-col gap-5"
          style={{ borderTop: "1px solid #E8E9E5" }}
        >
          {[
            { key: "based",    val: "location"    },
            { key: "interest", val: "interestVal" },
            { key: "contact",  val: "email"       },
          ].map(({ key, val }) => (
            <div key={key} className="flex gap-8 text-xs">
              <span
                className="tracking-[0.25em] uppercase shrink-0"
                style={{ color: "#C7C9C2", width: "5rem" }}
              >
                {t(`about.${key}`)}
              </span>
              <span style={{ color: "#8A8A84" }}>{t(`about.${val}`)}</span>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}