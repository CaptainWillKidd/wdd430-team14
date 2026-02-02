import type { Metadata } from "next";
import "./globals.css";
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