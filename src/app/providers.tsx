"use client"

import { useAuthListener } from "@/features/auth/hooks/useAuthListener"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {

  useAuthListener()

  return <>{children}</>

}