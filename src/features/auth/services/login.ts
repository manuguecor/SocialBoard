import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"

export async function loginUser(email: string, password: string) {

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  )

  return userCredential.user
}