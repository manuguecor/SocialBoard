"use client"

import { useEffect, useState } from "react"

import Card from "@/components/ui/Card"
import { useAuthStore } from "@/store/authStore"

import { saveBoard } from "../services/saveBoard"

import BoardHeader from "./BoardHeader"
import BoardToolbar from "./BoardToolbar"
import BoardStage from "./BoardStage"
import BoardFooter from "./BoardFooter"

import { ToolType } from "../types/ToolType"
import { BoardElement } from "../types/BoardElement"

type Props = {
  externalBoard?: any
  onBack: () => void
}

export default function BoardCanvas({
  externalBoard,
  onBack,
}: Props) {
  const user = useAuthStore(
    (state) => state.user
  )

  const [elements, setElements] = useState<
    BoardElement[]
  >([])

  const [boardId, setBoardId] =
    useState<string | null>(null)

  const [boardName, setBoardName] =
    useState("")

  const [boardType, setBoardType] =
    useState<"full" | "half" | "area">(
      "full"
    )

  const [selectedId, setSelectedId] =
    useState<number | null>(null)

  const [tool, setTool] =
    useState<ToolType>("select")

  useEffect(() => {
    if (!externalBoard) {
      setElements([])
      setBoardId(null)
      setBoardName("")
      setBoardType("full")
      setSelectedId(null)
      setTool("select")
      return
    }

    setBoardId(externalBoard.id)

    setBoardName(
      externalBoard.name || ""
    )

    setBoardType(
      externalBoard.boardType || "full"
    )

    setElements(
      externalBoard.elements || []
    )

    setSelectedId(null)

    setTool("select")
  }, [externalBoard])

  const handleSave = async () => {
    if (!user) {
      return alert(
        "Debes iniciar sesión."
      )
    }

    if (!boardName.trim()) {
      return alert(
        "Introduce un nombre para la pizarra."
      )
    }

    await saveBoard({
      id: boardId,
      userId: user.uid,
      name: boardName,
      boardType,
      elements,
    })

    onBack()
  }

  const deleteSelected = () => {
    if (!selectedId) return

    setElements((prev) =>
      prev.filter(
        (el) => el.id !== selectedId
      )
    )

    setSelectedId(null)
  }

  const clearBoard = () => {
    setElements([])
    setSelectedId(null)
  }

  return (
    <Card>

      <BoardHeader
        boardId={boardId}
        boardName={boardName}
        setBoardName={setBoardName}
        boardType={boardType}
        setBoardType={setBoardType}
        onBack={onBack}
      />

      <div className="flex gap-6 items-start">

        <BoardToolbar
          tool={tool}
          onChange={setTool}
        />

        <div className="flex-1">

          <BoardStage
            boardType={boardType}
            tool={tool}
            elements={elements}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            setElements={setElements}
          />

        </div>

      </div>

      <BoardFooter
        boardId={boardId}
        selectedId={selectedId}
        onDeleteSelected={
          deleteSelected
        }
        onClear={clearBoard}
        onSave={handleSave}
      />

    </Card>
  )
}