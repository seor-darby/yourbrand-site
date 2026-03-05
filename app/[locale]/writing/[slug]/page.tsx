"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Nav from "../../../components/Nav";
import { client } from "../../../sanity-client";

type Post = {
  titleKo: string;
  titleEn: string;
  tag: string;
  publishedAt: string;
  bodyKo: any[];
  bodyEn: any[];
};

export default function Post() {
  const locale = useLocale();
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    client
      .fetch(`*[_type == "post" && slug.current == $slug][0] {
        titleKo, titleEn, tag, publishedAt, bodyKo, bodyEn
      }`, { slug })
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F3F4F1" }}>
        <p style={{ color: "#A8B0A6" }}>불러오는 중...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F3F4F1" }}>
        <p style={{ color: "#A8B0A6" }}>글을 찾을 수 없어요.</p>
      </main>
    );
  }

  const body = locale === "ko" ? post.bodyKo : post.bodyEn;

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>
      <Nav current="writing" />
      <article className="max-w-2xl mx-auto px-12 py-32">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs tracking-widest uppercase" style={{ color: "#8EA88A" }}>{post.tag}</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-cormorant)", lineHeight: 1.1 }} className="text-5xl font-light mb-16">
          {locale === "ko" ? post.titleKo : post.titleEn}
        </h1>
        <div className="flex flex-col gap-6 text-base leading-relaxed" style={{ color: "#4A4A45" }}>
          {body?.map((block: any, i: number) => (
            <p key={i}>
              {block.children?.map((child: any) => child.text).join("")}
            </p>
          ))}
        </div>
        <div className="mt-20 pt-12" style={{ borderTop: "1px solid #C7C9C2" }}>
          <a href={`/${locale}/writing`} className="text-sm tracking-widest uppercase transition-all duration-300" style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")}>
            ← {locale === "ko" ? "글 목록" : "All Writing"}
          </a>
        </div>
      </article>
    </main>
  );
}