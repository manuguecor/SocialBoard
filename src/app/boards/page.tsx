"use client"

import BoardCanvas from "@/features/boards/components/BoardCanvas"
import BoardList from "@/features/boards/components/BoardList"
import { useState } from "react"

export default function BoardsPage() {
  const [selectedBoard, setSelectedBoard] = useState(null)

  return (
    <div className="p-4">
      <BoardCanvas externalBoard={selectedBoard} />
      <BoardList onSelect={setSelectedBoard} />
    </div>
  )
}