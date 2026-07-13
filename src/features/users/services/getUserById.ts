import { doc, getDoc } from "firebase/firestore"

import { db } from "@/lib/firebase"
import { UserProfile } from "../types/UserProfile"


export async function getUserById(uid:string): Promise<UserProfile | null>{

    const ref = doc(db,"users",uid)

    const snapshot = await getDoc(ref)

    if(!snapshot.exists()) return null

    return {

        id:snapshot.id,

        ...(snapshot.data() as Omit<UserProfile, "id">)

    }

}