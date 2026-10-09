"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";

export default function ProfilePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    try {
      setArticles(JSON.parse(localStorage.getItem("qalam-articles") || "[]"));
    } catch {
      setArticles([]);
    }
  }, []);

  return (
    <div className="page-shell profile-page">
      <section className="profile-cover"><div className="profile-monogram">q.</div></section>
      <section className="profile-info">
        <div><span className="eyebrow">Qalam muallifi</span><h1>Sizning profilingiz</h1><p>Fikrlaringiz, kuzatishlaringiz va hikoyalaringiz uchun shaxsiy makon.</p></div>
        <Link href="/write" className="primary-button">＋ Maqola yozish</Link>
      </section>
      <div className="profile-stats"><div><strong>{articles.length}</strong><span>Maqolalar</span></div><div><strong>0</strong><span>Kuzatuvchilar</span></div><div><strong>0</strong><span>Kuzatilmoqda</span></div></div>
      <section className="profile-posts"><span className="eyebrow">Nashrlaringiz</span><h2>Yozgan maqolalaringiz</h2>
        {articles.length ? <div className="article-list">{articles.map((article, index) => <ArticleCard key={`${article.slug}-${index}`} article={article} />)}</div> : <div className="empty-state"><span>✎</span><h3>Hali maqola yozmagansiz</h3><p>Birinchi fikringizni yozing — u shu yerda ko'rinadi.</p><Link href="/write" className="primary-button">Birinchi maqolani yozish</Link></div>}
      </section>
    </div>
  );
}
