'use client'

import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/app-layout/header";
import Footer from "@/components/app-layout/footer";
import "./globals.css";
import Chatbot from "@/components/chatbot/chatbot";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(()=> new QueryClient());
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen min-w-full bg-primary flex flex-col justify-between items-start w-full overflow-x-hidden">
              <Header/>
                <div className="flex w-full border-gray-200 justify-center items-center pb-8 mx-auto md:px-14 p-3">
                  <main className="flex w-full flex-col gap-[56px] row-start-2 items-center sm:items-start">
                    {children}
                  </main>
                </div>
              <Footer/>
          </div>
          <Chatbot/>
        </QueryClientProvider>
      </body>
    </html>
  );
}
