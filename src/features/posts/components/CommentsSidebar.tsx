"use client"

import { useEffect, useState } from "react"

import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

import { useAuthStore } from "@/store/authStore"

import { createComment } from "@/features/comments/services/createComment"

import { getCommentsByPost } from "@/features/comments/services/getCommentsByPost"
import Link from "next/link"
import { getUserById } from "@/features/users/services/getUserById"
import { UserProfile } from "@/features/users/types/UserProfile"
import { Comment } from "@/features/comments/types/Comment"

export default function CommentsSidebar({
  postId,
}: {
  postId: string
}) {
  const [comments, setComments] = useState<(Comment & { author: UserProfile | null })[]>([])
  const [content, setContent] = useState("")

  const [replyingTo, setReplyingTo] =
    useState<string | null>(null)

  const user = useAuthStore(
    (state) => state.user
  )

  const loadComments = async () => {
    const data = await getCommentsByPost(postId)

    const comments = await Promise.all(
      data.map(async (comment) => {
        const author = await getUserById(comment.userId)

        return {
          ...comment,
          author,
        }
      })
    )

    setComments(comments)
  }

  useEffect(() => {
    loadComments()
  }, [postId])

  const handleComment = async (
    parentCommentId: string | null = null
  ) => {
    if (!user || !content) return

    const profile = await getUserById(user.uid)

    if(!profile) return
 
    await createComment({
      postId,
      userId: user.uid,
      content,
      parentCommentId,
    })

    setContent("")

    setReplyingTo(null)

    loadComments()
  }

  const mainComments = comments.filter(
    (comment) => !comment.parentCommentId
  )

  return (
    <Card>

      <h2 className="text-xl font-semibold mb-6">
        Comentarios
      </h2>

      <div className="space-y-6 mb-6">

        {mainComments.map((comment) => {

          const replies = comments.filter(
            (reply) =>
              reply.parentCommentId ===
              comment.id
          )

          return (
            <div key={comment.id} className="border-b pb-5">

              <div className="flex items-start gap-3">

                <img
                  src={comment.author?.avatar || "/avatars/avatar1.png"}
                  alt={comment.author?.displayName}
                  className="w-10 h-10 rounded-full border object-cover"
                />

                <div className="flex-1">

                  <p className="font-semibold">
                    {comment.author?.displayName || comment.author?.username}
                  </p>

                  <p className="text-sm text-gray-500">
                    @{comment.author?.username}
                  </p>

                  <p className="text-gray-700 mt-2">
                    {comment.content}
                  </p>

                </div>

              </div>

              {user && (
                <Button
                  onClick={() => setReplyingTo(comment.id)}
                  variant="secondary"
                >
                  Responder
                </Button>
              )}

              {replyingTo === comment.id && (
                <div className="mt-3 space-y-2">
                  <Input placeholder="Escribe una respuesta..." value={content} onChange={(e: any) => setContent(e.target.value)}/>

                  <Button fullWidth onClick={() => handleComment(comment.id)}>
                    Publicar respuesta
                  </Button>
                </div>
              )}

              <div className="ml-6 mt-4 space-y-4">

                {replies.map((reply) => (
                  <div key={reply.id} className="border-lborder-gray-200 pl-4 text-sm">
                    <p className="font-medium">
                      {reply.author?.username}
                    </p>

                    <p className="text-gray-600 mt-1">
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

      </div>

      {!replyingTo && (
        user ? (

          <div className="space-y-3">

            <Input
              placeholder="Escribe un comentario..."
              value={content}
              onChange={(e: any) =>
                setContent(e.target.value)
              }
            />

            <Button
              fullWidth
              onClick={() => handleComment()}
            >
              Publicar comentario
            </Button>

          </div>

        ) : (

          <Card className="bg-gray-50 border-dashed">

            <p className="text-sm text-gray-500 mb-3">
              Debes iniciar sesión para comentar.
            </p>

            <Link href="/login">
              <Button fullWidth>
                Iniciar sesión
              </Button>
            </Link>

          </Card>

        )

      )}

    </Card>
  )
}