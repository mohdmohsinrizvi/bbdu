import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Analytics from "@/components/Analytics";
import PageTransition from "@/components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";
import SearchModal from "@/components/SearchModal";
import ComingSoon from "@/components/ComingSoon";
import FeedbackButton from "@/components/FeedbackButton";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: "BBDU CSE Study Hub",
    template: "%s | BBDU CSE Study Hub",
  },
  description:
    "B.Tech CSE Semester 1 — structured subjects, curated YouTube videos, and progress tracking. Built by students, for students at BBD University.",
  keywords: [
    "BBDU",
    "BBD University",
    "B.Tech CSE",
    "Semester 1",
    "study hub",
    "computer science",
    "engineering",
    "calculus",
    "quantum physics",
    "C programming",
    "electronics",
  ],
  authors: [{ name: "Mohd Mohsin" }],
  openGraph: {
    title: "BBDU CSE Study Hub",
    description:
      "B.Tech CSE Semester 1 — structured subjects, curated YouTube videos, and progress tracking.",
    url: "https://bbdu-study-hub.vercel.app",
    siteName: "BBDU CSE Study Hub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BBDU CSE Study Hub",
    description:
      "B.Tech CSE Semester 1 — structured subjects, curated YouTube videos, and progress tracking.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      )}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const t=localStorage.getItem('bbdu-theme');const d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${jakarta.variable} min-h-screen bg-background text-foreground font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <ComingSoon />
          <Footer />
          <MobileNav />
          <ScrollToTop />
          <FeedbackButton />
          <SearchModal />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
