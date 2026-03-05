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

  const handleSubmit = async () => {
    if (!name || !email || !message) return;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) setSent(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F3F4F1", color: "#262623", fontFamily: "var(--font-inter)" }}>
      <Nav current="contact" />
      <section className="max-w-2xl mx-auto px-12 py-32">
        <p className="text-xs tracking-[0.3em] uppercase mb-10" style={{ color: "#8EA88A" }}>
          {locale === "ko" ? "연락" : "Contact"}
        </p>
        <h1 style={{ fontFamily: "var(--font-cormorant)", lineHeight: 1.1 }} className="text-5xl font-light mb-6">
          {locale === "ko" ? "함께 이야기해요" : "Let's talk"}
        </h1>
        <p className="text-sm mb-16 leading-relaxed" style={{ color: "#A8B0A6" }}>
          {locale === "ko" ? "협업, 프로젝트, 또는 그냥 안부 인사도 환영해요." : "For collaborations, projects, or just to say hello."}
        </p>
        {sent ? (
          <div className="py-16 text-center">
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "#3F5A3C" }}>
              {locale === "ko" ? "감사해요 🌿" : "Thank you 🌿"}
            </p>
            <p className="text-sm mt-4" style={{ color: "#A8B0A6" }}>
              {locale === "ko" ? "곧 연락드릴게요." : "I'll be in touch soon."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest uppercase" style={{ color: "#A8B0A6" }}>
                {locale === "ko" ? "이름" : "Name"}
              </label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full py-3 text-sm outline-none" style={{ backgroundColor: "transparent", borderBottom: "1px solid #C7C9C2", color: "#262623" }} onFocus={e => (e.currentTarget.style.borderBottomColor = "#3F5A3C")} onBlur={e => (e.currentTarget.style.borderBottomColor = "#C7C9C2")} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest uppercase" style={{ color: "#A8B0A6" }}>
                {locale === "ko" ? "이메일" : "Email"}
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full py-3 text-sm outline-none" style={{ backgroundColor: "transparent", borderBottom: "1px solid #C7C9C2", color: "#262623" }} onFocus={e => (e.currentTarget.style.borderBottomColor = "#3F5A3C")} onBlur={e => (e.currentTarget.style.borderBottomColor = "#C7C9C2")} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest uppercase" style={{ color: "#A8B0A6" }}>
                {locale === "ko" ? "메시지" : "Message"}
              </label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} className="w-full py-3 text-sm outline-none resize-none" style={{ backgroundColor: "transparent", borderBottom: "1px solid #C7C9C2", color: "#262623" }} onFocus={e => (e.currentTarget.style.borderBottomColor = "#3F5A3C")} onBlur={e => (e.currentTarget.style.borderBottomColor = "#C7C9C2")} />
            </div>
            <button onClick={handleSubmit} className="self-start text-sm tracking-widest uppercase px-8 py-4" style={{ backgroundColor: "#3F5A3C", color: "#F3F4F1" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#4A6A4E")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#3F5A3C")}>
              {locale === "ko" ? "보내기" : "Send"}
            </button>
          </div>
        )}
        <div className="mt-20 pt-12 flex gap-8 text-sm" style={{ borderTop: "1px solid #C7C9C2", color: "#A8B0A6" }}>
          <a href="mailto:kimwoals2949@gmail.com" className="transition-all duration-300" onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")}>Email</a>
          <a href="#" className="transition-all duration-300" onMouseEnter={e => (e.currentTarget.style.color = "#3F5A3C")} onMouseLeave={e => (e.currentTarget.style.color = "#A8B0A6")}>Instagram</a>
        </div>
      </section>
    </main>
  );
}