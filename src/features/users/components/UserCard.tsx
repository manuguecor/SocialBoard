"use client"

import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

type Props = {
  user: any
  onEdit: () => void
}

export default function UserCard({
  user,
  onEdit,
}: Props) {
  return (
    <Card>

      <div className="flex flex-col items-center">

        <img
          src={user.avatar}
          alt={user.username}
          className="w-32 h-32 rounded-full border-4 border-white shadow mb-6"
        />

        <h1 className="text-3xl font-bold">
          {user.displayName || user.username}
        </h1>

        <p className="text-gray-500 mt-1">
          @{user.username}
        </p>

        <p className="text-gray-500">
          {user.email}
        </p>

      </div>

      <div className="mt-8 space-y-5">

        <div>
          <h2 className="font-semibold">
            Equipo favorito
          </h2>

          <p className="text-gray-600">
            {user.favoriteTeam || "-"}
          </p>
        </div>

        <div>
          <h2 className="font-semibold">
            Biografía
          </h2>

          <p className="text-gray-600 whitespace-pre-line">
            {user.bio || "Sin biografía"}
          </p>
        </div>

      </div>

      <div className="mt-8">

        <Button
          fullWidth
          onClick={onEdit}
        >
          Editar perfil
        </Button>

      </div>

    </Card>
  )
}