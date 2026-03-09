"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Nav from "../../../components/Nav";
import { client } from "../../../sanity-client";

type MusicEmbed = {
  _type: "musicEmbed";
  _key: string;
  youtubeUrl: string;
  startTime: number;
  label: string;
  autoplay: boolean;
};

type ImageBlock = {
  _type: "image";
  _key: string;
  asset: { url?: string };
  alt?: string;
  caption?: string;
};

type TextBlock = {
  _type: "block";
  _key: string;
  style: string;
  children: { text: string; marks?: string[] }[];
};

type Block = TextBlock | ImageBlock | MusicEmbed;

type Post = {
  titleKo: string;
  titleEn: string;
  tag: string;
  publishedAt: string;
  bodyKo: Block[];
  bodyEn: Block[];
};

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
}

// 하단 고정 플레이어
function StickyPlayer({ music, visible }: { music: MusicEmbed | null; visible: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [prevKey, setPrevKey] = useState<string | null>(null);

  useEffect(() => {
    if (music?._key !== prevKey) {
      setPlaying(false);
      setPrevKey(music?._key || null);
    }
  }, [music, prevKey]);

  if (!music) return null;

  const videoId = extractVideoId(music.youtubeUrl);
  if (!videoId) return null;

  const src = `https://www.youtube.com/embed/${videoId}?start=${music.startTime || 0}&enablejsapi=1${playing ? "&autoplay=1" : ""}`;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        backgroundColor: "rgba(243,244,241,0.96)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid #ECEEE9",
      }}
    >
      <div className="max-w-2xl mx-auto px-10 md:px-16 py-4 flex items-center gap-6">
        {/* 재생 버튼 */}
        <button
          onClick={() => setPlaying(true)}
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: playing ? "#3F5A3C" : "#F3F4F1",
            border: "1px solid #C7C9C2",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#3F5A3C"}
          onMouseLeave={e => { if (!playing) e.currentTarget.style.borderColor = "#C7C9C2"; }}
        >
          {playing ? (
            // 일시정지 아이콘
            <svg width="12" height="12" viewBox="0 0 12 12" fill={playing ? "#F3F4F1" : "#8EA88A"}>
              <rect x="2" y="1" width="3" height="10" rx="1"/>
              <rect x="7" y="1" width="3" height="10" rx="1"/>
            </svg>
          ) : (
            // 재생 아이콘
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#8EA88A">
              <path d="M2 1.5L10 6L2 10.5V1.5Z"/>
            </svg>
          )}
        </button>

        {/* 곡 정보 */}
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <p className="text-xs tracking-[0.15em] uppercase truncate" style={{ color: "#8EA88A" }}>
            ♪ Now Playing
          </p>
          <p className="text-xs truncate" style={{ color: "#5A5A55" }}>
            {music.label || "—"}
          </p>
        </div>

        {/* YouTube 링크 */}
        <a
          href={music.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs tracking-[0.15em] uppercase transition-colors duration-300"
          style={{ color: "#C7C9C2" }}
          onMouseEnter={e => e.currentTarget.style.color = "#262623"}
          onMouseLeave={e => e.currentTarget.style.color = "#C7C9C2"}
        >
          YouTube ↗
        </a>

        {/* 숨겨진 iframe (재생 시에만 마운트) */}
        {playing && (
          <iframe
            key={`${music._key}-${music.startTime}`}
            src={src}
            width="0"
            height="0"
            style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}
      </div>
    </div>
  );
}

// 음악 블록 — 단락 내 카드 형태
function MusicCard({ block, onVisible }: { block: MusicEmbed; onVisible: (b: MusicEmbed | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible(block);
        else onVisible(null);
      },
      { threshold: 0.4, rootMargin: "0px 0px -100px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [block, onVisible]);

  return (
    <div
      ref={ref}
      className="my-8 flex items-center gap-4 py-5 px-0"
      style={{ borderTop: "1px solid #ECEEE9", borderBottom: "1px solid #ECEEE9" }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: "#F0F2EE", border: "1px solid #E0E2DC" }}
      >
        <svg width="10" height="10" viewBox="0 0 12 12" fill="#8EA88A">
          <path d="M2 1.5L10 6L2 10.5V1.5Z"/>
        </svg>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "#C7C9C2" }}>
          Music
        </p>
        <p className="text-xs" style={{ color: "#8A8A84" }}>
          {block.label || "—"}
        </p>
      </div>
    </div>
  );
}

