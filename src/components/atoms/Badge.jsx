import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-br from-primary to-secondary text-white",
    secondary: "bg-secondary/20 text-secondary border border-secondary/30",
    accent: "bg-gradient-to-br from-accent to-accent/80 text-white",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium shadow-sm",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;