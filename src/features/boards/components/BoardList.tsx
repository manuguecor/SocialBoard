"use client"

import { useEffect, useState } from "react"
import { getBoards } from "../services/getBoards"
import { useAuthStore } from "@/store/authStore"
import Card from "@/components/ui/Card"

export default function BoardList({ onSelect }: any) {
  const user = useAuthStore((state) => state.user)
  const [boards, setBoards] = useState<any[]>([])

  useEffect(() => {
    if (user) loadBoards()
  }, [user])

  const loadBoards = async () => {
    const data = await getBoards(user.uid)
    setBoards(data)
  }

  return (
    <Card>
      <h2 className="text-2xl font-semibold mb-6">
        Mis pizarras
      </h2>

      <div className="space-y-3">
        {boards.map((board, index) => (
          <button
            key={board.id}
            onClick={() => onSelect(board)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-left hover:bg-gray-100 hover:shadow-sm transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  {board.name || `Pizarra ${index + 1}`}
                </h3>
              </div>

              <span className="text-sm text-gray-400">
                →
              </span>
            </div>
          </button>
        ))}
      </div>
    </Card>
  )
}