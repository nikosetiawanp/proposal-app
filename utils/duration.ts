export const formatDuration = (v: number, unit: "Day" | "Week" | "Month") => {
  if (!v) return "";
  return `${v} ${unit}${v === 1 ? "" : "s"}`;
};

export const parseDuration = (v: string): number => {
  const num = parseInt(v.replace(/\D/g, ""), 10);
  return isNaN(num) ? 0 : num;
};
