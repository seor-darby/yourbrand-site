"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { client } from "../../sanity-client";

type Post = {
  slug: { current: string };
  titleKo: string;
  titleEn: string;
  excerptKo: string;
  excerptEn: string;
  tag: string;
  publishedAt: string;
};

export default function Writing() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  const toggleLocale = () => {
    const nextLocale = locale === "ko" ? "en" : "ko";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  useEffect(() => {
    client
      .fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        slug, titleKo, titleEn, excerptKo, excerptEn, tag, publishedAt
      }`)
      .then(setPosts);
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>
      <nav className="flex justify-between items-center px-12 py-8" style={{ borderBottom: "1px solid #C7C9C2" }}>
        <a href={`/${locale}`} style={{ fontFamily: "var(--font-cormorant)", color: "#3F5A3C", fontSize: "1.6rem", letterSpacing: "0.15em" }} className="font-light">Seor</a>
        <div className="flex items-center gap-10 text-sm">
          <a href={`/${locale}/about`} style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300">{locale === "ko" ? "소개" : "About"}</a>
          <a href={`/${locale}/writing`} style={{ color: "#3F5A3C", borderBottom: "1px solid #3F5A3C" }}>{locale === "ko" ? "글" : "Writing"}</a>
          <a href="#" style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300">{locale === "ko" ? "작업" : "Work"}</a>
          <a href="#" style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300">{locale === "ko" ? "연락" : "Contact"}</a>
          <button onClick={toggleLocale} className="text-xs tracking-widest uppercase px-3 py-1 rounded-full transition-all duration-300" style={{ border: "1px solid #A8B0A6", color: "#A8B0A6" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#3F5A3C"; e.currentTarget.style.color = "#3F5A3C"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#A8B0A6"; e.currentTarget.style.color = "#A8B0A6"; }}>
            {locale === "ko" ? "EN" : "KO"}
          </button>
        </div>
      </nav>
      <section className="max-w-3xl mx-auto px-12 py-32">
        <p className="text-xs tracking-[0.3em] uppercase mb-10" style={{ color: "#8EA88A" }}>
          {locale === "ko" ? "글" : "Writing"}
        </p>
        <h1 style={{ fontFamily: "var(--font-cormorant)", lineHeight: 1.1 }} className="text-5xl font-light mb-20">
          {locale === "ko" ? "감각의 기록" : "Records of Sensation"}
        </h1>
        {posts.length === 0 ? (
          <p style={{ color: "#A8B0A6" }}>글을 불러오는 중...</p>
        ) : (
          <div className="flex flex-col gap-16">
            {posts.map((post) => (
              <a key={post.slug.current} href={`/${locale}/writing/${post.slug.current}`} className="group flex flex-col gap-3 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <span className="text-xs tracking-widest uppercase" style={{ color: "#8EA88A" }}>{post.tag}</span>
                  <span className="text-xs" style={{ color: "#C7C9C2" }}>
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit" }) : ""}
                  </span>
                </div>
                <h2 style={{ fontFamily: "var(--font-cormorant)" }} className="text-3xl font-light group-hover:text-[#3F5A3C] transition-colors duration-300">
                  {locale === "ko" ? post.titleKo : post.titleEn}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "#A8B0A6" }}>
                  {locale === "ko" ? post.excerptKo : post.excerptEn}
                </p>
                <div className="w-8 h-px mt-2 transition-all duration-300 group-hover:w-16" style={{ backgroundColor: "#3F5A3C" }}></div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}