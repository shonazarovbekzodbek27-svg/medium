import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Qalam — Fikrlaringizga joy",
  description: "O'qing, yozing va fikrlaringizni dunyo bilan ulashing."
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
