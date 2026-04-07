"use client";

import { PaperPreset, PaperSize } from "@/types/proposal";

export const PAPER_PRESETS: Record<PaperPreset, PaperSize> = {
  Letter: { width: 612, height: 792 },
  A4: { width: 595, height: 842 },
};
