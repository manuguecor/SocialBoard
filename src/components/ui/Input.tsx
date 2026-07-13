"use client"

import {
  forwardRef,
  InputHTMLAttributes,
} from "react"

import clsx from "clsx"

type InputProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    error?: string
  }

const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      label,
      error,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">

        {label && (
          <label className="block text-sm font-medium mb-2">
            {label}
          </label>
        )}

        <input
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

            error &&
              "border-[var(--error)] focus:ring-[var(--error)] focus:border-[var(--error)]",

            className
          )}
        />

        {error && (
          <p className="mt-1 text-sm text-[var(--error)]">
            {error}
          </p>
        )}

      </div>
    )
  }
)

Input.displayName = "Input"

export default Input