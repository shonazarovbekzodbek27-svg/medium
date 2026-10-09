"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const topicOptions = ["Shaxsiy rivojlanish", "Texnologiya", "Dasturlash", "Kitoblar", "Hayot", "Ta'lim", "Ijod", "Biznes"];

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("Shaxsiy rivojlanish");
  const [error, setError] = useState("");

  function publishArticle(event) {
    event.preventDefault();
    if (title.trim().length < 5) {
      setError("Sarlavha kamida 5 ta belgidan iborat bo'lsin.");
      return;
    }
    if (content.trim().length < 30) {
      setError("Maqola matni kamida 30 ta belgidan iborat bo'lsin.");
      return;
    }

    const slug = `${title.trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now()}`;

    const article = {
      slug,
      title: title.trim(),
      excerpt: subtitle.trim() || content.trim().slice(0, 145) + (content.trim().length > 145 ? "..." : ""),
      author: "Siz",
      date: "Hozirgina",
      topic,
      readTime: `${Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))} daqiqa`,
      image: "",
      avatarColor: "#dce9df",
      content: content.trim().split(/\n{2,}/).filter(Boolean)
    };

    try {
      const existing = JSON.parse(localStorage.getItem("qalam-articles") || "[]");
      localStorage.setItem("qalam-articles", JSON.stringify([article, ...existing]));
      localStorage.setItem(`qalam-article-${slug}`, JSON.stringify(article));
      router.push(`/article/${slug}`);
    } catch {
      setError("Brauzer xotirasiga saqlab bo'lmadi. Brauzer sozlamalarini tekshiring.");
    }
  }

  return (
    <div className="page-shell write-page">
      <div className="write-topline">
        <div><span className="eyebrow">Qalam muharriri</span><h1>Hikoyangizni yozing</h1></div>
        <span className="draft-status"><span className="status-dot" /> Mahalliy qoralama</span>
      </div>
      <form className="editor-card" onSubmit={publishArticle}>
        <div className="editor-toolbar"><span>✎ &nbsp; Yangi maqola</span><span>O'qishga qulay matn yozing</span></div>
        <label className="field-label" htmlFor="article-title">Sarlavha</label>
        <input id="article-title" className="title-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Maqolangiz sarlavhasi..." maxLength={120} />
        <label className="field-label" htmlFor="article-subtitle">Qisqa izoh <span>(ixtiyoriy)</span></label>
        <input id="article-subtitle" className="subtitle-input" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="O'quvchiga maqola haqida qisqacha ayting..." maxLength={220} />
        <label className="field-label" htmlFor="article-topic">Mavzu</label>
        <select id="article-topic" className="topic-select" value={topic} onChange={(e) => setTopic(e.target.value)}>
          {topicOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
        <label className="field-label" htmlFor="article-content">Maqola matni</label>
        <textarea id="article-content" className="content-input" value={content} onChange={(e) => setContent(e.target.value)} placeholder={"Hikoyangizni shu yerda boshlang...\n\nYangi paragraf uchun bo'sh qator qoldiring."} />
        <div className="editor-bottom">
          <span>{content.trim() ? content.trim().split(/\s+/).length : 0} ta so'z</span>
          <div>{error && <p className="form-error" role="alert">{error}</p>}<button type="submit" className="primary-button">Maqolani chop etish ↗</button></div>
        </div>
      </form>
      <p className="editor-hint">Maqolalaringiz hozircha shu brauzerda saqlanadi. Sayt serveriga yuborilmaydi.</p>
    </div>
  );
}
