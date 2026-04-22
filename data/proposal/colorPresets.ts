type ColorPalette = {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

export const colorPresets: Record<string, ColorPalette[]> = {
  Light: [
    {
      backgroundColor: "#f9f9f9",
      textColor: "#0b2447",
      accentColor: "#a91a2d", // blue
    },
    {
      backgroundColor: "#f8fafc",
      textColor: "#0f172a",
      accentColor: "#7c3aed", // violet
    },
    {
      backgroundColor: "#f9fafb",
      textColor: "#111827",
      accentColor: "#14b8a6", // teal
    },
    {
      backgroundColor: "#fefefe",
      textColor: "#1c1917",
      accentColor: "#ea580c", // orange
    },

    {
      backgroundColor: "#fbf5f3",
      textColor: "#000022",
      accentColor: "#e28413",
    },
    {
      backgroundColor: "#f1f8f7",
      textColor: "#70132d",
      accentColor: "#c41d5e",
    },
    {
      backgroundColor: "#fcfdfa",
      textColor: "#38194b",
      accentColor: "#ec2e55",
    },
  ],

  Dark: [
    {
      backgroundColor: "#0f172a",
      textColor: "#f8fafc",
      accentColor: "#38bdf8",
    },
    {
      backgroundColor: "#121212",
      textColor: "#f5f5f5",
      accentColor: "#22c55e",
    },
    {
      backgroundColor: "#1a1a2e",
      textColor: "#f8fafc",
      accentColor: "#f43f5e",
    },
    {
      backgroundColor: "#181e25",
      textColor: "#fdf9fa",
      accentColor: "#d43736",
    },
    {
      backgroundColor: "#000a12",
      textColor: "#cccbaf",
      accentColor: "#e86548",
    },
    {
      backgroundColor: "#1f2426",
      textColor: "#6697e4",
      accentColor: "#d0a875", // pink
    },
  ],

  Vibrant: [
    {
      backgroundColor: "#20493c",
      textColor: "#ffffff",
      accentColor: "#6ac6ac",
    },
    {
      backgroundColor: "#25569b",
      textColor: "#e8dfce",
      accentColor: "#e8dfce",
    },
    {
      backgroundColor: "#2c286f",
      textColor: "#fcfafa",
      accentColor: "#f72e82",
    },
  ],

  Mono: [
    {
      backgroundColor: "#f4f4f5",
      textColor: "#18181b",
      accentColor: "#52525b",
    },
    {
      backgroundColor: "#e5e7eb",
      textColor: "#111827",
      accentColor: "#6b7280",
    },
    {
      backgroundColor: "#27272a",
      textColor: "#fafafa",
      accentColor: "#a1a1aa",
    },
    {
      backgroundColor: "#F4F4EA",
      textColor: "#282828",
      accentColor: "#282828",
    },
  ],

  Soft: [
    {
      backgroundColor: "#f6f7eb",
      textColor: "#393e41",
      accentColor: "#e94f37",
    },
    {
      backgroundColor: "#f0f9ff",
      textColor: "#0c4a6e",
      accentColor: "#7dd3fc",
    },
    {
      backgroundColor: "#f0f9ff",
      textColor: "#0c4a6e",
      accentColor: "#7dd3fc",
    },
  ],
};
