"use client"

import { useEffect, useState } from "react"
import { getPosts } from "../services/getPosts"

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
    <div className="mt-6">
      {posts.map((post) => (
        <div key={post.id} className="border p-3 mb-2">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>{post.authorEmail}</small>
        </div>
      ))}
    </div>
  )
}