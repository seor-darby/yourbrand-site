"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Nav from "../../components/Nav";
import { client } from "../../sanity-client";

type AtlasEntry = {
  slug: { current: string };
  nameKo: string;
  nameEn: string;
  category: string;
  season: string;
  aromaKo: string;
  aromaEn: string;
  mainImage?: { asset: { url: string }; alt?: string };
};

const SEASONS = ["All", "봄", "여름", "가을", "겨울", "연중"];
const CATEGORIES = ["All", "채소", "과일", "육류", "해산물", "유제품", "곡물", "허브·향신료", "기타"];

export default function AtlasPage() {
  const locale = useLocale();
  const [entries, setEntries] = useState<AtlasEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSeason, setActiveSeason] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    client.fetch(`*[_type == "atlas"] | order(nameKo asc) {
      slug, nameKo, nameEn, category, season, aromaKo, aromaEn,
      mainImage { asset->{ url }, alt }
    }`).then((data) => {
      setEntries(data);
      setLoading(false);
    });
  }, []);

  const filtered = entries.filter(e => {
    const matchSeason = activeSeason === "All" || e.season === activeSeason;
    const matchCat = activeCategory === "All" || e.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || e.nameKo?.toLowerCase().includes(q) || e.nameEn?.toLowerCase().includes(q);
    return matchSeason && matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>
      <Nav current="atlas" />

      <section className="max-w-5xl mx-auto px-10 md:px-16" style={{ paddingTop: "20vh", paddingBottom: "16vh" }}>

        {/* 헤더 */}
        <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "#C7C9C2" }}>
          {locale === "ko" ? "식재료 아틀라스" : "Ingredient Atlas"}
        </p>
        <h1 className="font-medium mb-4" style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          lineHeight: 1.1,
          color: "#262623",
        }}>
          {locale === "ko" ? "식재료의 언어" : "The Language of Ingredients"}
        </h1>
        <p className="text-sm mb-16 leading-loose" style={{ color: "#A8B0A6", maxWidth: "32rem" }}>
          {locale === "ko"
            ? "각 재료의 향, 맛, 질감, 조리 특성을 기록한 감각 사전입니다."
            : "A sensory archive of ingredients — aroma, palate, texture, and cooking behaviour."}
        </p>

        {/* 검색 */}
        <div className="relative mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={locale === "ko" ? "재료 이름으로 검색..." : "Search ingredients..."}
            className="w-full text-sm py-3 pr-4 pl-0 outline-none bg-transparent"
            style={{ borderBottom: "1px solid #E0E1DC", color: "#262623" }}
          />
          <svg className="absolute right-0 top-3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7C9C2" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        {/* 계절 필터 */}
        <div className="flex gap-0 mb-4 overflow-x-auto" style={{ borderBottom: "1px solid #ECEEE9" }}>
          {SEASONS.map(s => (
            <button key={s} onClick={() => setActiveSeason(s)}
              className="text-xs tracking-[0.15em] pb-3 pr-5 transition-all duration-200 whitespace-nowrap"
              style={{
                color: activeSeason === s ? "#262623" : "#A8B0A6",
                borderBottom: activeSeason === s ? "2px solid #3F5A3C" : "2px solid transparent",
                marginBottom: "-1px", background: "none", cursor: "pointer",
              }}>
              {s === "All" ? (locale === "ko" ? "전체" : "All") : s}
            </button>
          ))}
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-2 flex-wrap mb-14">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className="text-xs tracking-[0.1em] px-3 py-1.5 transition-all duration-200"
              style={{
                color: activeCategory === c ? "#F3F4F1" : "#A8B0A6",
                backgroundColor: activeCategory === c ? "#3F5A3C" : "transparent",
                border: "1px solid",
                borderColor: activeCategory === c ? "#3F5A3C" : "#E0E1DC",
                cursor: "pointer",
              }}>
              {c === "All" ? (locale === "ko" ? "전체" : "All") : c}
            </button>
          ))}
        </div>

        {/* 그리드 */}
        {loading ? (
          <p className="text-sm" style={{ color: "#C7C9C2" }}>{locale === "ko" ? "불러오는 중..." : "Loading..."}</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm" style={{ color: "#C7C9C2" }}>{locale === "ko" ? "항목이 없습니다." : "No entries found."}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(entry => (
              <a
                key={entry.slug.current}
                href={`/${locale}/atlas/${entry.slug.current}`}
                className="group flex flex-col gap-3 transition-all duration-300"
              >
                {/* 이미지 */}
                <div
                  className="w-full overflow-hidden"
                  style={{ aspectRatio: "4/3", backgroundColor: "#ECEEE9" }}
                >
                  {entry.mainImage?.asset?.url ? (
                    <img
                      src={entry.mainImage.asset.url}
                      alt={entry.mainImage.alt || entry.nameKo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs tracking-widest uppercase" style={{ color: "#C7C9C2" }}>
                        {locale === "ko" ? entry.nameKo?.[0] : entry.nameEn?.[0]}
                      </span>
                    </div>
                  )}
                </div>

                {/* 정보 */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-widest uppercase" style={{ color: "#8EA88A" }}>
                      {entry.category}
                    </span>
                    {entry.season && (
                      <span className="text-xs" style={{ color: "#C7C9C2" }}>{entry.season}</span>
                    )}
                  </div>
                  <h3
                    className="font-medium transition-colors duration-300 group-hover:text-[#3F5A3C]"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", color: "#262623" }}
                  >
                    {locale === "ko" ? entry.nameKo : entry.nameEn}
                  </h3>
                  {(locale === "ko" ? entry.aromaKo : entry.aromaEn) && (
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#A8B0A6" }}>
                      {locale === "ko" ? entry.aromaKo : entry.aromaEn}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}

        {/* 결과 수 */}
        {!loading && (
          <p className="text-xs tracking-widest uppercase mt-12" style={{ color: "#D0D2CB" }}>
            {filtered.length} {locale === "ko" ? "개 항목" : filtered.length === 1 ? "entry" : "entries"}
          </p>
        )}
      </section>
    </main>
  );
}