"use client"

import { useEffect, useState } from "react"
import { createPost } from "../services/createPost"
import { useAuthStore } from "@/store/authStore"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Card from "@/components/ui/Card"
import TextArea from "@/components/ui/TextArea"
import { getBoards } from "@/features/boards/services/getBoards"
import { getUserById } from "@/features/users/services/getUserById"

type Props = {
  onCancel?: () => void
  onSuccess?: () => void
}

export default function PostForm({
  onCancel,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [boards, setBoards] = useState<any[]>([])
  const [boardId, setBoardId] = useState("")
  const user = useAuthStore((state) => state.user)
  

  useEffect(() => {
    if (!user) return

    const loadBoards = async () => {
      const data = await getBoards(user.uid)
      setBoards(data)
    }

    loadBoards()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return alert("Debes estar logueado")

    const profile = await getUserById(user.uid)

    if (!profile) return
    
    await createPost({
      title,
      content,
      authorId: user.uid,
      boardId: boardId || null,
    })

    setTitle("")
    setContent("")
    setBoardId("")

    onSuccess?.()
  }

  return (
    <Card>
      <h2 className="text-2xl font-semibold mb-6">
        Crear publicación
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextArea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium mb-2">
            Pizarra táctica (opcional)
          </label>

          <select
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            className="
              w-full
              rounded-xl
              border border-[var(--border)]
              bg-white
              px-4 py-3
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--primary)]
            "
          >
            <option value="">
              Ninguna
            </option>

            {boards.map((board) => (
              <option
                key={board.id}
                value={board.id}
              >
                {board.name}
              </option>
            ))}
          </select>
        </div>

        <Button>
          Crear publicación
        </Button>

        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </form>
    </Card>
  )
}