"use client"

import { useAuthListener } from "@/features/auth/hooks/useAuthListener"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  useAuthListener()

  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}