import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"

export async function registerUser(email: string, password: string) {

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  const user = userCredential.user

  await setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    email: user.email,
    username: email.split("@")[0],
    role: "user",
    createdAt: new Date(),
  })

  return user
}