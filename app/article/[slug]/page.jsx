"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { sampleArticles } from "@/data/articles";

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug;
  const [article, setArticle] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let found = sampleArticles.find((item) => item.slug === slug);
    try {
      const custom = JSON.parse(localStorage.getItem(`qalam-article-${slug}`) || "null");
      if (custom) found = custom;
      if (!found) {
        const saved = JSON.parse(localStorage.getItem("qalam-articles") || "[]");
        found = saved.find((item) => item.slug === slug) || null;
      }
    } catch {}
    setArticle(found || null);
    setReady(true);
  }, [slug]);

  if (!ready) return <div className="page-shell loading-state">Maqola yuklanmoqda...</div>;

  if (!article) {
    return (
      <div className="page-shell not-found-article">
        <span className="eyebrow">404 · Maqola topilmadi</span>
        <h1>Bu sahifada hozircha maqola yo'q.</h1>
        <p>Maqola o'chirilgan yoki boshqa brauzerda yozilgan bo'lishi mumkin.</p>
        <Link href="/" className="primary-button">Bosh sahifaga qaytish</Link>
      </div>
    );
  }

  const paragraphs = Array.isArray(article.content) ? article.content : [article.content];

  return (
    <div className="page-shell reading-page">
      <Link href="/" className="back-link">← Barcha maqolalar</Link>
      <article className="reading-article">
        <div className="reading-topic">{article.topic}</div>
        <h1>{article.title}</h1>
        <p className="reading-subtitle">{article.excerpt}</p>
        <div className="reading-author">
          <span className="avatar large-avatar" style={{ background: article.avatarColor || "#d9e7df" }}>{(article.author || "Q").charAt(0)}</span>
          <div><strong>{article.author || "Qalam muallifi"}</strong><span>{article.date || "Bugun"} · {article.readTime || "4 daqiqa"} o'qish</span></div>
        </div>
        {article.image && <img className="reading-hero-image" src={article.image} alt="" />}
        <div className="reading-content">
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <div className="reading-end"><span>✳</span><p>O'qiganingiz uchun rahmat.</p></div>
        <div className="reading-footer"><span>Ushbu maqola sizga yoqdimi?</span><Link href="/write" className="text-link">O'z maqolangizni yozing ↗</Link></div>
      </article>
    </div>
  );
}
