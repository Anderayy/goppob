import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://goppob.com"),
  title: {
    default: "GoPPOB - Semua Pembayaran Digital Dalam Satu Panel",
    template: "%s | GoPPOB",
  },
  description: "Platform PPOB modern untuk pulsa, data, PLN, tagihan, e-wallet, game, dan entertainment.",
  openGraph: {
    title: "GoPPOB",
    description: "Semua Pembayaran Digital Dalam Satu Panel",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
