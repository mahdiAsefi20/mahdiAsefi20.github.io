import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahdi Asefi | AI Engineer",
  description:
    "AI Engineer specializing in Deep Learning, Computer Vision, and Generative AI. M.Sc. in Artificial Intelligence.",
  keywords: [
    "Mahdi Asefi",
    "AI Engineer",
    "Deep Learning",
    "Computer Vision",
    "Machine Learning",
  ],
  authors: [{ name: "Mahdi Asefi" }],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Mahdi Asefi | AI Engineer",
    description:
      "AI Engineer specializing in Deep Learning, Computer Vision, and Generative AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
