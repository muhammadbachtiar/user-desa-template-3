// import { Geist, Geist_Mono } from "next/font/google"; // Disingkirkan sementara karena error koneksi saat build
import Header from "@/components/app-layout/header";
import Footer from "@/components/app-layout/footer";
import "./globals.css";
import Chatbot from "@/components/chatbot/chatbot";
import ClientWrapper from "@/components/shared/clientWrapper";
import SettingService from "@/services/controlers/setting/setting.service";
import Script from "next/script";
import FloatingWeatherButton from "@/components/weather/FloatingWeatherButton";

import GoogleAnalytics from "@/components/shared/GoogleAnalytics";

// Menggunakan variabel font sistem sebagai fallback agar build tidak gagal karena fetch Google Fonts
const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};

export async function generateMetadata() {
   try {
    const logoResponse = await SettingService.getSetting (`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`)
    const heroResponse = await SettingService.getSetting (`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`)
    return {
      title: logoResponse?.data?.value?.regionEntity || "Pemerintah Kabupaten Muara Enim",
      description: heroResponse?.data?.value?.title + heroResponse?.data?.value?.description || "Pemerintah Kabupaten Muara Enim",
      icons: {
        icon: [
          new URL(logoResponse?.data?.value?.imageUrl)
        ]
      },
    }
  } catch {
     return {
      title: process.env.NEXT_PUBLIC_VILLAGE_NAME || "Pemerintah Kabupaten Muara Enim",
      description: "Pemerintah Kabupaten Muara Enim",
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>
          <GoogleAnalytics/>
          <div className="min-h-screen min-w-full bg-primary flex flex-col justify-between items-start w-full">
                <Header/>
                  <main className="flex flex-col justify-center items-center w-full mt-2 ">
                    {children}
                  </main>
                <Footer/>
            </div>
            <FloatingWeatherButton />
            <Chatbot/>
        </ClientWrapper>
        <Script
          src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
