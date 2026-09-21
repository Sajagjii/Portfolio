import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geist";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const title = "Sajag Makhija — Software, AI & Creative Technology";
const description =
  "Portfolio of Sajag Makhija, an engineering student building software, AI systems, automation projects and creative technology.";

export const metadata: Metadata = {
  title: { default: title, template: "%s — Sajag Makhija" },
  description,
  openGraph: { title, description, type: "website", siteName: "Sajag Makhija" },
  twitter: { card: "summary", title, description },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = {
  themeColor: "#F5F3EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navigation />
        <noscript>
          <style>{`.menu-toggle { display: none !important; } .navigation-links { display: flex !important; }`}</style>
        </noscript>
        {children}
        <Footer />
      </body>
    </html>
  );
}
