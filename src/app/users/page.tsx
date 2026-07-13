"use client"

import { useEffect, useState } from "react"

import { useAuthStore } from "@/store/authStore"

import { getUserById } from "@/features/users/services/getUserById"

import EditUserForm from "@/features/users/components/EditUserForm"
import UserCard from "@/features/users/components/UserCard"

export default function UserPage(){

    const authUser = useAuthStore(state=>state.user)

    const [user,setUser]=useState<any>(null)

    const [editing, setEditing] = useState(false)

    useEffect(()=>{

        if(!authUser) return

        load()

    },[authUser])

    async function load(){

        const data=await getUserById(authUser!.uid)

        setUser(data)
    }

    if(!user) return null

    return editing ? (

        <EditUserForm
            user={user}
            onCancel={() => setEditing(false)}
            onSuccess={async () => {
                const data = await getUserById(authUser.uid)
                setUser(data)
                setEditing(false)
            }}
        />
    ) : (

        <UserCard
            user={user}
            onEdit={() => setEditing(true)}
        />
    )

}