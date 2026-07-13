import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function testFirestore() {
  try {
    await addDoc(collection(db, "test"), {
      name: "Hola TFM",
      createdAt: new Date(),
    })
    console.log("Documento creado")
  } catch (e) {
    console.error("Error:", e)
  }
}