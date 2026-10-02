"use client";

import React from "react";

interface ScannerTemplateProps {
  header: React.ReactNode;
  isDesktopView: boolean;
  desktopView: React.ReactNode;
  mobileView: React.ReactNode;
}

/**
 * ScannerTemplate: Atomic Design Template for Multi-Mode Scanner
 * Defines layout structure, viewport containment, and responsive switching slots
 * without coupling to concrete database logic or guest verification states.
 */
export function ScannerTemplate({
  header,
  isDesktopView,
  desktopView,
  mobileView,
}: ScannerTemplateProps) {
  return (
    <div className="min-h-dvh flex flex-col bg-gray-50 overflow-hidden">
      {/* Universal Top Header Slot */}
      {header}

      {/* Main Viewport Content Slot: Switched based on layout mode */}
      <main className="flex-1 flex flex-col min-h-0 relative">
        {isDesktopView ? desktopView : mobileView}
      </main>
    </div>
  );
}
