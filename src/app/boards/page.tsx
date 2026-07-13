"use client"

import BoardCanvas from "@/features/boards/components/BoardCanvas"
import BoardList from "@/features/boards/components/BoardList"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function BoardsPage() {

  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (!user) {
      router.replace("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="p-4">

      {editing ? (

        <BoardCanvas
          externalBoard={selectedBoard}
          onBack={() => {
            setEditing(false)
            setSelectedBoard(null)
          }}
        />

      ) : (

        <BoardList
          onCreate={() => {
            setSelectedBoard(null)
            setEditing(true)
          }}

          onSelect={(board) => {
            setSelectedBoard(board)
            setEditing(true)
          }}
        />

      )}

    </div>
  )
}