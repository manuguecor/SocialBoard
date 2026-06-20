"use client"

import { useState } from "react"
import { registerUser } from "../services/register"
import { useRouter } from "next/navigation"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

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
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <h1 className="text-3xl font-bold mb-2">
          Crear cuenta
        </h1>

        <p className="text-gray-500 mb-6">
          Regístrese para comenzar a usar SocialBoard
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button fullWidth>
            Registrarse
          </Button>
        </form>
      </Card>
    </div>
  )
}