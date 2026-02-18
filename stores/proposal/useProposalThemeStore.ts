import { create } from "zustand";

export const useProposalThemeStore = create((set) => ({
  headingFont: "Inter",
  bodyFont: "Inter",
  accentColor: "#ea580c",

  setHeadingFont: (font: string) => set({ headingFont: font }),
  setBodyFont: (font: string) => set({ bodyFont: font }),
  setAccentColor: (newAccentColor: string) =>
    set({ accentColor: newAccentColor }),
}));
