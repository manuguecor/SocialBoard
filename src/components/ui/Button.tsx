import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        bg-black
        text-white
        px-4
        py-2
        rounded-lg
        hover:opacity-90
        transition
        disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}