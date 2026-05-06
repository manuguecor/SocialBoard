"use client"

import { useState } from "react"
import { createPost } from "../services/createPost"
import { useAuthStore } from "@/store/authStore"

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
      />

      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2"
      />

      <button className="bg-black text-white p-2">
        Crear publicación
      </button>
    </form>
  )
}