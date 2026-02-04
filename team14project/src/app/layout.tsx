import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
import Navbar from "@/components/Navbar"; // Import the component
import Footer from "@/components/Footer"; // Import the component

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Marketplace for unique handcrafted items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Navbar sits at the top of every page */}
        <Navbar />
        
        {/* The specific page content (Home, Shop, etc.) renders here */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer sits at the bottom of every page */}
        <Footer />
      </body>
    </html>
  );
}