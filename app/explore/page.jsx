"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { sampleArticles, topics } from "@/data/articles";

export default function ExplorePage() {
  const [selectedTopic, setSelectedTopic] = useState("Barchasi");
  const [articles, setArticles] = useState(sampleArticles);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("qalam-articles") || "[]");
      setArticles([...saved, ...sampleArticles]);
    } catch {}
    const queryTopic = new URLSearchParams(window.location.search).get("topic");
    if (queryTopic) setSelectedTopic(queryTopic);
  }, []);

  const filtered = selectedTopic === "Barchasi" ? articles : articles.filter((item) => item.topic === selectedTopic);

  return (
    <div className="page-shell explore-page">
      <div className="explore-hero">
        <span className="eyebrow">Qiziqishingizdan boshlang</span>
        <h1>Dunyoni yangi <em>fikrlar</em> orqali kashf eting.</h1>
        <p>O'zingizga yaqin mavzularni tanlang va yangi mualliflarni toping.</p>
        <div className="explore-illustration" aria-hidden="true"><span>q.</span><i>✦</i><b>✳</b></div>
      </div>
      <section className="explore-section">
        <div className="section-heading"><div><span className="eyebrow">Mavzular</span><h2>Nima sizni qiziqtiradi?</h2></div></div>
        <div className="topic-grid">
          {["Barchasi", ...topics].map((topic, index) => (
            <button key={topic} onClick={() => setSelectedTopic(topic)} className={`topic-tile topic-tile-${index % 6} ${selectedTopic === topic ? "topic-tile-active" : ""}`}>
              <span className="topic-symbol">{["✳", "⌘", "↗", "▤", "✎", "◌"][index % 6]}</span>
              <strong>{topic}</strong><span className="topic-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>
      <section className="explore-section explore-articles">
        <div className="section-heading"><div><span className="eyebrow">Tanlangan hikoyalar</span><h2>{selectedTopic === "Barchasi" ? "Siz uchun maqolalar" : selectedTopic}</h2></div></div>
        {filtered.length ? <div className="article-list">{filtered.map((article, index) => <ArticleCard key={`${article.slug}-${index}`} article={article} />)}</div> : <div className="empty-state"><h3>Bu mavzuda maqola hali yo'q</h3><p>Birinchi bo'lib yozib ko'ring.</p><Link href="/write" className="text-link">Maqola yozish ↗</Link></div>}
      </section>
    </div>
  );
}
