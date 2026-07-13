import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

export async function logoutUser() {
  await signOut(auth)
}