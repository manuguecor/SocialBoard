"use client"

import { useEffect, useState } from "react"

import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

import { useAuthStore } from "@/store/authStore"

import { createComment } from "@/features/comments/services/createComment"

import { getCommentsByPost } from "@/features/comments/services/getCommentsByPost"

export default function CommentsSidebar({
  postId,
}: {
  postId: string
}) {
  const [comments, setComments] = useState<any[]>([])
  const [content, setContent] = useState("")

  const [replyingTo, setReplyingTo] =
    useState<string | null>(null)

  const user = useAuthStore(
    (state) => state.user
  )

  const loadComments = async () => {
    const data =
      await getCommentsByPost(postId)

    setComments(data)
  }

  useEffect(() => {
    loadComments()
  }, [postId])

  const handleComment = async (
    parentCommentId: string | null = null
  ) => {
    if (!user || !content) return

    await createComment({
      postId,
      userId: user.uid,
      username:
        user.displayName ||
        user.email ||
        "Usuario",
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

              <p className="font-medium">
                {comment.username}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {comment.content}
              </p>

              <Button onClick={() => setReplyingTo(comment.id)} variant="secondary">
                Responder
              </Button>

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
                      {reply.username}
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
        <div className="space-y-3">

          <Input placeholder="Escribe un comentario..." value={content} onChange={(e: any) => setContent(e.target.value)}/>

          <Button fullWidth onClick={() => handleComment()}>
            Publicar comentario
          </Button>

        </div>
      )}

    </Card>
  )
}