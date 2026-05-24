"use client"

import "./globals.css"
import Navbar from "@/components/Navbar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}