import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
}

export default function Card({ children }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
      {children}
    </div>
  )
}