import type { Metadata, Viewport } from "next";
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
import FeedbackButton from "@/components/FeedbackButton";
import { PWAProvider } from "@/components/PWAProvider";
import OfflineIndicator from "@/components/OfflineIndicator";
import InstallBanner from "@/components/InstallBanner";
import UpdateBanner from "@/components/UpdateBanner";
import IOSInstallPrompt from "@/components/IOSInstallPrompt";
import SplashScreen from "@/components/SplashScreen";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e1b4b" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c1f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BBDU CSE",
  },
  openGraph: {
    title: "BBDU CSE Study Hub",
    description:
      "B.Tech CSE Semester 1 — structured subjects, curated YouTube videos, and progress tracking.",
    url: "https://bbdu.netlify.app",
    siteName: "BBDU CSE Study Hub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bbdu.netlify.app/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: "BBDU CSE Study Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BBDU CSE Study Hub",
    description:
      "B.Tech CSE Semester 1 — structured subjects, curated YouTube videos, and progress tracking.",
    images: ["https://bbdu.netlify.app/icons/og-image.png"],
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
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const t=localStorage.getItem('bbdu-theme');const d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${jakarta.variable} min-h-screen bg-background text-foreground font-sans antialiased`}>
        <PWAProvider>
          <SplashScreen />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pb-20 md:pb-0">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <MobileNav />
            <ScrollToTop />
            <FeedbackButton />
            <SearchModal />
          </div>
          <OfflineIndicator />
          <InstallBanner />
          <UpdateBanner />
          <IOSInstallPrompt />
          <Analytics />
        </PWAProvider>
      </body>
    </html>
  );
}
