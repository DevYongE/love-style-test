import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "연애스타일 테스트 | 12개 질문으로 알아보는 나의 연애 패턴",
  description: "나는 어떤 연애스타일일까? 안정형, 불안형, 회피형, 양가형 중 당신의 연애 패턴을 확인해보세요. 총 12개 질문, 3분 소요.",
  keywords: "연애스타일, 연애테스트, 심리테스트, MBTI, 애착유형, 성격테스트",
  openGraph: {
    title: "연애스타일 테스트",
    description: "12개의 질문으로 알아보는 나의 연애 패턴",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google AdSense 인증 코드 */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
        
        {/* Google AdSense 스크립트 */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5297653885125132"
                crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
