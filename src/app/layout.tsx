import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteUrl = "https://mahdiasefi20.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mahdi Asefi — AI Engineer | LLM Systems, Computer Vision & Generative AI",
    template: "%s | Mahdi Asefi",
  },
  description:
    "AI Engineer with 4+ years building production systems across LLM orchestration, computer vision and generative media. M.Sc. in Artificial Intelligence, thesis on deepfake detection.",
  keywords: [
    "Mahdi Asefi",
    "AI Engineer",
    "LLM Systems",
    "LangGraph",
    "Computer Vision",
    "Deepfake Detection",
    "Generative AI",
    "PyTorch",
    "Machine Learning Engineer",
  ],
  authors: [{ name: "Mahdi Asefi", url: siteUrl }],
  creator: "Mahdi Asefi",
  alternates: { canonical: siteUrl },
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mahdi Asefi",
    title: "Mahdi Asefi — AI Engineer",
    description:
      "LLM Systems, Computer Vision & Generative AI. 4+ years shipping production AI systems.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mahdi Asefi — AI Engineer: LLM Systems, Computer Vision & Generative AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahdi Asefi — AI Engineer",
    description:
      "LLM Systems, Computer Vision & Generative AI. 4+ years shipping production AI systems.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables must live on <html>: the theme tokens in globals.css
    // (--font-sans / --font-mono) reference them from :root, and a custom
    // property that resolves to an undefined var() becomes invalid at computed
    // value time — which silently drops the whole font stack.
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} dark`} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
