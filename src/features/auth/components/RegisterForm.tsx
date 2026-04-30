"use client"

import { useState } from "react"
import { registerUser } from "../services/register"
import { useRouter } from "next/navigation"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await registerUser(email, password)
      alert("Usuario creado correctamente")
      router.push("/login")
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-black text-white p-2">
        Registrarse
      </button>
    </form>
  )
}