import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import CartProvider from "@/providers/cart-context";

const dmmono = DM_Mono({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meeeezy",
  description:
    "Meeeezy is a modern eCommerce experience built with Next.js 15, Rapyd Cloud, and WordPress Headless WooCommerce. Lightning-fast, scalable, and designed for seamless shopping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmmono.className} antialiased`}>
        <CartProvider> {children}</CartProvider>
      </body>
    </html>
  );
}
