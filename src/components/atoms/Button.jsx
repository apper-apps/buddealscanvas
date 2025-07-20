import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default",
  children, 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] shadow-lg";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:brightness-110",
    secondary: "bg-gradient-to-r from-accent/10 to-accent/20 text-accent border border-accent/30 hover:bg-gradient-to-r hover:from-accent/20 hover:to-accent/30",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-gray-600 hover:bg-gray-100"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;