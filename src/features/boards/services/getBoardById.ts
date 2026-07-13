import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function getBoardById(id: string) {
  const docRef = doc(db, "boards", id)

  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) return null

  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}