import { collection, addDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function saveBoard(data: any) {

  if(data.id) {

    await updateDoc(
      doc(db, "boards", data.id),
      {
        name: data.name,
        boardType: data.boardType,
        elements: data.elements,
      }
    )

    return data.id
  }

  const docRef = await addDoc(
    collection(db, "boards"), 
    {
      userId: data.userId,
      name: data.name,
      boardType: data.boardType,
      elements: data.elements,
      createdAt: new Date(),
    }
  )

  return docRef.id
}