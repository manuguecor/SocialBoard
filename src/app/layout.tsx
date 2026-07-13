import "./globals.css"
import { Inter, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import { Toaster } from "sonner";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "SocialBoard",
  description: "Plataforma social para análisis táctico deportivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-gray-100 text-gray-900 min-h-screen">

        <Providers>
          
          <Navbar />

          <main className="max-w-6xl mx-auto px-4 py-6">
            {children}
          </main>

          <Toaster
            richColors
            position="top-center"
            duration={3000}
          />
          
        </Providers>
      </body>
    </html>
  )
}