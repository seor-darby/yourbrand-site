"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Nav from "../../components/Nav";
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
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        slug, titleKo, titleEn, excerptKo, excerptEn, tag, publishedAt
      }`)
      .then(setPosts);
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>
      <Nav current="writing" />
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