function renderTextBlock(block: TextBlock, i: number) {
  const text = block.children.map((c) => c.text).join("");
  const base: React.CSSProperties = { color: "#4A4A45", lineHeight: 1.9 };

  switch (block.style) {
    case "h1": return <h1 key={i} className="text-4xl font-light mt-12 mb-6" style={{ ...base, fontFamily: "var(--font-cormorant)", color: "#262623" }}>{text}</h1>;
    case "h2": return <h2 key={i} className="text-2xl font-light mt-10 mb-4" style={{ ...base, fontFamily: "var(--font-cormorant)", color: "#262623" }}>{text}</h2>;
    case "h3": return <h3 key={i} className="text-xl font-light mt-8 mb-3" style={{ ...base, fontFamily: "var(--font-cormorant)", color: "#262623" }}>{text}</h3>;
    case "blockquote": return <blockquote key={i} className="my-8 pl-6 italic" style={{ ...base, borderLeft: "2px solid #8EA88A", color: "#8A8A84" }}>{text}</blockquote>;
    default: return text
      ? <p key={i} className="text-base" style={base}>{text}</p>
      : <div key={i} className="h-4" />;
  }
}

export default function PostPage() {
  const locale = useLocale();
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeMusic, setActiveMusic] = useState<MusicEmbed | null>(null);
  const [playerVisible, setPlayerVisible] = useState(false);

  const handleMusicVisible = useCallback((block: MusicEmbed | null) => {
    if (block) {
      setActiveMusic(block);
      setPlayerVisible(true);
    } else {
      setPlayerVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!slug) return;
    client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        titleKo, titleEn, tag, publishedAt,
        bodyKo[] { ..., _type == "image" => { ..., asset->{ url } } },
        bodyEn[] { ..., _type == "image" => { ..., asset->{ url } } }
      }`,
      { slug }
    ).then((data) => { setPost(data); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F3F4F1" }}>
      <p style={{ color: "#A8B0A6" }} className="text-sm">{locale === "ko" ? "불러오는 중..." : "Loading..."}</p>
    </main>
  );

  if (!post) return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F3F4F1" }}>
      <p style={{ color: "#A8B0A6" }} className="text-sm">{locale === "ko" ? "글을 찾을 수 없어요." : "Post not found."}</p>
    </main>
  );

  const body = locale === "ko" ? post.bodyKo : post.bodyEn;

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>
      <Nav current="writing" />

      <article
        className="max-w-2xl mx-auto px-10 md:px-16"
        style={{ paddingTop: "18vh", paddingBottom: playerVisible ? "10rem" : "16vh" }}
      >
        {/* 태그 + 날짜 */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs tracking-widest uppercase" style={{ color: "#8EA88A" }}>{post.tag}</span>
          {post.publishedAt && (
            <span className="text-xs" style={{ color: "#C7C9C2" }}>
              {new Date(post.publishedAt).toLocaleDateString(
                locale === "ko" ? "ko-KR" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </span>
          )}
        </div>

        {/* 제목 */}
        <h1 className="font-light mb-16" style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
          lineHeight: 1.15,
          color: "#262623",
        }}>
          {locale === "ko" ? post.titleKo : post.titleEn}
        </h1>

        {/* 본문 */}
        <div className="flex flex-col gap-5">
          {body?.map((block, i) => {
            if (block._type === "musicEmbed") {
              return (
                <MusicCard
                  key={block._key || i}
                  block={block as MusicEmbed}
                  onVisible={handleMusicVisible}
                />
              );
            }
            if (block._type === "image") {
              const img = block as ImageBlock;
              return (
                <figure key={block._key || i} className="my-8">
                  {img.asset?.url && (
                    <img src={img.asset.url} alt={img.alt || ""} className="w-full" style={{ display: "block" }} />
                  )}
                  {img.caption && (
                    <figcaption className="mt-3 text-xs tracking-wide text-center" style={{ color: "#A8B0A6" }}>
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return renderTextBlock(block as TextBlock, i);
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 pt-12 flex flex-col gap-4" style={{ borderTop: "1px solid #ECEEE9" }}>
          <p className="text-sm" style={{ color: "#A8B0A6", lineHeight: 1.8 }}>
            {locale === "ko" ? "이 글에 대한 감상이 있다면 편하게 전해주세요." : "If this piece moved you, I'd love to hear from you."}
          </p>
          <a
            href={`/${locale}/contact`}
            className="text-xs tracking-[0.25em] uppercase transition-all duration-300 w-fit"
            style={{ color: "#3F5A3C", borderBottom: "1px solid #C7C9C2", paddingBottom: "2px" }}
            onMouseEnter={e => e.currentTarget.style.borderBottomColor = "#3F5A3C"}
            onMouseLeave={e => e.currentTarget.style.borderBottomColor = "#C7C9C2"}
          >
            {locale === "ko" ? "감상 남기기 →" : "Leave a note →"}
          </a>
        </div>

        {/* 목록으로 */}
        <div className="mt-10">
          <a
            href={`/${locale}/writing`}
            className="text-xs tracking-widest uppercase transition-all duration-300"
            style={{ color: "#C7C9C2" }}
            onMouseEnter={e => e.currentTarget.style.color = "#262623"}
            onMouseLeave={e => e.currentTarget.style.color = "#C7C9C2"}
          >
            ← {locale === "ko" ? "글 목록" : "All Writing"}
          </a>
        </div>
      </article>

      {/* 하단 고정 플레이어 */}
      <StickyPlayer music={activeMusic} visible={playerVisible} />
    </main>
  );
}