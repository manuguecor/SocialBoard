import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function getPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}