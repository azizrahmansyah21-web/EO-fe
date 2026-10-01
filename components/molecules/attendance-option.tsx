"use client";

import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import type { ReactNode } from "react";

interface AttendanceOptionProps {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
  badge?: { label: string; variant?: "green" | "gray" };
  extra?: ReactNode;
}

export function AttendanceOption({
  selected,
  onSelect,
  title,
  description,
  badge,
  extra,
}: AttendanceOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-lg border-2 p-4 transition-all ${
        selected
          ? "border-toyota-red bg-red-50/50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Radio indicator */}
        <div
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
            selected ? "border-toyota-red" : "border-gray-300"
          }`}
        >
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-toyota-red" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-base font-bold ${selected ? "text-gray-900" : "text-gray-500"}`}>
              {title}
            </span>
            {badge && (
              <Badge label={badge.label} variant={badge.variant ?? "gray"} />
            )}
          </div>
          <p className={`text-sm leading-relaxed ${selected ? "text-gray-600" : "text-gray-400"}`}>
            {description}
          </p>
          {selected && extra && <div className="mt-3">{extra}</div>}
        </div>
      </div>
    </button>
  );
}
