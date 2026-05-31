import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"

import { db } from "@/lib/firebase"

export async function getCommentsByPost(
  postId: string
) {
  const q = query(
    collection(db, "comments"),
    where("postId", "==", postId),
    orderBy("createdAt", "desc")
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}