export const currency = (n: number, digits = 0) =>
  `£${n.toLocaleString("en-GB", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

export const compactCurrency = (n: number) => {
  if (Math.abs(n) >= 1_000_000) return `£${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `£${(n / 1_000).toFixed(1)}k`;
  return `£${n.toFixed(0)}`;
};

export const number = (n: number) => n.toLocaleString("en-GB");

export const percent = (n: number, digits = 1) => `${(n * 100).toFixed(digits)}%`;

export const signedPercent = (n: number) => `${n > 0 ? "▲" : "▼"} ${Math.abs(n).toFixed(1)}%`;

export const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });

export const monthLabel = (iso: string) =>
  new Date(`${iso}-01T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });

export const metricValue = (value: number, format: "ratio" | "currency" | "percent" | "number") => {
  if (format === "currency") return currency(value, 2);
  if (format === "percent") return `${value.toFixed(1)}%`;
  if (format === "ratio") return value.toFixed(3).replace(/0$/, "");
  return number(value);
};
