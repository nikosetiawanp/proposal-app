export type PaperSize = {
  width: number | string;
  height: number | string;
};

export type PaperPreset = "letter" | "a4";

export const PAPER_PRESETS: Record<PaperPreset, PaperSize> = {
  letter: { width: 612, height: 792 },
  a4: { width: 595, height: 842 },
};
