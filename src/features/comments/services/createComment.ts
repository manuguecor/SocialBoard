import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore"

import { db } from "@/lib/firebase"

interface CreateCommentProps {
  postId: string
  userId: string
  content: string
  parentCommentId?: string | null
}

export async function createComment({
  postId,
  userId,
  content,
  parentCommentId
}: CreateCommentProps) {
  await addDoc(collection(db, "comments"), {
    postId,
    userId,
    content,
    parentCommentId: parentCommentId || null,
    createdAt: serverTimestamp(),
  })
}