"use client"

import BoardCanvas from "@/features/boards/components/BoardCanvas"
import BoardList from "@/features/boards/components/BoardList"
import { useState } from "react"

export default function BoardsPage() {
  const [selectedBoard, setSelectedBoard] = useState(null)

  const [editing, setEditing] = useState(false)

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