"use client"

import { useState } from "react"
import { loginUser } from "../services/login"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { toast } from "sonner"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const setUser = useAuthStore((state) => state.setUser)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const user = await loginUser(email, password)
      setUser(user)
      toast.success("Bienvenido de nuevo.")
      router.push("/posts")
    } catch (error: any) {
      toast.error("Usuario o contraseña incorrectos.")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <h1 className="text-3xl font-bold mb-2">
          Iniciar sesión
        </h1>

        <p className="text-gray-500 mb-6">
          Acceda con sus credenciales a SocialBoard
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            type="email"
            placeholder="Correo electrónico"
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
            Iniciar sesión
          </Button>
        </form>
      </Card>
    </div>
  )
}