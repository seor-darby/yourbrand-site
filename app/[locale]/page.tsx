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

const entries = [
  { key: "field", labelEn: "Field Notes", labelKo: "필드 노트", descEn: "Sensory observations from the field.", descKo: "현장의 감각 기록.", href_ko: "/ko/writing", href_en: "/en/writing", tag: "Field Notes" },
  { key: "atlas", labelEn: "Ingredient Atlas", labelKo: "식재료 아틀라스", descEn: "A structured archive of ingredients.", descKo: "식재료의 언어와 판단 구조.", href_ko: "/ko/atlas", href_en: "/en/atlas", tag: "Atlas" },
  { key: "essays", labelEn: "Essays", labelKo: "에세이", descEn: "Where sensory language meets the world.", descKo: "감각 언어가 세계와 만나는 곳.", href_ko: "/ko/writing?category=Essay", href_en: "/en/writing?category=Essay", tag: "Essay" },
];

export default function HomeSplit() {
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

  return (
    <main style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>

      {/* Hero */}
      <section style={{ position: "relative", height: "100vh" }}>

        {/* Nav */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
          <Nav />
        </div>

        {/* Hero 본문: 이미지 + 텍스트 (순서 교환) */}
        <div style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "110px",
          padding: "0 12rem",
        }}>

          {/* Image — 왼쪽으로 이동 */}
          <img
            src="/images/hero.jpg"
            alt="Seor"
            style={{
              height: "78vh",
              width: "auto",
              display: "block",
              flexShrink: 0,
              marginTop: "60px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.9s 0.2s",
            }}
          />

          {/* TextContainer — 오른쪽으로 이동 */}
          <div style={{ maxWidth: "500px", flexShrink: 0, marginTop: "60px", height: "70vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{
              fontSize: "0.68rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C7C9C2",
              marginBottom: "2rem",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s",
            }}>
              Field · Sense · Record
            </p>
            <h1 style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3rem, 4.5vw, 5.2rem)",
              lineHeight: 1.35,
              fontWeight: 500,
              color: "#262623",
              margin: 0,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s 0.1s",
            }}>
              {locale === "ko" ? (
                <>아직 언어가 없는<br />것들을 위하여.</>
              ) : (
                <>Some things<br />are known<br />before they<br />are named.</>
              )}
            </h1>
            <div style={{
              marginTop: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s 0.25s",
            }}>
              <a href={`/${locale}/writing`} style={{
                fontSize: "0.68rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#262623",
                borderBottom: "1px solid #262623",
                paddingBottom: "3px",
                textDecoration: "none",
              }}>
                {locale === "ko" ? "글 읽기" : "Read Writing"}
              </a>
              <a href={`/${locale}/about`} style={{
                fontSize: "0.68rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C7C9C2",
                textDecoration: "none",
              }}>
                {locale === "ko" ? "소개" : "About"}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 진입 카드 3개 */}
      <section style={{ maxWidth: "64rem", margin: "0 auto", padding: "5rem 4rem", borderTop: "1px solid #ECEEE9" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          {entries.map((entry, i) => (
            <a key={entry.key} href={locale === "ko" ? entry.href_ko : entry.href_en}
              style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "0 2.5rem", borderLeft: i > 0 ? "1px solid #ECEEE9" : "none", textDecoration: "none" }}>
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#8EA88A" }}>{entry.tag}</span>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", lineHeight: 1.2, color: "#262623", fontWeight: 500 }}>
                {locale === "ko" ? entry.labelKo : entry.labelEn}
              </h2>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#A8B0A6" }}>
                {locale === "ko" ? entry.descKo : entry.descEn}
              </p>
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C7C9C2" }}>
                {locale === "ko" ? "더 보기 →" : "Explore →"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 최근 글 */}
      <section style={{ maxWidth: "64rem", margin: "0 auto", padding: "5rem 4rem", borderTop: "1px solid #ECEEE9" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C7C9C2" }}>
            {locale === "ko" ? "최근 글" : "Latest"}
          </p>
          <a href={`/${locale}/writing`} style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C7C9C2", textDecoration: "none" }}>
            {locale === "ko" ? "전체 보기 →" : "All Writing →"}
          </a>
        </div>
        <div>
          {posts.length === 0 ? (
            <p style={{ fontSize: "0.875rem", color: "#C7C9C2" }}>{locale === "ko" ? "글을 불러오는 중..." : "Loading..."}</p>
          ) : (
            posts.map((post, i) => (
              <a key={post.slug.current} href={`/${locale}/writing/${post.slug.current}`}
                style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "1.75rem 0", borderTop: "1px solid #ECEEE9", borderBottom: i === posts.length - 1 ? "1px solid #ECEEE9" : "none", textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", flex: 1, minWidth: "340px" }}>
                  <span style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8EA88A", width: "5rem", flexShrink: 0 }}>{post.tag}</span>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", color: "#262623", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {locale === "ko" ? post.titleKo : post.titleEn}
                  </h3>
                </div>
                <span style={{ fontSize: "0.68rem", color: "#C7C9C2", flexShrink: 0, marginLeft: "1.5rem" }}>
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US", { year: "numeric", month: "short" }) : ""}
                </span>
              </a>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ maxWidth: "64rem", margin: "0 auto", padding: "4rem", borderTop: "1px solid #ECEEE9", display: "flex", justifyContent: "space-between", gap: "2.5rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: "#262623", letterSpacing: "0.2em" }}>SEOR</span>
          <p style={{ fontSize: "0.75rem", color: "#C7C9C2", maxWidth: "20rem", lineHeight: 1.8 }}>
            {locale === "ko" ? "감각 판단을 언어로 기록합니다." : "Recording sensory judgements in language."}
          </p>
        </div>
        <div style={{ display: "flex", gap: "4rem", fontSize: "0.75rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span style={{ letterSpacing: "0.25em", textTransform: "uppercase", color: "#C7C9C2" }}>{locale === "ko" ? "페이지" : "Pages"}</span>
            {[
              { href: `/${locale}/writing`, ko: "글", en: "Writing" },
              { href: `/${locale}/atlas`, ko: "아틀라스", en: "Atlas" },
              { href: `/${locale}/about`, ko: "소개", en: "About" },
              { href: `/${locale}/contact`, ko: "연락", en: "Contact" },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ color: "#8A8A84", textDecoration: "none" }}>{locale === "ko" ? link.ko : link.en}</a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span style={{ letterSpacing: "0.25em", textTransform: "uppercase", color: "#C7C9C2" }}>{locale === "ko" ? "연결" : "Connect"}</span>
            <a href="https://www.instagram.com/seor.field/" target="_blank" rel="noopener noreferrer" style={{ color: "#8A8A84", textDecoration: "none" }}>Instagram</a>
            <a href="mailto:kimwoals2949@gmail.com" style={{ color: "#8A8A84", textDecoration: "none" }}>Email</a>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <p style={{ fontSize: "0.75rem", color: "#D0D2CB" }}>© {new Date().getFullYear()} Seor</p>
        </div>
      </footer>
    </main>
  );
}