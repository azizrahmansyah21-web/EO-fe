/**
 * StatusBadge: Atomic badge component for guest approval status.
 * Uses DESIGN.md semantic colors. No rounded-full (AGENTS.md antislop).
 */

interface StatusBadgeProps {
  status: "disetujui" | "menunggu" | "ditolak" | "hadir";
  size?: "sm" | "md";
}

const statusConfig = {
  disetujui: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    dot: "bg-emerald-500",
    label: "Disetujui",
  },
  menunggu: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    dot: "bg-amber-500",
    label: "Menunggu Approval",
  },
  ditolak: {
    bg: "bg-red-100",
    text: "text-red-800",
    dot: "bg-red-500",
    label: "Ditolak",
  },
  hadir: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    dot: "bg-blue-500",
    label: "Hadir",
  },
};

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg ${config.bg} ${config.text} ${textSize} font-medium whitespace-nowrap`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
