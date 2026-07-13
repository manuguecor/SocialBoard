import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function createPost(data: any) {
  const docRef = await addDoc(collection(db, "posts"), {
    ...data,
    createdAt: new Date(),
  })

  return docRef.id
}