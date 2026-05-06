import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function saveBoard(data: any) {
  const docRef = await addDoc(collection(db, "boards"), {
    ...data,
    createdAt: new Date(),
  })

  return docRef.id
}