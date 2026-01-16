import type { Metadata } from "next";

import { Roboto } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mayowa Oluwanimotele | Web Developer Portfolio",
  description:
    "Portfolio of Mayowa Oluwanimotele – a Web Developer specializing in Next.js, React, and modern web solutions.",
  keywords: [
    "Mayowa Oluwanimotele",
    "Web Developer",
    "Frontend Developer",
    "Next.js",
    "React",
    "Portfolio",
    "Full-Stack Developer",
    "JavaScript",
    "TypeScript",
    "Web Applications",
    "Software Engineer",
    "UI/UX",
    "Responsive Design",
    "Web Development",
    "Programming",
    "Tech Portfolio",
    "Open Source",
    "GitHub",
    "Projects",
    "Coding",
  ],
  authors: [
    {
      name: "Mayowa Oluwanimotele",
      url: "https://github.com/MayDan12",
    },
  ],
  openGraph: {
    title: "Mayowa Oluwanimotele | Web Developer Portfolio",
    description:
      "Showcasing projects, skills, and experience in building scalable web applications using Next.js and React.",
    url: "https://mayowa-oluwanimotele.vercel.app/",
    siteName: "Mayowa Oluwanimotele Portfolio",
    images: [
      {
        url: "/og-graph.jpg", // replace with your image
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
      {
        url: "/og-graph.jpg",
        width: 600,
        height: 315,
        alt: "Portfolio Preview Small",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayowa Oluwanimotele | Web Developer Portfolio",
    description:
      "Discover my projects and expertise in Next.js, React, and modern web development.",
    images: ["/og-graph.jpg"],
    creator: "@Mayowadan12", // optional
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mayowa-oluwanimotele.vercel.app/",
  },
  category: "portfolio",
};

const inter = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
