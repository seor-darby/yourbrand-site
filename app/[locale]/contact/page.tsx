"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import Nav from "../../components/Nav";

export default function Contact() {
  const locale = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) setSent(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}
    >
      <Nav current="contact" />

      <section className="max-w-xl mx-auto px-10 md:px-16" style={{ paddingTop: "20vh", paddingBottom: "16vh" }}>

        {/* 헤더 */}
        <p
          className="text-xs tracking-[0.35em] uppercase mb-16"
          style={{ color: "#C7C9C2" }}
        >
          {locale === "ko" ? "연락" : "Contact"}
        </p>

        <h1
          className="font-light mb-6"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
            lineHeight: 1.1,
            color: "#262623",
          }}
        >
          {locale === "ko" ? "함께 이야기해요" : "Let's talk"}
        </h1>

        <p
          className="text-sm leading-loose mb-16"
          style={{ color: "#A8B0A6", maxWidth: "28rem" }}
        >
          {locale === "ko"
            ? "협업, 프로젝트, 또는 그냥 안부 인사도 환영해요."
            : "For collaborations, projects, or just to say hello."}
        </p>

        {sent ? (
          <div className="py-20">
            <p
              className="font-light mb-4"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.4rem", color: "#3F5A3C" }}
            >
              {locale === "ko" ? "감사해요." : "Thank you."}
            </p>
            <p className="text-sm" style={{ color: "#A8B0A6" }}>
              {locale === "ko" ? "곧 연락드릴게요." : "I'll be in touch soon."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {/* 이름 */}
            <div className="flex flex-col gap-3">
              <label className="text-xs tracking-[0.25em] uppercase" style={{ color: "#C7C9C2" }}>
                {locale === "ko" ? "이름" : "Name"}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full py-3 text-sm outline-none bg-transparent transition-colors duration-200"
                style={{ borderBottom: "1px solid #E0E1DC", color: "#262623" }}
                onFocus={e => e.currentTarget.style.borderBottomColor = "#3F5A3C"}
                onBlur={e => e.currentTarget.style.borderBottomColor = "#E0E1DC"}
              />
            </div>

            {/* 이메일 */}
            <div className="flex flex-col gap-3">
              <label className="text-xs tracking-[0.25em] uppercase" style={{ color: "#C7C9C2" }}>
                {locale === "ko" ? "이메일" : "Email"}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full py-3 text-sm outline-none bg-transparent transition-colors duration-200"
                style={{ borderBottom: "1px solid #E0E1DC", color: "#262623" }}
                onFocus={e => e.currentTarget.style.borderBottomColor = "#3F5A3C"}
                onBlur={e => e.currentTarget.style.borderBottomColor = "#E0E1DC"}
              />
            </div>

            {/* 메시지 */}
            <div className="flex flex-col gap-3">
              <label className="text-xs tracking-[0.25em] uppercase" style={{ color: "#C7C9C2" }}>
                {locale === "ko" ? "메시지" : "Message"}
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
                className="w-full py-3 text-sm outline-none resize-none bg-transparent transition-colors duration-200"
                style={{ borderBottom: "1px solid #E0E1DC", color: "#262623" }}
                onFocus={e => e.currentTarget.style.borderBottomColor = "#3F5A3C"}
                onBlur={e => e.currentTarget.style.borderBottomColor = "#E0E1DC"}
              />
            </div>

            {/* 버튼 */}
            <button
              onClick={handleSubmit}
              disabled={sending || !name || !email || !message}
              className="self-start text-xs tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300"
              style={{
                backgroundColor: name && email && message ? "#262623" : "#E0E1DC",
                color: name && email && message ? "#F3F4F1" : "#A8B0A6",
                cursor: name && email && message ? "pointer" : "default",
              }}
              onMouseEnter={e => { if (name && email && message) e.currentTarget.style.backgroundColor = "#3F5A3C"; }}
              onMouseLeave={e => { if (name && email && message) e.currentTarget.style.backgroundColor = "#262623"; }}
            >
              {sending
                ? (locale === "ko" ? "보내는 중..." : "Sending...")
                : (locale === "ko" ? "보내기" : "Send")}
            </button>
          </div>
        )}

        {/* 소셜 링크 */}
        <div
          className="mt-20 pt-10 flex gap-8"
          style={{ borderTop: "1px solid #E8E9E5" }}
        >
          <a
            href="mailto:kimwoals2949@gmail.com"
            className="text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: "#C7C9C2" }}
            onMouseEnter={e => e.currentTarget.style.color = "#262623"}
            onMouseLeave={e => e.currentTarget.style.color = "#C7C9C2"}
          >
            Email
          </a>
          <a
            href="https://www.instagram.com/seor.field/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: "#C7C9C2" }}
            onMouseEnter={e => e.currentTarget.style.color = "#262623"}
            onMouseLeave={e => e.currentTarget.style.color = "#C7C9C2"}
          >
            Instagram
          </a>
        </div>

      </section>
    </main>
  );
}