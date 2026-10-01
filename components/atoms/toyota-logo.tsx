/**
 * Toyota Logo atom — SVG inline, no external file dependency.
 * Renders the Toyota ellipse mark + wordmark + "LET'S GO BEYOND" tagline.
 * Use `size` to control the em height of the mark (default "sm").
 */

type LogoSize = "xs" | "sm" | "md" | "lg";

const sizes: Record<LogoSize, { mark: number; toyota: string; tagline: string }> = {
  xs: { mark: 24, toyota: "text-[8px]",  tagline: "text-[5px]"  },
  sm: { mark: 32, toyota: "text-[10px]", tagline: "text-[6px]"  },
  md: { mark: 40, toyota: "text-xs",     tagline: "text-[7px]"  },
  lg: { mark: 56, toyota: "text-sm",     tagline: "text-[9px]"  },
};

interface ToyotaLogoProps {
  size?: LogoSize;
  /** Force white version (e.g. on dark/red backgrounds) */
  inverted?: boolean;
  /** Hide "LET'S GO BEYOND" tagline */
  noTagline?: boolean;
  className?: string;
}

export function ToyotaLogo({
  size = "sm",
  inverted = false,
  noTagline = false,
  className = "",
}: ToyotaLogoProps) {
  const cfg = sizes[size];
  const color = inverted ? "#FFFFFF" : "#111827";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Toyota ellipse SVG mark */}
      <svg
        width={cfg.mark}
        height={cfg.mark * 0.66}
        viewBox="0 0 100 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer horizontal ellipse */}
        <ellipse cx="50" cy="33" rx="49" ry="32" stroke={color} strokeWidth="4" fill="none"/>
        {/* Inner vertical ellipse */}
        <ellipse cx="50" cy="33" rx="20" ry="30" stroke={color} strokeWidth="4" fill="none"/>
        {/* Horizontal bar */}
        <line x1="1" y1="20" x2="99" y2="20" stroke={color} strokeWidth="4"/>
      </svg>

      {/* Text block */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-widest uppercase ${cfg.toyota}`}
          style={{ color }}
        >
          TOYOTA
        </span>
        {!noTagline && (
          <span
            className={`font-bold tracking-wider uppercase ${cfg.tagline}`}
            style={{ color: inverted ? "rgba(255,255,255,0.7)" : "#6B7280" }}
          >
            LET&apos;S GO BEYOND
          </span>
        )}
      </div>
    </div>
  );
}
