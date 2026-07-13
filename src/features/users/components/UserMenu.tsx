"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"

import { useAuthStore } from "@/store/authStore"

import { logoutUser } from "@/features/auth/services/logout"
import { getUserById } from "@/features/users/services/getUserById"
import { usePathname } from "next/navigation"

export default function UserMenu() {

    const user = useAuthStore(state => state.user)

    const [profile, setProfile] = useState<any>(null)

    const [open, setOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)

    const pathname = usePathname()

    useEffect(() => {

        if (!user) {
            setProfile(null)
            return
        }

        loadProfile()

    }, [user, pathname])

    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }

        }

        document.addEventListener("mousedown", handleClickOutside)

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )

    }, [])

    useEffect(() => {

        setOpen(false)

    }, [pathname])

    async function loadProfile() {

        const data = await getUserById(user!.uid)

        setProfile(data)

    }

    if (!profile) return null

    return (

        <div ref={menuRef} className="relative">

            <button
                onClick={() => setOpen(!open)}
            >

                <img
                    src={profile.avatar}
                    className="w-10 h-10 rounded-full border"
                />

            </button>

            {open && (

                <div
                    className="
                        absolute
                        right-0
                        mt-3
                        w-56
                        rounded-xl
                        border
                        bg-white
                        shadow-lg
                        overflow-hidden
                    "
                >

                    <div className="p-4 border-b">

                        <p className="font-semibold">
                            {profile.username}
                        </p>

                    </div>

                    <Link
                        href="/users"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-3 hover:bg-gray-100"
                    >
                        Mi perfil
                    </Link>

                    <button
                        onClick={logoutUser}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                        Cerrar sesión
                    </button>

                </div>

            )}

        </div>

    )
}