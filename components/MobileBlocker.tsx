"use client";

import { Monitor } from "lucide-react";

export function MobileBlocker() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
        <Monitor className="h-7 w-7 text-white/40" />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white/80">
          Desktop only
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-white/35">
          The workspace requires a larger screen. Please open this page on a
          desktop or tablet.
        </p>
      </div>
    </div>
  );
}
