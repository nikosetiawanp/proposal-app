export const formatCurrency = (v: string, locale = "en-US", currency = "USD") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(v || 0));

export const parseCurrency = (v: string) => v.replace(/\D/g, "");
