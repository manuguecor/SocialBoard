import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function getBoards(userId: string) {
  const q = query(
    collection(db, "boards"),
    where("userId", "==", userId)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}