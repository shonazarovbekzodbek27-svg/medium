import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell not-found-article">
      <span className="eyebrow">404 · Sahifa topilmadi</span>
      <h1>Bu sahifani topa olmadik.</h1>
      <p>Havola noto'g'ri bo'lishi yoki sahifa ko'chirilgan bo'lishi mumkin.</p>
      <Link href="/" className="primary-button">Bosh sahifaga qaytish</Link>
    </div>
  );
}
