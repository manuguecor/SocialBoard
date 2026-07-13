import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "success" | "danger" | "outline" | "blue-team" | "red-team";
  fullWidth?: boolean;
  loading?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(
        "px-5 py-2.5 rounded-xl font-medium transition duration-200 shadow-sm",

        {
          "bg-green-700 hover:bg-green-800 text-white":
            variant === "primary",

          "bg-slate-800 hover:bg-slate-900 text-white":
            variant === "secondary",

          "bg-emerald-600 hover:bg-emerald-700 text-white":
            variant === "success",

          "bg-red-600 hover:bg-red-700 text-white":
            variant === "danger",

          "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50":
            variant === "outline",

          "bg-blue-600 hover:bg-blue-700 text-white":
            variant === "blue-team",

          "bg-red-500 hover:bg-red-700 text-white":
            variant === "red-team",

          "w-full": fullWidth,
        },

        className
      )}
    >
      {loading ? "Cargando..." : children}
    </button>
  );
}