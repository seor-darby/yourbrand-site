"use client";

import Nav from "../components/Nav";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { client } from "../sanity-client";

type Post = {
  slug: { current: string };
  titleKo: string;
  titleEn: string;
  excerptKo: string;
  excerptEn: string;
  tag: string;
  publishedAt: string;
};

export default function Home() {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    client
      .fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] {
        slug, titleKo, titleEn, excerptKo, excerptEn, tag, publishedAt
      }`)
      .then(setPosts);
  }, []);

  const entries = [
    {
      key: "field",
      labelEn: "Field Notes",
      labelKo: "필드 노트",
      descEn: "Sensory observations from the field — taste, texture, scent.",
      descKo: "현장의 감각 기록 — 맛, 질감, 향.",
      href: `/${locale}/writing`,
      tag: "Field Notes",
    },
    {
      key: "atlas",
      labelEn: "Ingredient Atlas",
      labelKo: "식재료 아틀라스",
      descEn: "A structured archive of ingredients, their properties and judgements.",
      descKo: "식재료의 언어와 판단 구조를 담은 아카이브.",
      href: `/${locale}/atlas`,
      tag: "Atlas",
    },
    {
      key: "essays",
      labelEn: "Essays",
      labelKo: "에세이",
      descEn: "Where sensory language meets philosophy, music, and the world.",
      descKo: "감각 언어가 철학, 음악, 세계와 만나는 곳.",
      href: `/${locale}/writing?category=Essay`,
      tag: "Essay",
    },
  ];

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}
    >
      <Nav />

      {/* Hero */}
      <section
        className="max-w-5xl mx-auto px-10 md:px-16"
        style={{ paddingTop: "26vh", paddingBottom: "14vh" }}
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-10 transition-all duration-700"
          style={{
            color: "#C7C9C2",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(6px)",
          }}
        >
          Field · Sense · Record
        </p>

        <h1
          className="font-medium transition-all duration-700"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)",
            lineHeight: 1.12,
            color: "#262623",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(14px)",
            transitionDelay: "100ms",
          }}
        >
          Recording senses<br />
          <span style={{ color: "#3F5A3C" }}>in the language</span><br />
          of fields.
        </h1>

        <p
          className="mt-8 transition-all duration-700"
          style={{
            fontSize: "0.9rem",
            lineHeight: 1.9,
            color: "#A8B0A6",
            letterSpacing: "0.02em",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(8px)",
            transitionDelay: "200ms",
          }}
        >
          {locale === "ko"
            ? "감각이 닿는 곳에서 존재의 결을 읽습니다."
            : "Where the senses touch, I read the grain of being."}
        </p>

        <div
          className="mt-14 flex items-center gap-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(8px)",
            transitionDelay: "300ms",
          }}
        >
          <a
            href={`/${locale}/writing`}
            className="text-xs tracking-[0.3em] uppercase transition-all duration-300"
            style={{ color: "#262623", borderBottom: "1px solid #262623", paddingBottom: "3px" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#3F5A3C"; e.currentTarget.style.borderBottomColor = "#3F5A3C"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#262623"; e.currentTarget.style.borderBottomColor = "#262623"; }}
          >
            {locale === "ko" ? "글 읽기" : "Read Writing"}
          </a>
          <a
            href={`/${locale}/about`}
            className="text-xs tracking-[0.3em] uppercase transition-all duration-300"
            style={{ color: "#C7C9C2" }}
            onMouseEnter={e => e.currentTarget.style.color = "#262623"}
            onMouseLeave={e => e.currentTarget.style.color = "#C7C9C2"}
          >
            {locale === "ko" ? "소개" : "About"}
          </a>
        </div>
      </section>

      {/* 진입 카드 3개 */}
      <section
        className="max-w-5xl mx-auto px-10 md:px-16 py-20"
        style={{ borderTop: "1px solid #ECEEE9" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {entries.map((entry, i) => (
            <a
              key={entry.key}
              href={entry.href}
              className="group flex flex-col gap-4 py-10 md:py-0 md:px-10 transition-all duration-300"
              style={{
                borderBottom: "1px solid #ECEEE9",
                borderRight: i < 2 ? "none" : "none",
                ...(i > 0 ? { borderLeft: "1px solid #ECEEE9" } : {}),
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#F8F9F6"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <span
                className="text-xs tracking-[0.25em] uppercase"
                style={{ color: "#8EA88A" }}
              >
                {entry.tag}
              </span>
              <h2
                className="font-medium transition-colors duration-300 group-hover:text-[#3F5A3C]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.6rem",
                  lineHeight: 1.2,
                  color: "#262623",
                }}
              >
                {locale === "ko" ? entry.labelKo : entry.labelEn}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#A8B0A6" }}>
                {locale === "ko" ? entry.descKo : entry.descEn}
              </p>
              <span
                className="text-xs tracking-[0.2em] uppercase mt-2 transition-all duration-300"
                style={{ color: "#C7C9C2" }}
              >
                {locale === "ko" ? "더 보기 →" : "Explore →"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 최근 글 목록 */}
      <section
        className="max-w-5xl mx-auto px-10 md:px-16 py-20"
        style={{ borderTop: "1px solid #ECEEE9" }}
      >
        <div className="flex items-baseline justify-between mb-14">
          <p
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: "#C7C9C2" }}
          >
            {locale === "ko" ? "최근 글" : "Latest"}
          </p>
          <a
            href={`/${locale}/writing`}
            className="text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: "#C7C9C2" }}
            onMouseEnter={e => e.currentTarget.style.color = "#262623"}
            onMouseLeave={e => e.currentTarget.style.color = "#C7C9C2"}
          >
            {locale === "ko" ? "전체 보기 →" : "All Writing →"}
          </a>
        </div>

        <div className="flex flex-col">
          {posts.length === 0 ? (
            <p className="text-sm" style={{ color: "#C7C9C2" }}>
              {locale === "ko" ? "글을 불러오는 중..." : "Loading..."}
            </p>
          ) : (
            posts.map((post, i) => (
              <a
                key={post.slug.current}
                href={`/${locale}/writing/${post.slug.current}`}
                className="group flex items-baseline justify-between py-7 transition-all duration-300"
                style={{ borderTop: i === 0 ? "1px solid #ECEEE9" : "none", borderBottom: "1px solid #ECEEE9" }}
              >
                <div className="flex items-baseline gap-6 flex-1 min-w-0">
                  <span
                    className="text-xs tracking-widest uppercase shrink-0"
                    style={{ color: "#8EA88A", width: "5rem" }}
                  >
                    {post.tag}
                  </span>
                  <h3
                    className="font-medium truncate transition-colors duration-300 group-hover:text-[#3F5A3C]"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.3rem",
                      color: "#262623",
                    }}
                  >
                    {locale === "ko" ? post.titleKo : post.titleEn}
                  </h3>
                </div>
                <span
                  className="text-xs shrink-0 ml-6"
                  style={{ color: "#C7C9C2" }}
                >
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString(
                        locale === "ko" ? "ko-KR" : "en-US",
                        { year: "numeric", month: "short" }
                      )
                    : ""}
                </span>
              </a>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="max-w-5xl mx-auto px-10 md:px-16 py-16 flex flex-col md:flex-row justify-between gap-10"
        style={{ borderTop: "1px solid #ECEEE9" }}
      >
        <div className="flex flex-col gap-3">
          <span
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.4rem",
              color: "#262623",
              letterSpacing: "0.2em",
            }}
          >
            SEOR
          </span>
          <p className="text-xs" style={{ color: "#C7C9C2", maxWidth: "20rem", lineHeight: 1.8 }}>
            {locale === "ko"
              ? "감각 판단을 언어로 기록합니다."
              : "Recording sensory judgements in language."}
          </p>
        </div>

        <div className="flex gap-16 text-xs">
          <div className="flex flex-col gap-3">
            <span className="tracking-[0.25em] uppercase" style={{ color: "#C7C9C2" }}>
              {locale === "ko" ? "페이지" : "Pages"}
            </span>
            {[
              { href: `/${locale}/writing`, ko: "글", en: "Writing" },
              { href: `/${locale}/atlas`, ko: "아틀라스", en: "Atlas" },
              { href: `/${locale}/about`, ko: "소개", en: "About" },
              { href: `/${locale}/contact`, ko: "연락", en: "Contact" },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-300"
                style={{ color: "#8A8A84" }}
                onMouseEnter={e => e.currentTarget.style.color = "#262623"}
                onMouseLeave={e => e.currentTarget.style.color = "#8A8A84"}
              >
                {locale === "ko" ? link.ko : link.en}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="tracking-[0.25em] uppercase" style={{ color: "#C7C9C2" }}>
              {locale === "ko" ? "연결" : "Connect"}
            </span>
            <a
              href="https://www.instagram.com/seor.field/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
              style={{ color: "#8A8A84" }}
              onMouseEnter={e => e.currentTarget.style.color = "#262623"}
              onMouseLeave={e => e.currentTarget.style.color = "#8A8A84"}
            >
              Instagram
            </a>
            <a
              href="mailto:kimwoals2949@gmail.com"
              className="transition-colors duration-300"
              style={{ color: "#8A8A84" }}
              onMouseEnter={e => e.currentTarget.style.color = "#262623"}
              onMouseLeave={e => e.currentTarget.style.color = "#8A8A84"}
            >
              Email
            </a>
          </div>
        </div>

        <div className="flex items-end">
          <p className="text-xs" style={{ color: "#D0D2CB" }}>
            © {new Date().getFullYear()} Seor
          </p>
        </div>
      </footer>

    </main>
  );
}