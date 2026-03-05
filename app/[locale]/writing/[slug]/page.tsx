"use client";

import { useRouter, usePathname, useParams } from "next/navigation";
import { useLocale } from "next-intl";

const posts: Record<string, {
  titleKo: string; titleEn: string;
  date: string; tag: string;
  contentKo: string; contentEn: string;
}> = {
  "sensory-note-01": {
    titleKo: "첫 번째 감각 노트",
    titleEn: "Sensory Note 01",
    date: "2025.03",
    tag: "Sensory",
    contentKo: `식재료를 처음 손에 쥐었을 때, 그 질감이 말을 건다.

매끄럽거나 거칠거나, 차갑거나 따뜻하거나. 그 첫 번째 접촉은 단순한 물리적 감각이 아니다. 그것은 재료가 살아온 시간, 자란 땅, 품어온 햇빛의 언어다.

나는 그 언어를 배우고 싶다.`,
    contentEn: `When I first hold an ingredient, its texture speaks to me.

Smooth or rough, cold or warm. That first contact is not merely a physical sensation. It is the language of the time the ingredient has lived, the soil it grew in, the sunlight it has held.

I want to learn that language.`,
  },
  "on-ingredients": {
    titleKo: "재료에 대하여",
    titleEn: "On Ingredients",
    date: "2025.02",
    tag: "Essay",
    contentKo: `재료는 단순한 도구가 아니다. 그것은 장소이고 시간이다.

어떤 토마토는 여름 오후의 기억을 품고 있고, 어떤 소금은 먼 바다의 침묵을 간직하고 있다. 우리가 재료를 다룰 때, 우리는 그 기억과 침묵을 다루는 것이다.

요리는 그래서 번역이다. 재료의 언어를 식탁의 언어로 옮기는 일.`,
    contentEn: `Ingredients are not mere tools. They are place and time.

Some tomatoes carry the memory of a summer afternoon, and some salt holds the silence of a distant sea. When we handle ingredients, we handle those memories and silences.

Cooking is therefore translation. The work of rendering the language of ingredients into the language of the table.`,
  },
};

export default function Post() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string;

  const post = posts[slug];

  const toggleLocale = () => {
    const nextLocale = locale === "ko" ? "en" : "ko";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F3F4F1" }}>
        <p style={{ color: "#A8B0A6" }}>글을 찾을 수 없어요.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>
      <nav className="flex justify-between items-center px-12 py-8" style={{ borderBottom: "1px solid #C7C9C2" }}>
        <a href={`/${locale}`} style={{ fontFamily: "var(--font-cormorant)", color: "#3F5A3C", fontSize: "1.6rem", letterSpacing: "0.15em" }} className="font-light">Seor</a>
        <div className="flex items-center gap-10 text-sm">
          <a href={`/${locale}/about`} style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300">
            {locale === "ko" ? "소개" : "About"}
          </a>
          <a href={`/${locale}/writing`} style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300">
            {locale === "ko" ? "글" : "Writing"}
          </a>
          <a href="#" style={{ color: "#A8B0A6" }} onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")} className="transition-all duration-300">
            {locale === "ko" ? "작업" : "Work"}
          </a>
          <button onClick={toggleLocale} className="text-xs tracking-widest uppercase px-3 py-1 rounded-full transition-all duration-300" style={{ border: "1px solid #A8B0A6", color: "#A8B0A6" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#3F5A3C"; e.currentTarget.style.color = "#3F5A3C"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#A8B0A6"; e.currentTarget.style.color = "#A8B0A6"; }}>
            {locale === "ko" ? "EN" : "KO"}
          </button>
        </div>
      </nav>
      <article className="max-w-2xl mx-auto px-12 py-32">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs tracking-widest uppercase" style={{ color: "#8EA88A" }}>{post.tag}</span>
          <span className="text-xs" style={{ color: "#C7C9C2" }}>{post.date}</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-cormorant)", lineHeight: 1.1 }} className="text-5xl font-light mb-16">
          {locale === "ko" ? post.titleKo : post.titleEn}
        </h1>
        <div className="flex flex-col gap-6 text-base leading-relaxed" style={{ color: "#4A4A45" }}>
          {(locale === "ko" ? post.contentKo : post.contentEn).split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
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