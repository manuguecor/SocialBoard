"use client"

import { useEffect, useState } from "react"
import { getBoards } from "../services/getBoards"
import { useAuthStore } from "@/store/authStore"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import PageHeader from "@/components/ui/PageHeader"

export default function BoardList({ 
  onSelect,
  onCreate,
}: {
  onSelect: (board: any) => void
  onCreate: () => void    
}) {
  const user = useAuthStore((state) => state.user)
  const [boards, setBoards] = useState<any[]>([])

  useEffect(() => {
    if (user) loadBoards()
  }, [user])

  const loadBoards = async () => {
    if(!user) return
    const data = await getBoards(user.uid)
    setBoards(data)
  }

  const boardTypes = {
    full: "Campo completo",
    half: "Medio campo",
    area: "Situación de área",
  }

  return (
    <Card>
      <PageHeader
          title="Pizarras tácticas"
          description="Gestiona y organiza tus pizarras."
      />

      {boards.length > 0 && (
        <div className="flex justify-end mb-8">
          <Button onClick={onCreate}>
            + Nueva pizarra
          </Button>
        </div>
      )}

      {boards.length === 0 ? (

        <Card className="text-center">
          <p className="text-gray-500 mb-4">
            Todavía no has creado ninguna pizarra.
          </p>

          <Button onClick={onCreate}>
            Crear primera pizarra
          </Button>
        </Card>

      ) : (

        <div className="space-y-4">
          {boards.map((board) => {

            const players = board.elements?.filter(
              (el: any) => el.type === "player"
            ) || []

            const bluePlayers = players.filter(
              (el: any) => el.team === "blue"
            ).length

            const redPlayers = players.filter(
              (el: any) => el.team === "red"
            ).length

            const balls = board.elements?.filter(
              (el: any) => el.type === "ball"
            ).length || 0

            return (
            <Card
              key={board.id}
              className="hover:shadow-md transition cursor-pointer"
              onClick={() => onSelect(board)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {board.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {boardTypes[
                      board.boardType as keyof typeof boardTypes
                    ]}
                  </p>

                  <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    <span>
                      🔵 {bluePlayers}
                    </span>

                    <span>
                      🔴 {redPlayers}
                    </span>

                    <span>
                      ⚽ {balls}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )})}
        </div>
      )}
    </Card>
  )
}