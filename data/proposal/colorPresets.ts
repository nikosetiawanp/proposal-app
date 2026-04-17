type ColorPalette = {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

export const colorPresets: Record<
  "Light" | "Dark" | "Vibrant" | "Pastel" | "Muted",
  ColorPalette[]
> = {
  Light: [
    {
      backgroundColor: "#ffffff",
      textColor: "#111111",
      accentColor: "#2563eb",
    },
    {
      backgroundColor: "#f8fafc",
      textColor: "#0f172a",
      accentColor: "#7c3aed",
    },
    {
      backgroundColor: "#fefce8",
      textColor: "#1c1917",
      accentColor: "#ca8a04",
    },
    {
      backgroundColor: "#f0fdf4",
      textColor: "#052e16",
      accentColor: "#16a34a",
    },
    {
      backgroundColor: "#fdf2f8",
      textColor: "#500724",
      accentColor: "#db2777",
    },
    {
      backgroundColor: "#ecfeff",
      textColor: "#083344",
      accentColor: "#06b6d4",
    },
    {
      backgroundColor: "#fff7ed",
      textColor: "#431407",
      accentColor: "#ea580c",
    },
    {
      backgroundColor: "#f5f3ff",
      textColor: "#2e1065",
      accentColor: "#8b5cf6",
    },
    {
      backgroundColor: "#f9fafb",
      textColor: "#111827",
      accentColor: "#14b8a6",
    },
  ],

  Dark: [
    // --- SAME / CLOSE HUE (safe, cohesive) ---
    {
      backgroundColor: "#1e293b", // slate
      textColor: "#f1f5f9",
      accentColor: "#38bdf8", // blue
    },
    {
      backgroundColor: "#2b1f3a", // deep purple
      textColor: "#f5f3ff",
      accentColor: "#a855f7", // purple
    },
    {
      backgroundColor: "#1f3a2b", // dark green
      textColor: "#ecfdf5",
      accentColor: "#22c55e", // green
    },
    {
      backgroundColor: "#3a1f24", // muted red
      textColor: "#fef2f2",
      accentColor: "#ef4444", // red
    },

    // --- MIXED (balanced contrast) ---
    {
      backgroundColor: "#0f172a", // blue-black
      textColor: "#e2e8f0",
      accentColor: "#facc15", // yellow pop
    },
    {
      backgroundColor: "#14281d", // deep green
      textColor: "#ecfdf5",
      accentColor: "#60a5fa", // blue contrast
    },
    {
      backgroundColor: "#2a1e17", // brown
      textColor: "#fafaf9",
      accentColor: "#a78bfa", // violet contrast
    },

    // --- BOLD (intentionally different hue) ---
    {
      backgroundColor: "#1a1a2e", // navy
      textColor: "#f8fafc",
      accentColor: "#fb7185", // pink punch
    },
    {
      backgroundColor: "#121212", // neutral dark
      textColor: "#f5f5f5",
      accentColor: "#34d399", // mint contrast
    },
  ],

  Vibrant: [
    {
      backgroundColor: "#0f172a",
      textColor: "#f8fafc",
      accentColor: "#f43f5e",
    },
    {
      backgroundColor: "#111827",
      textColor: "#f9fafb",
      accentColor: "#22c55e",
    },
    {
      backgroundColor: "#1e293b",
      textColor: "#e2e8f0",
      accentColor: "#eab308",
    },
    {
      backgroundColor: "#020617",
      textColor: "#e0f2fe",
      accentColor: "#0ea5e9",
    },
    {
      backgroundColor: "#18181b",
      textColor: "#fafafa",
      accentColor: "#f97316",
    },
    {
      backgroundColor: "#0f172a",
      textColor: "#f1f5f9",
      accentColor: "#a855f7",
    },
    {
      backgroundColor: "#030712",
      textColor: "#f9fafb",
      accentColor: "#14b8a6",
    },
    {
      backgroundColor: "#111827",
      textColor: "#e5e7eb",
      accentColor: "#ef4444",
    },
    {
      backgroundColor: "#020617",
      textColor: "#f8fafc",
      accentColor: "#10b981",
    },
  ],

  Pastel: [
    {
      backgroundColor: "#fdf4ff",
      textColor: "#3b0764",
      accentColor: "#f0abfc",
    },
    {
      backgroundColor: "#f0f9ff",
      textColor: "#0c4a6e",
      accentColor: "#7dd3fc",
    },
    {
      backgroundColor: "#fef9c3",
      textColor: "#713f12",
      accentColor: "#fde047",
    },
    {
      backgroundColor: "#ecfccb",
      textColor: "#365314",
      accentColor: "#bef264",
    },
    {
      backgroundColor: "#ffe4e6",
      textColor: "#881337",
      accentColor: "#fda4af",
    },
    {
      backgroundColor: "#ccfbf1",
      textColor: "#134e4a",
      accentColor: "#5eead4",
    },
    {
      backgroundColor: "#ede9fe",
      textColor: "#3730a3",
      accentColor: "#c4b5fd",
    },
    {
      backgroundColor: "#fff7ed",
      textColor: "#7c2d12",
      accentColor: "#fdba74",
    },
    {
      backgroundColor: "#f1f5f9",
      textColor: "#334155",
      accentColor: "#94a3b8",
    },
  ],

  Muted: [
    {
      backgroundColor: "#f4f4f5",
      textColor: "#27272a",
      accentColor: "#71717a",
    },
    {
      backgroundColor: "#e5e7eb",
      textColor: "#1f2937",
      accentColor: "#6b7280",
    },
    {
      backgroundColor: "#f1f5f9",
      textColor: "#334155",
      accentColor: "#64748b",
    },
    {
      backgroundColor: "#fef3c7",
      textColor: "#78350f",
      accentColor: "#d97706",
    },
    {
      backgroundColor: "#e0f2fe",
      textColor: "#075985",
      accentColor: "#0284c7",
    },
    {
      backgroundColor: "#dcfce7",
      textColor: "#14532d",
      accentColor: "#16a34a",
    },
    {
      backgroundColor: "#fce7f3",
      textColor: "#831843",
      accentColor: "#be185d",
    },
    {
      backgroundColor: "#ede9fe",
      textColor: "#4c1d95",
      accentColor: "#7c3aed",
    },
    {
      backgroundColor: "#f3f4f6",
      textColor: "#111827",
      accentColor: "#9ca3af",
    },
  ],
};
