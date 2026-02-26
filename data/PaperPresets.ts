"use client";

import { PaperPreset, PaperSize } from "@/types/proposal";

export const PAPER_PRESETS: Record<PaperPreset, PaperSize> = {
  letter: { width: 612, height: 792 },
  a4: { width: 595, height: 842 },
};
