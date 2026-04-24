"use client"
import { testFirestore } from "@/lib/testFirestore"
export default function Home() {
  const handleClick = async () => {
    await testFirestore()
  }

  return (
    <div className="p-4">
      <h1>Test Firebase</h1>
      <button
        onClick={handleClick}
        className="bg-black text-white p-2 mt-4">
        Probar Firestore
      </button>
    </div>
  )
}
