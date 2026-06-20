import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaSetup from "./PwaSetup";

export const metadata: Metadata = {
  title: "Organaut",
  description: "Eure Familien-Zentrale",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#8B5E3C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Organaut" />
      </head>
      <body className="min-h-full flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <PwaSetup />
        {children}
      </body>
    </html>
  );
}
