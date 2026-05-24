import { InputHTMLAttributes } from "react"

export default function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`
        w-full
        border
        border-gray-300
        rounded-lg
        px-4
        py-2
        focus:outline-none
        focus:ring-2
        focus:ring-black
        ${className}
      `}
      {...props}
    />
  )
}