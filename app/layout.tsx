import type { Metadata } from "next";

import { Roboto } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jehoshaphat Martins| Mobile & Web Engineer",
  description:
    "Portfolio of Jehoshaphat Martins – a Mobile & Web Engineer specializing in Next.js, React.js, and modern web solutions.",
  keywords: [
    "Jehoshaphat Martins",
    "Web Developer",
    "Frontend Engineer",
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
      name: "Jehoshaphat Martins",
      url: "https://github.com/thesongmartins",
    },
  ],
  openGraph: {
    title: "Jehoshaphat Martins | Mobile & Web Engineer",
    description:
      "Showcasing projects, skills, and experience in building scalable web applications using Next.js and React.",
    url: "https://songmartins.vercel.app/",
    siteName: "Jehoshaphat Martins Portfolio",
    images: [
      {
        url: "/song.jpg", // replace with your image
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
      {
        url: "/song.jpg",
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
    title: "Jehoshaphat Martins | Mobile & Web Engineer",
    description:
      "Discover my projects and expertise in Next.js, React, and modern web development.",
    images: ["/song.jpg"],
    creator: "@thesongmartins", // optional
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://songmartins.vercel.app/",
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
