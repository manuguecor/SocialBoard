"use client"

import { useEffect, useState } from "react"

import Card from "@/components/ui/Card"

import { getPostById } from "../services/getPostById"

import CommentsSidebar from "./CommentsSidebar"
import Link from "next/link"
import Button from "@/components/ui/Button"
import { getBoardById } from "@/features/boards/services/getBoardById"
import BoardStage from "@/features/boards/components/BoardStage"
import { Post } from "../types/Post"
import { UserProfile } from "@/features/users/types/UserProfile"
import { getUserById } from "@/features/users/services/getUserById"

export default function PostDetail({
  postId,
}: {
  postId: string
}) {
  const [post, setPost] = useState<Post & {author: UserProfile | null} | null>(null)
  const [board, setBoard] = useState<any>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostById(postId)
      
      if (!data) return

      const author = await getUserById(data.authorId)

      setPost({
        ...data,
        author,
      })


      if (data?.boardId) {
          const boardData = await getBoardById(data.boardId)
          setBoard(boardData)
      }
    }

    fetchPost()
  }, [postId])

  if (!post) {
    return (
      <div className="text-center py-10">
        Cargando publicación...
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 gap-6">

      <div className="col-span-8">
        <Card>

            <div className="mb-6">
              <Link href="/posts">
                <Button variant="secondary">
                  ← Volver
                </Button>
              </Link>
            </div>

            <div className="mb-8">

              <div className="flex items-center gap-4 mb-6">

                <img
                  src={post.author?.avatar || "/avatars/avatar1.png"}
                  alt={post.author?.displayName}
                  className="w-14 h-14 rounded-full border object-cover"
                />

                <div>

                  <p className="font-semibold text-lg">
                    {post.author?.displayName || post.author?.username}
                  </p>

                  <p className="text-gray-500 text-sm">
                    @{post.author?.username}
                  </p>

                </div>

              </div>

              <h1 className="text-4xl font-bold mb-4">
                {post.title}
              </h1>

              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

            </div>

            <div className="mt-8">
              {board && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Pizarra táctica
                    </h2>

                    <div className="overflow-x-auto">
                      <BoardStage
                        boardType={board.boardType}
                        elements={board.elements}
                        tool="select"
                        selectedId={null}
                        setSelectedId={() => {}}
                        setElements={() => {}}
                        readOnly
                        width={650}
                        height={400}
                      />
                    </div>
                </div>
              )}
            </div>

        </Card>
      </div>

      <div className="col-span-4">
        <CommentsSidebar postId={postId} />
      </div>

    </div>
  )
}