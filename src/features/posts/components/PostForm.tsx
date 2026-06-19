"use client"

import { useState } from "react"
import { createPost } from "../services/createPost"
import { useAuthStore } from "@/store/authStore"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Card from "@/components/ui/Card"
import TextArea from "@/components/ui/TextArea"

export default function PostForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const user = useAuthStore((state) => state.user)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return alert("Debes estar logueado")

    await createPost({
      title,
      content,
      authorId: user.uid,
      authorEmail: user.email,
    })

    setTitle("")
    setContent("")
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

        <Button fullWidth>
          Crear publicación
        </Button>
      </form>
    </Card>
  )
}