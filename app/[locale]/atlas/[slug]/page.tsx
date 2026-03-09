"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Nav from "../../../components/Nav";
import { client } from "../../../sanity-client";

type AtlasEntry = {
  nameKo: string;
  nameEn: string;
  category: string;
  season: string;
  originKo: string;
  originEn: string;
  aromaKo: string;
  aromaEn: string;
  palateKo: string;
  palateEn: string;
  textureKo: string;
  textureEn: string;
  cookingKo: string;
  cookingEn: string;
  mainImage?: { asset: { url: string }; alt?: string };
  relatedPosts?: { slug: { current: string }; titleKo: string; titleEn: string; tag: string }[];
};

export default function AtlasSlugPage() {
  const locale = useLocale();
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string);
  const [entry, setEntry] = useState<AtlasEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    client.fetch(`*[_type == "atlas" && slug.current == $slug][0] {
      nameKo, nameEn, category, season, originKo, originEn,
      aromaKo, aromaEn, palateKo, palateEn, textureKo, textureEn,
      cookingKo, cookingEn,
      mainImage { asset->{ url }, alt },
      relatedPosts[]-> { slug, titleKo, titleEn, tag }
    }`, { slug }).then(data => {
      setEntry(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F3F4F1" }}>
      <p style={{ color: "#A8B0A6" }} className="text-sm">{locale === "ko" ? "불러오는 중..." : "Loading..."}</p>
    </main>
  );

  if (!entry) return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F3F4F1" }}>
      <p style={{ color: "#A8B0A6" }} className="text-sm">{locale === "ko" ? "항목을 찾을 수 없어요." : "Entry not found."}</p>
    </main>
  );

  const sensoryFields = [
    { label: locale === "ko" ? "향" : "Aroma", value: locale === "ko" ? entry.aromaKo : entry.aromaEn },
    { label: locale === "ko" ? "맛" : "Palate", value: locale === "ko" ? entry.palateKo : entry.palateEn },
    { label: locale === "ko" ? "질감" : "Texture", value: locale === "ko" ? entry.textureKo : entry.textureEn },
  ];

  const metaFields = [
    { label: locale === "ko" ? "분류" : "Category", value: entry.category },
    { label: locale === "ko" ? "계절" : "Season", value: entry.season },
    { label: locale === "ko" ? "원산지" : "Origin", value: locale === "ko" ? entry.originKo : entry.originEn },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>
      <Nav current="atlas" />

      <article className="max-w-3xl mx-auto px-10 md:px-16" style={{ paddingTop: "18vh", paddingBottom: "16vh" }}>

        {/* 태그 */}
        <p className="text-xs tracking-[0.35em] uppercase mb-10" style={{ color: "#C7C9C2" }}>
          {locale === "ko" ? "식재료 아틀라스" : "Ingredient Atlas"} · {entry.category}
        </p>

        {/* 제목 */}
        <h1 className="font-medium mb-16" style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2.8rem, 5vw, 4.8rem)",
          lineHeight: 1.05,
          color: "#262623",
        }}>
          {locale === "ko" ? entry.nameKo : entry.nameEn}
          {locale === "ko" && entry.nameEn && (
            <span className="ml-4 text-2xl font-light" style={{ color: "#C7C9C2" }}>
              {entry.nameEn}
            </span>
          )}
        </h1>

        {/* 이미지 */}
        {entry.mainImage?.asset?.url && (
          <div className="w-full mb-16 overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <img
              src={entry.mainImage.asset.url}
              alt={entry.mainImage.alt || entry.nameKo}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 메타 정보 테이블 */}
        <div className="mb-16 grid grid-cols-3 gap-0" style={{ borderTop: "1px solid #ECEEE9", borderBottom: "1px solid #ECEEE9" }}>
          {metaFields.filter(f => f.value).map((field, i) => (
            <div key={i} className="py-5 pr-6" style={{ borderRight: i < 2 ? "1px solid #ECEEE9" : "none", paddingLeft: i > 0 ? "1.5rem" : 0 }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#C7C9C2" }}>{field.label}</p>
              <p className="text-sm" style={{ color: "#5A5A55" }}>{field.value}</p>
            </div>
          ))}
        </div>

        {/* 감각 프로파일 */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.35em] uppercase mb-8" style={{ color: "#8EA88A" }}>
            {locale === "ko" ? "감각 프로파일" : "Sensory Profile"}
          </p>
          <div className="flex flex-col gap-0">
            {sensoryFields.filter(f => f.value).map((field, i) => (
              <div key={i} className="flex gap-8 py-6" style={{ borderBottom: "1px solid #ECEEE9" }}>
                <span className="text-xs tracking-[0.2em] uppercase shrink-0" style={{ color: "#C7C9C2", width: "4rem", paddingTop: "2px" }}>
                  {field.label}
                </span>
                <p className="text-sm leading-loose" style={{ color: "#4A4A45" }}>{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 조리 특성 */}
        {(locale === "ko" ? entry.cookingKo : entry.cookingEn) && (
          <div className="mb-16">
            <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "#8EA88A" }}>
              {locale === "ko" ? "조리 특성" : "Cooking Behaviour"}
            </p>
            <p className="text-sm leading-loose" style={{ color: "#4A4A45" }}>
              {locale === "ko" ? entry.cookingKo : entry.cookingEn}
            </p>
          </div>
        )}

        {/* 관련 글 */}
        {entry.relatedPosts && entry.relatedPosts.length > 0 && (
          <div className="mb-16">
            <p className="text-xs tracking-[0.35em] uppercase mb-8" style={{ color: "#8EA88A" }}>
              {locale === "ko" ? "관련 글" : "Related Writing"}
            </p>
            <div className="flex flex-col">
              {entry.relatedPosts.map((post, i) => (
                <a
                  key={post.slug.current}
                  href={`/${locale}/writing/${post.slug.current}`}
                  className="group flex items-baseline gap-6 py-5 transition-all duration-300"
                  style={{ borderBottom: "1px solid #ECEEE9", borderTop: i === 0 ? "1px solid #ECEEE9" : "none" }}
                >
                  <span className="text-xs tracking-widest uppercase shrink-0" style={{ color: "#8EA88A", width: "4rem" }}>
                    {post.tag}
                  </span>
                  <span
                    className="text-sm transition-colors duration-300 group-hover:text-[#3F5A3C]"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", color: "#262623" }}
                  >
                    {locale === "ko" ? post.titleKo : post.titleEn}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 목록으로 */}
        <a
          href={`/${locale}/atlas`}
          className="text-xs tracking-widest uppercase transition-colors duration-300"
          style={{ color: "#C7C9C2" }}
          onMouseEnter={e => e.currentTarget.style.color = "#262623"}
          onMouseLeave={e => e.currentTarget.style.color = "#C7C9C2"}
        >
          ← {locale === "ko" ? "아틀라스 목록" : "All Atlas"}
        </a>

      </article>
    </main>
  );
}