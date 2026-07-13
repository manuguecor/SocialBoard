import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"

import { db } from "@/lib/firebase"
import { Comment } from "../types/Comment"

export async function getCommentsByPost(
  postId: string
) : Promise<Comment[]>{
  const q = query(
    collection(db, "comments"),
    where("postId", "==", postId),
    orderBy("createdAt", "desc")
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Comment, "id">),
  }))
}