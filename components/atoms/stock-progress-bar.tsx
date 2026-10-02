interface StockProgressBarProps {
  label: string;
  subLabel?: string;
  current: number;
  total: number;
  unit?: string;
  badgeText?: string;
  badgeVariant?: "red" | "green" | "gray";
  showPercent?: boolean;
  className?: string;
}

export function StockProgressBar({
  label,
  subLabel,
  current,
  total,
  unit = "",
  badgeText,
  badgeVariant = "red",
  showPercent = true,
  className = "",
}: StockProgressBarProps) {
  const percent = total > 0 ? Math.min(100, Math.round((current / total) * 1000) / 10) : 0;

  const badgeColors = {
    red: "bg-red-50 text-toyota-red border-red-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
            {label}
          </p>
          {subLabel && (
            <p className="text-sm font-bold text-gray-900 mt-1 leading-tight">{subLabel}</p>
          )}
        </div>
        {badgeText && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold border ${badgeColors[badgeVariant]}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Main Count Metric */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-black text-gray-900">{current}</span>
        <span className="text-sm font-semibold text-gray-400">
          / {total} {unit}
        </span>
        {showPercent && (
          <span className="ml-auto text-xs font-bold text-gray-500">{percent}%</span>
        )}
      </div>

      {/* Progress Track */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-toyota-red transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
