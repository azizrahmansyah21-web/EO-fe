import type { ReactNode } from "react";

interface FacilityItemProps {
  icon: ReactNode;
  name: string;
  description?: string;
  variant?: "card" | "list";
}

export function FacilityItem({ icon, name, description, variant = "list" }: FacilityItemProps) {
  if (variant === "card") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
        <div className="w-10 h-10 rounded-lg bg-red-50 text-toyota-red flex items-center justify-center shrink-0">
          {icon}
        </div>
        <p className="text-sm font-bold text-gray-900 leading-snug">{name}</p>
        {description && <p className="text-xs text-gray-500 leading-relaxed">{description}</p>}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3">
      <div className="w-8 h-8 rounded-lg bg-red-50 text-toyota-red flex items-center justify-center shrink-0">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-800">{name}</p>
    </div>
  );
}
