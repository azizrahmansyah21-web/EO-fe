export interface ScanFeedItem {
  id: string;
  name: string;
  initials: string;
  subtitle: string;
  timestamp: string;
  badge?: string;
  badgeVariant?: "green" | "red" | "gray";
}

interface RecentScanItemProps {
  item: ScanFeedItem;
}

export function RecentScanItem({ item }: RecentScanItemProps) {
  const badgeColors = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red: "bg-red-50 text-toyota-red border-red-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center shrink-0">
          {item.initials}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-gray-900 truncate leading-tight">{item.name}</p>
          <p className="text-[11px] text-gray-400 truncate mt-0.5">{item.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-3">
        {item.badge && (
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
              badgeColors[item.badgeVariant || "green"]
            }`}
          >
            {item.badge}
          </span>
        )}
        <span className="text-[11px] font-mono text-gray-400">{item.timestamp}</span>
      </div>
    </div>
  );
}
