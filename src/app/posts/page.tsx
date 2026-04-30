import PostForm from "@/features/posts/components/PostForm"
import PostList from "@/features/posts/components/PostList"

export default function PostsPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-xl mb-4">Publicaciones</h1>

      <PostForm />
      <PostList />
    </div>
  )
}