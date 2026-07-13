"use client"

import { useState } from "react"
import { registerUser } from "../services/register"
import { useRouter } from "next/navigation"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { toast } from "sonner"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!username.trim()) {
      return toast.warning("Introduce un nombre de usuario.")
    }

    if(!email.trim()) {
      return toast.warning("Introduce un email.")
    }

    if(!password.trim() || !confirmPassword.trim()) {
      return toast.warning("Introduce una contraseña.")
    }

    if(password !== confirmPassword) {
      return toast.error("Las contraseñas no coinciden.")
    }

    try {
      await registerUser(email, password, username)
      toast.success("Usuario creado correctamente")
      router.push("/")
    } catch (error: any) {
      toast.error(error.message)
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
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

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

          <Input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
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