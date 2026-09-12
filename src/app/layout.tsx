import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// SF Pro is proprietary: -apple-system resolves to it on Apple platforms,
// Inter is the closest open substitute everywhere else (see DESIGN.md).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// JSON-LD Structured Data for high Google SERP visibility
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aniket Gupta",
  url: "https://aniketgupta.vercel.app",
  jobTitle: "Full Stack Developer & AI Engineer",
  alumniOf: "University School of Automation & Robotics (USAR), Delhi",
  sameAs: [
    "https://github.com/aniigupta",
    "https://www.linkedin.com/in/aniket-gupta-564758226/"
  ]
};

export const metadata: Metadata = {
  title: "Aniket Gupta | Full Stack & AI Developer",
  description: "Portfolio of Aniket Gupta, specializing in building high-performance web applications, SaaS architectures, and integrating AI data pipelines.",
  keywords: ["Aniket Gupta", "Full Stack Developer", "Software Engineer", "Next.js Developer", "React", "AI Integrations", "MERN Stack", "Python Developer"],
  authors: [{ name: "Aniket Gupta" }],
  creator: "Aniket Gupta",
  openGraph: {
    title: "Aniket Gupta | Full Stack & AI Developer",
    description: "Building intelligent digital products and highly scalable Node.js/Next.js architectures.",
    url: "https://aniketgupta.vercel.app",
    siteName: "Aniket Gupta - Portfolio",
    images: [
      {
        url: "https://aniketgupta.vercel.app/profile.png", 
        width: 1200,
        height: 630,
        alt: "Aniket Gupta - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniket Gupta | Software Engineer",
    description: "Building intelligent digital products and scalable architectures.",
    images: ["https://aniketgupta.vercel.app/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://aniketgupta.vercel.app",
  }
};

// Keeps mobile browser chrome in step with the light canvas
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-white">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
