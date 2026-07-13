"use client"

import { useEffect, useState } from "react"
import { getPosts } from "../services/getPosts"
import Card from "@/components/ui/Card"
import Link from "next/link"
import Button from "@/components/ui/Button"
import { getUserById } from "@/features/users/services/getUserById"
import { Post } from "../types/Post"
import { UserProfile } from "@/features/users/types/UserProfile"

export default function PostList() {
  const [posts, setPosts] = useState<(Post & { author?: UserProfile | null })[]>([])

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const data = await getPosts()

    const posts = await Promise.all(
      data.map(async(post) => {
        const author = await getUserById(post.authorId)

        return {
          ...post,
          author,
        }
      })
    )
    setPosts(posts)
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <div className="flex items-start justify-between mb-5">

            <div className="flex items-center gap-3">

              <img
                src={post.author?.avatar || "/avatars/avatar1.png"}
                alt={post.author?.displayName}
                className="w-12 h-12 rounded-full border object-cover"
              />

              <div>

                <p className="font-semibold">
                  {post.author?.displayName || post.author?.username}
                </p>

                <p className="text-sm text-gray-500">
                  @{post.author?.username}
                </p>

              </div>

            </div>

            {post.boardId && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                ⚽ Pizarra táctica
              </span>
            )}

          </div>

          <h2 className="text-2xl font-bold mb-3">
            {post.title}
          </h2>

          <p className="text-gray-700 leading-relaxed line-clamp-3">
            {post.content}
          </p>

          <div className="mt-6 flex justify-end">
            <Link href={`/posts/${post.id}`}>
              <Button variant="primary">
                Ver publicación
              </Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  )
}