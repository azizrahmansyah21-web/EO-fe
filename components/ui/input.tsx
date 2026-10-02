import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full h-12 ${
              icon ? "pl-10" : "px-3.5"
            } pr-3.5 rounded-lg border text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-toyota-red transition-all ${
              error
                ? "border-red-500 bg-red-50/50 focus:ring-red-500"
                : "border-gray-300 focus:border-toyota-red"
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-toyota-red font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
