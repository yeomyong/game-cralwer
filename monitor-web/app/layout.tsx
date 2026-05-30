import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "메이플랜드 시세 모니터링",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
