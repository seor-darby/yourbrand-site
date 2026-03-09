"use client";

import { useEffect, useState, useMemo } from "react";
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

const CATEGORIES = ["All", "Essay", "Sensory", "Research", "Note"];

const CATEGORY_LABELS: Record<string, { ko: string; en: string }> = {
  All:      { ko: "전체",    en: "All"      },
  Essay:    { ko: "에세이",  en: "Essay"    },
  Sensory:  { ko: "감각",    en: "Sensory"  },
  Research: { ko: "리서치",  en: "Research" },
  Note:     { ko: "노트",    en: "Note"     },
};

export default function Writing() {
  const locale = useLocale();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
          slug, titleKo, titleEn, excerptKo, excerptEn, tag, publishedAt
        }`
      )
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    let result = posts;

    // 카테고리 필터
    if (activeCategory !== "All") {
      result = result.filter((p) => p.tag === activeCategory);
    }

    // 검색 필터
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const title = locale === "ko" ? p.titleKo : p.titleEn;
        const excerpt = locale === "ko" ? p.excerptKo : p.excerptEn;
        return (
          title?.toLowerCase().includes(q) ||
          excerpt?.toLowerCase().includes(q)
        );
      });
    }

    return result;
  }, [posts, activeCategory, searchQuery, locale]);

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "#F3F4F1",
        color: "#262623",
        fontFamily: "var(--font-inter)",
      }}
    >
      <Nav current="writing" />

      <section className="max-w-3xl mx-auto px-12 py-32">
        {/* 헤더 */}
        <p
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: "#8EA88A" }}
        >
          {locale === "ko" ? "글" : "Writing"}
        </p>
        <h1
          style={{ fontFamily: "var(--font-cormorant)", lineHeight: 1.1 }}
          className="text-5xl font-light mb-16"
        >
          {locale === "ko" ? "감각의 기록" : "Records of Sensation"}
        </h1>

        {/* 카테고리 필터 탭 */}
        <div
          className="flex gap-0 mb-8 overflow-x-auto"
          style={{ borderBottom: "1px solid #C7C9C2" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-xs tracking-[0.2em] uppercase pb-3 pr-6 transition-all duration-200 whitespace-nowrap"
              style={{
                color: activeCategory === cat ? "#262623" : "#A8B0A6",
                borderBottom:
                  activeCategory === cat
                    ? "2px solid #3F5A3C"
                    : "2px solid transparent",
                marginBottom: "-1px",
                background: "none",
                cursor: "pointer",
              }}
            >
              {locale === "ko"
                ? CATEGORY_LABELS[cat].ko
                : CATEGORY_LABELS[cat].en}
            </button>
          ))}
        </div>

        {/* 검색창 */}
        <div className="relative mb-16">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              locale === "ko" ? "제목 또는 본문으로 검색..." : "Search by title or content..."
            }
            className="w-full text-sm py-3 pr-4 pl-0 outline-none bg-transparent"
            style={{
              borderBottom: "1px solid #C7C9C2",
              color: "#262623",
              fontFamily: "var(--font-inter)",
            }}
          />
          {/* 검색 아이콘 */}
          <svg
            className="absolute right-0 top-3"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A8B0A6"
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        {/* 글 목록 */}
        {loading ? (
          <p style={{ color: "#A8B0A6" }} className="text-sm">
            {locale === "ko" ? "불러오는 중..." : "Loading..."}
          </p>
        ) : filteredPosts.length === 0 ? (
          <p style={{ color: "#A8B0A6" }} className="text-sm">
            {locale === "ko" ? "글이 없습니다." : "No posts found."}
          </p>
        ) : (
          <div className="flex flex-col">
            {filteredPosts.map((post, i) => (
              <a
                key={post.slug.current}
                href={`/${locale}/writing/${post.slug.current}`}
                className="group flex flex-col gap-3 py-10 transition-all duration-300"
                style={{
                  borderBottom: "1px solid #C7C9C2",
                  borderTop: i === 0 ? "none" : undefined,
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "#8EA88A" }}
                  >
                    {post.tag}
                  </span>
                  <span className="text-xs" style={{ color: "#C7C9C2" }}>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString(
                          locale === "ko" ? "ko-KR" : "en-US",
                          { year: "numeric", month: "long" }
                        )
                      : ""}
                  </span>
                </div>
                <h2
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  className="text-3xl font-light group-hover:text-[#3F5A3C] transition-colors duration-300"
                >
                  {locale === "ko" ? post.titleKo : post.titleEn}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#A8B0A6" }}
                >
                  {locale === "ko" ? post.excerptKo : post.excerptEn}
                </p>
                <div
                  className="w-8 h-px mt-2 transition-all duration-500 group-hover:w-16"
                  style={{ backgroundColor: "#3F5A3C" }}
                />
              </a>
            ))}
          </div>
        )}

        {/* 결과 카운트 */}
        {!loading && (
          <p
            className="text-xs tracking-widest uppercase mt-8"
            style={{ color: "#C7C9C2" }}
          >
            {filteredPosts.length}{" "}
            {locale === "ko" ? "개의 글" : filteredPosts.length === 1 ? "post" : "posts"}
          </p>
        )}
      </section>
    </main>
  );
}