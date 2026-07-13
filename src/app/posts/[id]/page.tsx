import PostDetail from "@/features/posts/components/PostDetail"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function PostDetailPage({
  params,
}: Props) {
  const { id } = await params

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <PostDetail postId={id} />
    </div>
  )
}