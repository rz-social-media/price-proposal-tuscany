import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Torre di Celle | Content Partnership Proposal",
  description: "A cinematic content partnership for a wedding weekend in Tuscany.",
  openGraph: {
    type: "website",
    url: "https://rz-social-media.github.io/price-proposal-tuscany/",
    title: "La Torre di Celle | Content Partnership Proposal",
    description: "A cinematic content partnership for a wedding weekend in Tuscany.",
    images: [
      {
        url: "https://rz-social-media.github.io/price-proposal-tuscany/images/vision-board.png",
        width: 755,
        height: 921,
        alt: "La Torre di Celle wedding vision board",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Torre di Celle | Content Partnership Proposal",
    description: "A cinematic content partnership for a wedding weekend in Tuscany.",
    images: ["https://rz-social-media.github.io/price-proposal-tuscany/images/vision-board.png"],
  },
};

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href={`${publicBasePath}/fonts/assistant-latin.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={`${publicBasePath}/fonts/cormorant-garamond-latin.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={`${publicBasePath}/fonts/cormorant-garamond-italic-latin.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face{font-family:'Assistant';font-style:normal;font-weight:300 700;font-display:block;src:url('${publicBasePath}/fonts/assistant-latin.woff2') format('woff2')}
          @font-face{font-family:'Cormorant Garamond';font-style:normal;font-weight:400 600;font-display:block;src:url('${publicBasePath}/fonts/cormorant-garamond-latin.woff2') format('woff2')}
          @font-face{font-family:'Cormorant Garamond';font-style:italic;font-weight:400 500;font-display:block;src:url('${publicBasePath}/fonts/cormorant-garamond-italic-latin.woff2') format('woff2')}
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
