"use client"

import { useEffect, useState } from "react"

import Card from "@/components/ui/Card"

import { getPostById } from "../services/getPostById"

import CommentsSidebar from "./CommentsSidebar"
import Link from "next/link"
import Button from "@/components/ui/Button"
import { getBoardById } from "@/features/boards/services/getBoardById"
import BoardStage from "@/features/boards/components/BoardStage"

export default function PostDetail({
  postId,
}: {
  postId: string
}) {
  const [post, setPost] = useState<any>(null)
  const [board, setBoard] = useState<any>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostById(postId)
      setPost(data)

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

            <Link href={`/posts`}>
                <Button variant="secondary">
                ← Volver
                </Button>
            </Link>

            <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">
                {post.authorEmail}
            </p>

            <h1 className="text-4xl font-bold mb-4">
                {post.title}
            </h1>

            <p className="text-gray-700 leading-relaxed">
                {post.content}
            </p>
            </div>

            <div className="mt-8">
              {board && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Pizarra táctica
                    </h2>

                    <BoardStage
                        boardType={board.boardType}
                        elements={board.elements}
                        tool="select"
                        selectedId={null}
                        setSelectedId={() => {}}
                        setElements={() => {}}
                        readOnly
                    />
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