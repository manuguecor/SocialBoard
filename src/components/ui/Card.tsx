import { HTMLAttributes } from "react";
import clsx from "clsx";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: "none" | "sm" | "md" | "lg";
};

export default function Card({
  children,
  className,
  padding = "md",
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={clsx(
        "bg-white",
        "border border-gray-200",
        "rounded-2xl",
        "shadow-sm",

        {
          "p-0": padding === "none",
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",
        },

        className
      )}
    >
      {children}
    </div>
  );
}