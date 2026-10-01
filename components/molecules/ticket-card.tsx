"use client";

import { QRCodeSVG } from "qrcode.react";
import { Badge } from "@/components/atoms/badge";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface TicketCardProps {
  guestName: string;
  tokenId: string;
  pax: number;
}

export function TicketCard({ guestName, tokenId, pax }: TicketCardProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(tokenId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {/* Toyota logo placeholder */}
          <div className="w-8 h-8 bg-toyota-red rounded flex items-center justify-center shrink-0">
            <span className="text-white text-[8px] font-black">AT</span>
          </div>
          <div>
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">AGUNG</p>
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">TOYOTA</p>
          </div>
        </div>
        <Badge label="● VERIFIED GUEST PASS" variant="red" />
      </div>

      {/* QR Section */}
      <div className="flex flex-col items-center px-6 py-6 gap-3">
        <Badge label={`Confirmed • ${pax} Pax`} variant="green" />

        <p className="text-xl font-black text-gray-900 text-center leading-snug">{guestName}</p>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-mono tracking-wider">ID: {tokenId}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-toyota-red font-bold hover:opacity-70 transition-opacity"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "DISALIN" : "SALIN"}
          </button>
        </div>

        {/* QR Code */}
        <div className="p-4 bg-white border-2 border-gray-100 rounded-lg mt-1">
          <QRCodeSVG
            value={tokenId}
            size={200}
            level="M"
            includeMargin={false}
          />
        </div>

        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          SCAN GATE VALIDATOR ACTIVE
        </p>
      </div>
    </div>
  );
}
