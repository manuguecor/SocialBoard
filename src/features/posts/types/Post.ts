export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  boardId: string | null
  createdAt: any
}