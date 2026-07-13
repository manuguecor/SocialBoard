"use client"

import { useState } from "react"

import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import TextArea from "@/components/ui/TextArea"
import Button from "@/components/ui/Button"

import { updateUser } from "../services/updateUser"

type Props = {
  user: any

  onCancel: () => void

  onSuccess: () => void
}

const avatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
]

export default function EditUserForm({
  user,
  onCancel,
  onSuccess,
}: Props) {

  const [username, setUsername] = useState(user.username ?? "")

  const [displayName, setDisplayName] = useState(user.displayName ?? "")

  const [favoriteTeam, setFavoriteTeam] = useState(user.favoriteTeam ?? "")

  const [bio, setBio] = useState(user.bio ?? "")

  const [avatar, setAvatar] = useState(user.avatar ?? "")

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    await updateUser(user.id, {
      username,
      displayName,
      favoriteTeam,
      bio,
      avatar,
    })

    onSuccess()

  }

  return (

    <Card>

      <h1 className="text-3xl font-bold mb-6">
        Editar perfil
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="font-medium mb-3 block">
            Avatar
          </label>

          <div className="flex gap-4">

            {avatars.map((item) => (

              <img
                key={item}
                src={item}
                onClick={() => setAvatar(item)}
                className={`
                  w-20
                  h-20
                  rounded-full
                  cursor-pointer
                  border-4
                  transition

                  ${
                    avatar === item
                      ? "border-green-600"
                      : "border-transparent"
                  }
                `}
              />

            ))}

          </div>

        </div>

        <Input
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <Input
          placeholder="Nombre"
          value={displayName}
          onChange={(e) =>
            setDisplayName(e.target.value)
          }
        />

        <Input
          placeholder="Equipo favorito"
          value={favoriteTeam}
          onChange={(e) =>
            setFavoriteTeam(e.target.value)
          }
        />

        <TextArea
          placeholder="Biografía"
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
        />

        <div className="flex gap-3">

          <Button
            type="submit"
            fullWidth
          >
            Guardar cambios
          </Button>

          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={onCancel}
          >
            Cancelar
          </Button>

        </div>

      </form>

    </Card>

  )
}