"use client"

import { useEffect, useState } from "react"
import { getPosts } from "../services/getPosts"
import Card from "@/components/ui/Card"

export default function PostList() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const data = await getPosts()
    setPosts(data)
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <div className="flex items-start justify-between mb-3">
            
            <div>
              <h2 className="text-xl font-semibold">
                {post.title}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {post.authorEmail}
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed line-clamp-3">
            {post.content}
          </p>

          <div className="mt-5 flex justify-end">
            <button
              className="text-sm font-medium text-black hover:underline"
            >
              Ver publicación
            </button>
          </div>
        </Card>
      ))}
    </div>
  )
}