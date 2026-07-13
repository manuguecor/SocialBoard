"use client"

import { useState } from "react"

import Button from "@/components/ui/Button"
import PageHeader from "@/components/ui/PageHeader"

import PostForm from "./PostForm"
import PostList from "./PostList"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

export default function PostView() {
  const [creating, setCreating] = useState(false)
  const user = useAuthStore((state) => state.user)
  const router = useRouter()
  const [reload, setReload] = useState(0)

  return (
    <div className="max-w-4xl mx-auto">

      <div className="flex items-center justify-between mb-8">
        <PageHeader
          title="Publicaciones"
          description="Crea tus propias publicaciones o interactúa con las de la comunidad."
        />

        <Button
          onClick={() => {
            if (!user) {
            router.push("/login")
            return
            }

            setCreating(!creating)
        }}
        >
          {creating
            ? "Cerrar"
            : "+ Nueva publicación"}
        </Button>
      </div>

      {creating && (
        <div className="mb-8">
          <PostForm
            onCancel={() => setCreating(false)}
            onSuccess={() => {
              setCreating(false)
              setReload((r) => r + 1)
            }}
          />
        </div>
      )}

      <PostList key={reload}/>
    </div>
  )
}