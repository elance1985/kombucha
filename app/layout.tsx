import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mondo Kombucha — Il mondo della kombucha in italiano",
  description:
    "Tutto quello che devi sapere sulla kombucha: benefici, ricette, come farla in casa e dove comprarla in Italia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={poppins.variable}>
      <body className="font-poppins antialiased">{children}</body>
    </html>
  );
}
