"use client";

import { useEffect, useMemo, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { sampleArticles } from "@/data/articles";

export default function HomeFeed() {
  const [articles, setArticles] = useState(sampleArticles);
  const [activeTab, setActiveTab] = useState("Siz uchun");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("qalam-articles") || "[]");
      setArticles([...saved, ...sampleArticles]);
    } catch {
      setArticles(sampleArticles);
    }
  }, []);

  const visibleArticles = useMemo(() => {
    let result = articles;
    if (activeTab !== "Siz uchun" && activeTab !== "Eng yangi") {
      result = result.filter((article) => article.topic === activeTab);
    }
    const term = search.trim().toLowerCase();
    if (term) {
      result = result.filter((article) =>
        `${article.title} ${article.excerpt} ${article.author} ${article.topic}`.toLowerCase().includes(term)
      );
    }
    return result;
  }, [articles, activeTab, search]);

  const tabs = ["Siz uchun", "Eng yangi", "Texnologiya", "Dasturlash", "Shaxsiy rivojlanish"];

  return (
    <div className="home-layout">
      <section className="feed-column">
        <div className="welcome-banner">
          <div>
            <span className="eyebrow">Fikrlar uchun yangi makon</span>
            <h1>O'ylaganlaringizni<br /><em>so'zga aylantiring.</em></h1>
            <p>Yangi g'oyalarni kashf eting. O'z hikoyangizni ulashing.</p>
          </div>
          <div className="banner-art" aria-hidden="true">
            <div className="paper-shape"><span>q.</span></div>
            <span className="spark spark-one">✳</span>
            <span className="spark spark-two">✦</span>
          </div>
        </div>

        <div className="feed-heading">
          <div>
            <span className="eyebrow">Qalam jurnali</span>
            <h2>O'qishga arziydigan fikrlar</h2>
          </div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Maqola qidirish..." />
          </label>
        </div>

        <div className="feed-tabs" role="tablist" aria-label="Maqola mavzulari">
          {tabs.map((tab) => (
            <button key={tab} className={activeTab === tab ? "feed-tab selected" : "feed-tab"} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        <div className="article-list">
          {visibleArticles.length ? visibleArticles.map((article, index) => (
            <ArticleCard key={`${article.slug}-${index}`} article={article} featured={index === 0 && !search && activeTab === "Siz uchun"} />
          )) : (
            <div className="empty-state">
              <span>⌕</span>
              <h3>Maqola topilmadi</h3>
              <p>Boshqa so'z bilan qidirib ko'ring yoki boshqa mavzuni tanlang.</p>
            </div>
          )}
        </div>
      </section>

      <aside className="right-sidebar">
        <div className="sidebar-card note-card">
          <span className="sidebar-kicker">Qalam haqida</span>
          <h3>Yaxshi fikrlar ulashilganda yanada qadrlidir.</h3>
          <p>Qalam — o'qish, yozish va yangi nuqtai nazarlarni topish uchun kichik hamjamiyat.</p>
          <a href="/write" className="text-link">Birinchi maqolangizni yozing ↗</a>
        </div>
        <div className="sidebar-card">
          <div className="sidebar-title-row"><h3>Ommabop mavzular</h3><span>↗</span></div>
          <div className="topic-cloud">
            {["Dasturlash", "Texnologiya", "Kitoblar", "Ta'lim", "Hayot", "Ijod"].map((topic) => (
              <a key={topic} href={`/explore?topic=${encodeURIComponent(topic)}`}>{topic}</a>
            ))}
          </div>
        </div>
        <div className="sidebar-card quote-card">
          <span className="quote-mark">“</span>
          <p>Yozish — fikrlaringizni yaxshiroq tushunishning bir usuli.</p>
          <span className="quote-credit">Qalam kundaligi</span>
        </div>
        <p className="sidebar-footer">© 2026 Qalam · Maxfiylik · Qoidalar</p>
      </aside>
    </div>
  );
}
