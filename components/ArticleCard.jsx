import Link from "next/link";

export default function ArticleCard({ article, featured = false }) {
  return (
    <article className={`article-card ${featured ? "article-featured" : ""}`}>
      <div className="article-copy">
        <div className="author-line">
          <span className="avatar" style={{ background: article.avatarColor || "#d9e7df" }}>
            {(article.author || "Q").charAt(0).toUpperCase()}
          </span>
          <span>{article.author || "Qalam muallifi"}</span>
          <span className="dot">·</span>
          <span>{article.date || "Bugun"}</span>
        </div>
        <Link href={`/article/${article.slug}`} className="article-title-link">
          <h2 className={featured ? "featured-title" : ""}>{article.title}</h2>
        </Link>
        <p className="article-excerpt">{article.excerpt}</p>
        <div className="article-meta-bottom">
          <span className="topic-pill">{article.topic || "Hayot"}</span>
          <span>{article.readTime || "4 daqiqa"} o‘qish</span>
          <button className="icon-button" aria-label="Maqola amallari" title="Maqola amallari">•••</button>
        </div>
      </div>
      {article.image && (
        <Link href={`/article/${article.slug}`} className="article-image-wrap" aria-label={article.title}>
          <img src={article.image} alt="" className="article-image" />
        </Link>
      )}
    </article>
  );
}
