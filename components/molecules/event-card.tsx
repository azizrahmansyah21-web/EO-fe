import Image from "next/image";
import { Badge } from "@/components/atoms/badge";

interface EventCardProps {
  name: string;
  subtitle?: string;
  imageUrl: string;
}

export function EventCard({ name, subtitle, imageUrl }: EventCardProps) {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
      </div>

      {/* Verified badge */}
      <div className="absolute top-3 left-3">
        <Badge label="Undangan Terverifikasi" variant="green" dot />
      </div>

      {/* Event name overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
        {subtitle && (
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-0.5">
            {subtitle}
          </p>
        )}
        <p className="text-sm font-bold text-white leading-snug">{name}</p>
      </div>
    </div>
  );
}
