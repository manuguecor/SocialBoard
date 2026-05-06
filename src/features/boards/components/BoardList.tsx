"use client"

import { useEffect, useState } from "react"
import { getBoards } from "../services/getBoards"
import { useAuthStore } from "@/store/authStore"

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
    <div className="mt-4">
      <h2>Mis pizarras</h2>

      {boards.map((board) => (
        <div key={board.id} className="border p-2 mb-2">
          <button onClick={() => onSelect(board)}>
            Cargar pizarra
          </button>
        </div>
      ))}
    </div>
  )
}