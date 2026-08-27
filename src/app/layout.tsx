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
import { AcademicProvider } from "@/lib/AcademicContext";
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
    { media: "(prefers-color-scheme: light)", color: "#1a1635" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1635" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "BBD Study Hub",
    template: "%s | BBD Study Hub",
  },
  description:
    "Academic syllabus, curated lectures, and progress tracking for B.Tech students at BBD institutions.",
  keywords: [
    "BBDU",
    "BBDNIIT",
    "BBD University",
    "B.Tech",
    "CSE",
    "study hub",
    "computer science",
    "engineering",
  ],
  authors: [{ name: "Mohd Mohsin" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BBD Study Hub",
  },
  openGraph: {
    title: "BBD Study Hub",
    description:
      "Academic syllabus, curated lectures, and progress tracking for B.Tech students.",
    url: "https://bbdu.netlify.app",
    siteName: "BBD Study Hub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bbdu.netlify.app/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: "BBD Study Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BBD Study Hub",
    description:
      "Academic syllabus, curated lectures, and progress tracking for B.Tech students.",
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
        <meta name="google-site-verification" content="Dm5TtxPOJBgwKp7ruXRuMcM6EfchJLv55K8IWAZDBoM" />
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
          <AcademicProvider>
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
          </AcademicProvider>
          <Analytics />
        </PWAProvider>
      </body>
    </html>
  );
}
