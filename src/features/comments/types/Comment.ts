export interface Comment {
  id: string
  postId: string
  userId: string
  content: string
  parentCommentId: string | null
  createdAt: any
}