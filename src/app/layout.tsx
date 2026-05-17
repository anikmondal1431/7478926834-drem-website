import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BottomNav from "@/components/layout/BottomNav";
import { StoreProvider } from "@/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chakdaha Bazar - Fastest Grocery Delivery",
  description: "Chakdaha's premium quick-commerce grocery delivery platform. Get fresh vegetables, fruits, fish, meat, dairy, and local Bengali products delivered fast.",
  keywords: "Chakdaha, Bazar, Grocery, Delivery, Fresh, Vegetables, Fish, Meat, Bengali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <title>Chakdaha Bazar | Online Grocery Shopping Nadia | Fresh Fruits & Water Delivery</title>
        <meta name="description" content="Order fresh vegetables, fruits, fish, meat and drinking water online in Chakdaha. Fast next-day delivery to 741222, 741223. Best online shopping experience in Chakdaha Nadia." />
        <meta name="keywords" content="chakdaha, online shopping, water, fresh fruit, home delivery, 741222, 741223, chakdaha bazar, nadia grocery, west bengal online shop" />
        <meta name="author" content="Chakdaha Bazar" />
        <meta property="og:title" content="Chakdaha Bazar - Freshness Delivered" />
        <meta property="og:description" content="Fastest grocery delivery in Chakdaha Nadia." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={`${inter.className} bg-surface dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300`}>
        <StoreProvider>
          <Navbar />
          <main className="min-h-screen pt-16 pb-20 md:pb-0">
            {children}
          </main>
          <WhatsAppButton />
          <BottomNav />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
