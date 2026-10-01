import Image from "next/image";

export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeConfig: Record<
  LogoSize,
  {
    full: { width: number; height: number; className: string };
    emblem: { width: number; height: number; className: string };
  }
> = {
  xs: {
    full: { width: 68, height: 22, className: "h-5 w-auto" },
    emblem: { width: 30, height: 22, className: "h-5 w-auto" },
  },
  sm: {
    full: { width: 86, height: 28, className: "h-7 w-auto" },
    emblem: { width: 38, height: 28, className: "h-7 w-auto" },
  },
  md: {
    full: { width: 117, height: 38, className: "h-9 w-auto" },
    emblem: { width: 52, height: 38, className: "h-9 w-auto" },
  },
  lg: {
    full: { width: 148, height: 48, className: "h-12 w-auto" },
    emblem: { width: 66, height: 48, className: "h-12 w-auto" },
  },
  xl: {
    full: { width: 197, height: 64, className: "h-16 w-auto" },
    emblem: { width: 88, height: 64, className: "h-16 w-auto" },
  },
};

export interface ToyotaLogoProps {
  size?: LogoSize;
  /** Force white version for dark or red backgrounds */
  inverted?: boolean;
  /** When true, renders only the Toyota mark & wordmark without "LET'S GO BEYOND" */
  noTagline?: boolean;
  className?: string;
  priority?: boolean;
}

export function ToyotaLogo({
  size = "sm",
  inverted = false,
  noTagline = false,
  className = "",
  priority = false,
}: ToyotaLogoProps) {
  const cfg = sizeConfig[size] || sizeConfig.sm;
  const target = noTagline ? cfg.emblem : cfg.full;
  const src = noTagline ? "/toyota-emblem.png" : "/toyota-logo.png";
  const alt = noTagline ? "Toyota" : "Toyota - Let's Go Beyond";

  return (
    <div className={`inline-flex items-center shrink-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={target.width}
        height={target.height}
        priority={priority || size === "md" || size === "lg"}
        className={`${target.className} object-contain`}
        style={inverted ? { filter: "brightness(0) invert(1)" } : undefined}
      />
    </div>
  );
}
