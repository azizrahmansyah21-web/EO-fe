import { cn } from "@/lib/utils";

type BadgeVariant = "red" | "green" | "gray" | "blue" | "amber";

const variants: Record<BadgeVariant, string> = {
  red: "bg-red-100 text-toyota-red border-red-200",
  green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  gray: "bg-gray-100 text-gray-600 border-gray-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  amber: "bg-amber-100 text-amber-700 border-amber-200",
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

export function Badge({ label, variant = "gray", dot, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            variant === "green" && "bg-emerald-500",
            variant === "red" && "bg-toyota-red",
            variant === "gray" && "bg-gray-400",
            variant === "blue" && "bg-blue-500",
            variant === "amber" && "bg-amber-500"
          )}
        />
      )}
      {label}
    </span>
  );
}
