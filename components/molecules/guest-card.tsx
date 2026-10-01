import { Phone, MessageSquare, MoreVertical } from "lucide-react";
import { StatusBadge } from "@/components/atoms/status-badge";

/**
 * GuestCard: Card molecule for displaying a single guest/prospek entry.
 * Shows avatar initials, name, phone, optional vehicle interest, status badge.
 * Action icons: WhatsApp and kebab menu.
 */

interface GuestCardProps {
  name: string;
  phone: string;
  status: "disetujui" | "menunggu" | "ditolak" | "hadir";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function GuestCard({
  name,
  phone,
  status,
}: GuestCardProps) {
  const initials = getInitials(name);
  const isWaiting = status === "menunggu";

  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 transition-colors hover:border-gray-200">
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
          isWaiting
            ? "bg-amber-100 text-amber-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
          <StatusBadge status={status} />
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <p className="text-sm text-gray-500 truncate">{phone}</p>
        </div>

      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label={`Kirim pesan WhatsApp ke ${name}`}
        >
          <MessageSquare className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label={`Menu lainnya untuk ${name}`}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
