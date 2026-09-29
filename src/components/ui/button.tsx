import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variantClasses = {
      default: "bg-[#c8202b] text-white hover:bg-[#b01b24] shadow-md",
      primary: "bg-[#c8202b] text-white hover:bg-[#b01b24] shadow-md",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      outline: "border border-white/20 bg-black/20 text-white hover:bg-black/40 backdrop-blur-md",
      secondary: "bg-gray-800 text-white hover:bg-gray-700",
      ghost: "text-gray-300 hover:bg-white/10 hover:text-white",
      link: "text-[#c8202b] underline-offset-4 hover:underline",
    };

    const sizeClasses = {
      default: "h-11 px-5 py-2",
      sm: "h-9 px-3 text-xs",
      lg: "h-12 px-7 text-base",
      icon: "h-10 w-10 p-0 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
