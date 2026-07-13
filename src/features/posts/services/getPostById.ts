import {doc, getDoc} from "firebase/firestore"

import { db } from "@/lib/firebase"

export async function getPostById(id: string) {
  const docRef = doc(db, "posts", id)

  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as any),
  }
}