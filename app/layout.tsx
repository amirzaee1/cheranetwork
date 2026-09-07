import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مسیر تحول اقتصاد",
  description: "یک تجربه آموزشی سینمایی درباره تحول اقتصاد، فروش مستقیم و رشد فردی",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
