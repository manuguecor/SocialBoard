import {
  forwardRef,
  TextareaHTMLAttributes,
} from "react"

import clsx from "clsx"

type TextAreaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className={clsx(
        "w-full rounded-xl",
        "border border-[var(--border)]",
        "bg-white",
        "px-4 py-3",
        "text-[var(--text)]",
        "placeholder:text-[var(--text-secondary)]",
        "transition",

        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-[var(--primary)]",
        "focus:border-[var(--primary)]",

        className
      )}
    />
  )
})

TextArea.displayName = "TextArea"

export default TextArea