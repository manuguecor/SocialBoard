"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { useEffect, useState } from "react"
import { getUserById } from "@/features/users/services/getUserById"
import UserMenu from "@/features/users/components/UserMenu"

export default function Navbar() {
  const pathname = usePathname()
  const user = useAuthStore((state) => state.user)

  const [profile, setProfile] = useState<any>(null)

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/posts", label: "Publicaciones" },
    { href: "/boards", label: "Pizarras" },
  ]

  const loadProfile = async() => {
    const data = await getUserById(user!.uid)
    setProfile(data)
  }

  useEffect(() => {

      if (!user) {
          setProfile(null)
          return
      }

      loadProfile()

  }, [user])

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          SocialBoard
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-gray-600 hover:text-black"
              >
                Iniciar sesión
              </Link>

              <Link
                href="/register"
                className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Registro
              </Link>
            </>
          ) : (
            <>
              <UserMenu />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}