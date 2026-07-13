import { doc, updateDoc } from "firebase/firestore"

import { db } from "@/lib/firebase"

export async function updateUser(

    uid:string,

    data:any

){

    await updateDoc(

        doc(db,"users",uid),

        data

    )

}