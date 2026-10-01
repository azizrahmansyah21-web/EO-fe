import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  subValue?: string;
  className?: string;
}

export function InfoRow({ icon, label, value, subValue, className }: InfoRowProps) {
  return (
    <div className={cn("flex items-start gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3", className)}>
      <div className="text-toyota-red shrink-0 mt-0.5">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-sm font-bold text-gray-900">{value}</p>
        {subValue && <p className="text-xs text-gray-500 mt-0.5">{subValue}</p>}
      </div>
    </div>
  );
}
