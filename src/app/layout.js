import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/tailwind.css";
import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import MvvSection from "@/components/AboutUs/MvvSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout() {
  return (
    <html lang="en">
       
    
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        <Header/>
        <HeroSection />
        <MvvSection />
      </body>
    </html>
  );
}
