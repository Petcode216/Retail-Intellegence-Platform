/**
 * Deterministic mock dataset resembling the UCI Online Retail dataset.
 * This module is the ONLY place mock values live. UI components never
 * hard-code ML results — they read through src/lib/api.ts.
 */

import type {
  BusinessInsight,
  ChurnPrediction,
  ClvPrediction,
  CountryRevenue,
  Customer,
  CustomerDetail,
  CustomerSegment,
  Forecast,
  KpiSummary,
  MLModel,
  Product,
  ProductDetail,
  ProductRecommendation,
  RiskDistribution,
  RiskLevel,
  SalesPoint,
  SegmentName,
} from "./types";

/* ---------- deterministic PRNG ---------- */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20260929);
const between = (min: number, max: number) => min + rnd() * (max - min);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rnd() * arr.length)]!;
const round2 = (n: number) => Math.round(n * 100) / 100;

export const ANCHOR_DATE = new Date("2026-09-28T00:00:00Z");
const dayMs = 86_400_000;
const isoDay = (offsetDays: number) =>
  new Date(ANCHOR_DATE.getTime() + offsetDays * dayMs).toISOString().slice(0, 10);

/* ---------- reference data ---------- */
export const COUNTRIES: { country: string; code: string; weight: number }[] = [
  { country: "United Kingdom", code: "UK", weight: 0.41 },
  { country: "Germany", code: "DE", weight: 0.16 },
  { country: "France", code: "FR", weight: 0.12 },
  { country: "Netherlands", code: "NL", weight: 0.09 },
  { country: "EIRE", code: "IE", weight: 0.08 },
  { country: "Spain", code: "ES", weight: 0.06 },
  { country: "Australia", code: "AU", weight: 0.05 },
  { country: "Portugal", code: "PT", weight: 0.03 },
];

export const SEGMENT_DEFS: {
  name: SegmentName;
  description: string;
  color: string;
  share: number;
  recency: [number, number];
  frequency: [number, number];
  monetary: [number, number];
  churn: [number, number];
}[] = [
  {
    name: "Champions",
    description: "Bought recently, buy often and spend the most.",
    color: "brand",
    share: 0.14,
    recency: [1, 18],
    frequency: [14, 42],
    monetary: [4200, 21000],
    churn: [0.02, 0.12],
  },
  {
    name: "Loyal Customers",
    description: "Consistent repeat buyers with healthy basket sizes.",
    color: "cyan",
    share: 0.22,
    recency: [10, 45],
    frequency: [8, 20],
    monetary: [1800, 7200],
    churn: [0.06, 0.24],
  },
  {
    name: "Potential Loyalists",
    description: "Recent buyers with above-average frequency growth.",
    color: "violet",
    share: 0.19,
    recency: [5, 40],
    frequency: [3, 9],
    monetary: [600, 2600],
    churn: [0.12, 0.32],
  },
  {
    name: "New Customers",
    description: "First purchase within the last 60 days.",
    color: "amber",
    share: 0.15,
    recency: [1, 30],
    frequency: [1, 3],
    monetary: [90, 720],
    churn: [0.2, 0.44],
  },
  {
    name: "At Risk",
    description: "Used to purchase often, but have gone quiet.",
    color: "amber",
    share: 0.18,
    recency: [90, 190],
    frequency: [4, 16],
    monetary: [900, 5400],
    churn: [0.52, 0.79],
  },
  {
    name: "Lost Customers",
    description: "No activity for more than six months.",
    color: "risk",
    share: 0.12,
    recency: [200, 420],
    frequency: [1, 6],
    monetary: [110, 1400],
    churn: [0.8, 0.97],
  },
];

const PRODUCT_NAMES: [string, string][] = [
  ["WHITE HANGING HEART T-LIGHT HOLDER", "Home Decor"],
  ["REGENCY CAKESTAND 3 TIER", "Kitchen"],
  ["JUMBO BAG RED RETROSPOT", "Bags"],
  ["ASSORTED COLOUR BIRD ORNAMENT", "Home Decor"],
  ["PARTY BUNTING", "Party"],
  ["LUNCH BAG RED RETROSPOT", "Bags"],
  ["SET OF 3 CAKE TINS PANTRY DESIGN", "Kitchen"],
  ["PACK OF 72 RETROSPOT CAKE CASES", "Kitchen"],
  ["LUNCH BAG BLACK SKULL", "Bags"],
  ["NATURAL SLATE HEART CHALKBOARD", "Home Decor"],
  ["HEART OF WICKER SMALL", "Home Decor"],
  ["SPOTTY BUNTING", "Party"],
  ["JAM MAKING SET WITH JARS", "Kitchen"],
  ["VINTAGE UNION JACK CUSHION COVER", "Textiles"],
  ["RED TOADSTOOL LED NIGHT LIGHT", "Lighting"],
  ["PAPER CHAIN KIT 50'S CHRISTMAS", "Seasonal"],
  ["RABBIT NIGHT LIGHT", "Lighting"],
  ["ALARM CLOCK BAKELIKE GREEN", "Home Decor"],
  ["SET OF 4 PANTRY JELLY MOULDS", "Kitchen"],
  ["WOODEN PICTURE FRAME WHITE FINISH", "Home Decor"],
  ["CHILLI LIGHTS", "Lighting"],
  ["JUMBO STORAGE BAG SUKI", "Bags"],
  ["RETROSPOT TEA SET CERAMIC 11 PC", "Kitchen"],
  ["SMALL POPCORN HOLDER", "Party"],
  ["GLASS STAR FROSTED T-LIGHT HOLDER", "Home Decor"],
  ["FELTCRAFT PRINCESS CHARLOTTE DOLL", "Toys"],
  ["VICTORIAN GLASS HANGING T-LIGHT", "Home Decor"],
  ["DOORMAT KEEP CALM AND COME IN", "Textiles"],
  ["MINI PAINT SET VINTAGE", "Toys"],
  ["HAND WARMER UNION JACK", "Textiles"],
  ["SET/6 RED SPOTTY PAPER CUPS", "Party"],
  ["ROSES REGENCY TEACUP AND SAUCER", "Kitchen"],
  ["BLACK RECORD COVER FRAME", "Home Decor"],
  ["CERAMIC TOP STORAGE JAR", "Kitchen"],
  ["ANTIQUE SILVER T-LIGHT GLASS", "Home Decor"],
  ["WRAP CHRISTMAS VILLAGE", "Seasonal"],
  ["STRAWBERRY CERAMIC TRINKET BOX", "Home Decor"],
  ["EDWARDIAN PARASOL NATURAL", "Accessories"],
  ["BAKING SET 9 PIECE RETROSPOT", "Kitchen"],
  ["CHOCOLATE HOT WATER BOTTLE", "Textiles"],
  ["TRAVEL CARD WALLET RETROSPOT", "Accessories"],
  ["SCANDINAVIAN REDS RIBBONS", "Craft"],
  ["GARDEN PATH SKETCHBOOK", "Craft"],
  ["ZINC HEARTS PLATE ON DRESSER", "Home Decor"],
];

/* ---------- products ---------- */
export const products: Product[] = PRODUCT_NAMES.map(([description, category], i) => {
  const unitPrice = round2(between(1.25, 24.5));
  const quantitySold = Math.round(between(420, 11500) * (1 - i / (PRODUCT_NAMES.length * 1.6)));
  const revenue = round2(quantitySold * unitPrice);
  return {
    id: `P${1000 + i}`,
    stockCode: `${85000 + i * 7}${String.fromCharCode(65 + (i % 6))}`,
    description,
    category,
    unitPrice,
    quantitySold,
    revenue,
    customerCount: Math.round(between(40, 1400)),
    popularity: round2(between(0.22, 0.98)),
    trendPct: round2(between(-14, 31)),
  };
})
  .sort((a, b) => b.revenue - a.revenue)
  .map((p) => p);

const productById = new Map(products.map((p) => [p.id, p]));

export function buildProductDetail(id: string): ProductDetail | undefined {
  const base = productById.get(id);
  if (!base) return undefined;
  const local = mulberry32(id.split("").reduce((a, c) => a + c.charCodeAt(0), 7));
  const months = 12;
  const salesHistory = Array.from({ length: months }, (_, i) => {
    const d = new Date(ANCHOR_DATE.getTime() - (months - 1 - i) * 30 * dayMs);
    const season = 1 + 0.28 * Math.sin((i / months) * Math.PI * 2);
    const quantity = Math.round((base.quantitySold / months) * season * (0.8 + local() * 0.45));
    return {
      month: d.toISOString().slice(0, 7),
      quantity,
      revenue: round2(quantity * base.unitPrice),
    };
  });
  const others = products.filter((p) => p.id !== id);
  const relatedProducts = others
    .filter((p) => p.category === base.category)
    .slice(0, 4)
    .map((p) => ({ id: p.id, description: p.description, affinity: round2(0.42 + local() * 0.5) }));
  const boughtTogether = [others[2]!, others[5]!, others[9]!, others[14]!].map((p) => ({
    id: p.id,
    description: p.description,
    support: round2(0.06 + local() * 0.22),
  }));
  return {
    ...base,
    salesHistory,
    relatedProducts:
      relatedProducts.length > 0
        ? relatedProducts
        : others.slice(0, 3).map((p) => ({
            id: p.id,
            description: p.description,
            affinity: round2(0.4 + local() * 0.4),
          })),
    boughtTogether,
    recommendationScore: round2(0.55 + local() * 0.44),
  };
}

/* ---------- customers ---------- */
const CUSTOMER_COUNT = 180;

function riskFrom(p: number): RiskLevel {
  return p >= 0.6 ? "High" : p >= 0.3 ? "Medium" : "Low";
}

function pickCountry() {
  const r = rnd();
  let acc = 0;
  for (const c of COUNTRIES) {
    acc += c.weight;
    if (r <= acc) return c;
  }
  return COUNTRIES[0]!;
}

function pickSegment() {
  const r = rnd();
  let acc = 0;
  for (const s of SEGMENT_DEFS) {
    acc += s.share;
    if (r <= acc) return s;
  }
  return SEGMENT_DEFS[0]!;
}

export const customers: Customer[] = Array.from({ length: CUSTOMER_COUNT }, (_, i) => {
  const seg = pickSegment();
  const country = pickCountry();
  const recencyDays = Math.round(between(seg.recency[0], seg.recency[1]));
  const frequency = Math.round(between(seg.frequency[0], seg.frequency[1]));
  const monetary = round2(between(seg.monetary[0], seg.monetary[1]));
  const churnProbability = round2(between(seg.churn[0], seg.churn[1]));
  const avgOrderValue = round2(monetary / frequency);
  return {
    id: `1${2400 + i * 3}`,
    country: country.country,
    segment: seg.name,
    recencyDays,
    frequency,
    monetary,
    avgOrderValue,
    totalProducts: Math.round(frequency * between(3, 14)),
    lastPurchase: isoDay(-recencyDays),
    firstPurchase: isoDay(-recencyDays - Math.round(between(40, 700))),
    churnProbability,
    riskLevel: riskFrom(churnProbability),
    predictedValue90d: round2(avgOrderValue * (1 - churnProbability) * between(1.4, 4.2)),
  };
});

const customerById = new Map(customers.map((c) => [c.id, c]));

export function buildCustomerDetail(id: string): CustomerDetail | undefined {
  const base = customerById.get(id);
  if (!base) return undefined;
  const local = mulberry32(Number(base.id));
  const months = 12;
  const timeline = Array.from({ length: months }, (_, i) => {
    const d = new Date(ANCHOR_DATE.getTime() - (months - 1 - i) * 30 * dayMs);
    const decay = base.churnProbability > 0.5 ? 1 - (i / months) * 0.75 : 0.7 + (i / months) * 0.6;
    return {
      month: d.toISOString().slice(0, 7),
      spend: round2((base.monetary / months) * decay * (0.7 + local() * 0.7)),
      orders: Math.max(0, Math.round((base.frequency / months) * decay * (0.6 + local() * 1.6))),
    };
  });
  const orders = Array.from({ length: Math.min(8, Math.max(3, base.frequency)) }, (_, i) => {
    const offset = -base.recencyDays - i * Math.round(between(9, 34));
    const amount = round2(base.avgOrderValue * (0.6 + local() * 0.9));
    return {
      invoiceNo: `5${41000 + Number(base.id) % 900 + i * 13}`,
      date: isoDay(offset),
      items: Math.round(between(2, 18)),
      amount,
      topProduct: products[Math.floor(local() * products.length)]!.description,
    };
  });
  const recommendations: ProductRecommendation[] = products
    .slice(0, 22)
    .filter((_, i) => i % 5 === Number(base.id) % 5)
    .slice(0, 4)
    .map((p) => ({
      customerId: base.id,
      productId: p.id,
      productDescription: p.description,
      score: round2(0.58 + local() * 0.4),
    }));

  const behavior = [
    `Orders on average every ${Math.max(7, Math.round(365 / Math.max(1, base.frequency)))} days.`,
    `Basket average of ${Math.round(base.totalProducts / Math.max(1, base.frequency))} items at ${base.avgOrderValue.toFixed(0)} per order.`,
    `Strongest category affinity: ${products[Number(base.id) % products.length]!.category}.`,
    base.recencyDays > 90
      ? `No purchase in ${base.recencyDays} days — well beyond their usual cadence.`
      : `Last purchase ${base.recencyDays} days ago, inside their usual cadence.`,
  ];

  const riskFactors = [
    {
      label: "Recency drift",
      weight: round2(Math.min(0.95, base.recencyDays / 220)),
      note: `${base.recencyDays} days since last order`,
    },
    {
      label: "Frequency decline",
      weight: round2(Math.min(0.9, 1 - base.frequency / 30)),
      note: `${base.frequency} lifetime orders`,
    },
    {
      label: "Basket contraction",
      weight: round2(Math.min(0.9, 1 - base.avgOrderValue / 600)),
      note: `AOV ${base.avgOrderValue.toFixed(2)}`,
    },
    {
      label: "Discount dependence",
      weight: round2(0.15 + local() * 0.6),
      note: "share of discounted lines",
    },
  ];

  return {
    ...base,
    timeline,
    orders,
    behavior,
    riskFactors,
    recommendations,
    clusterX: round2(base.frequency + local() * 3),
    clusterY: round2(base.monetary),
  };
}

/* ---------- segments ---------- */
export const segments: CustomerSegment[] = SEGMENT_DEFS.map((def, i) => {
  const members = customers.filter((c) => c.segment === def.name);
  const count = members.length;
  const revenue = members.reduce((a, c) => a + c.monetary, 0);
  return {
    id: `S${i + 1}`,
    name: def.name,
    description: def.description,
    color: def.color,
    customerCount: count,
    avgRevenue: round2(count ? revenue / count : 0),
    avgRecencyDays: Math.round(count ? members.reduce((a, c) => a + c.recencyDays, 0) / count : 0),
    avgFrequency: round2(count ? members.reduce((a, c) => a + c.frequency, 0) / count : 0),
    avgMonetary: round2(count ? revenue / count : 0),
    share: round2(count / customers.length),
  };
});

/* ---------- sales history + forecast ---------- */
const HISTORY_DAYS = 180;

export const salesHistory: SalesPoint[] = Array.from({ length: HISTORY_DAYS }, (_, i) => {
  const offset = -(HISTORY_DAYS - 1 - i);
  const t = i / HISTORY_DAYS;
  const weekday = new Date(ANCHOR_DATE.getTime() + offset * dayMs).getUTCDay();
  const weekendDip = weekday === 0 || weekday === 6 ? 0.62 : 1;
  const trend = 1 + t * 0.32;
  const season = 1 + 0.12 * Math.sin(t * Math.PI * 6);
  const noise = 0.88 + rnd() * 0.26;
  const revenue = round2(24_000 * trend * season * weekendDip * noise);
  const orders = Math.round((revenue / 126) * (0.92 + rnd() * 0.18));
  return {
    date: isoDay(offset),
    revenue,
    orders,
    quantity: Math.round(orders * between(7, 16)),
    avgOrderValue: round2(revenue / Math.max(1, orders)),
  };
});

function buildForecast(days: number): Forecast {
  const local = mulberry32(4242 + days);
  const tail = salesHistory.slice(-21);
  const baseline = tail.reduce((a, p) => a + p.revenue, 0) / tail.length;
  const points = Array.from({ length: days }, (_, i) => {
    const weekday = new Date(ANCHOR_DATE.getTime() + (i + 1) * dayMs).getUTCDay();
    const weekendDip = weekday === 0 || weekday === 6 ? 0.66 : 1;
    const drift = 1 + (i / days) * 0.09;
    const predicted = baseline * weekendDip * drift * (0.96 + local() * 0.08);
    const spread = predicted * (0.06 + (i / days) * 0.14);
    return {
      date: isoDay(i + 1),
      predictedRevenue: round2(predicted),
      lower: round2(predicted - spread),
      upper: round2(predicted + spread),
    };
  });
  return {
    horizonDays: days,
    generatedAt: isoDay(0),
    totalPredictedRevenue: round2(points.reduce((a, p) => a + p.predictedRevenue, 0)),
    confidence: days <= 7 ? 0.94 : 0.87,
    points,
  };
}

export const forecast7 = buildForecast(7);
export const forecast30 = buildForecast(30);

/* ---------- aggregates ---------- */
export const kpis: KpiSummary = (() => {
  const half = Math.floor(salesHistory.length / 2);
  const recent = salesHistory.slice(half);
  const prior = salesHistory.slice(0, half);
  const sum = (arr: SalesPoint[], k: "revenue" | "orders") =>
    arr.reduce((a, p) => a + p[k], 0);
  const revenue = sum(recent, "revenue");
  const priorRevenue = sum(prior, "revenue");
  const orders = sum(recent, "orders");
  const priorOrders = sum(prior, "orders");
  const aov = revenue / orders;
  const priorAov = priorRevenue / priorOrders;
  return {
    totalRevenue: round2(revenue),
    totalOrders: orders,
    totalCustomers: customers.length * 72,
    avgOrderValue: round2(aov),
    revenueChangePct: round2(((revenue - priorRevenue) / priorRevenue) * 100),
    ordersChangePct: round2(((orders - priorOrders) / priorOrders) * 100),
    customersChangePct: 3.6,
    aovChangePct: round2(((aov - priorAov) / priorAov) * 100),
  };
})();

export const revenueByCountry: CountryRevenue[] = COUNTRIES.map((c) => ({
  country: c.country,
  code: c.code,
  revenue: round2(kpis.totalRevenue * c.weight * (0.92 + rnd() * 0.16)),
})).sort((a, b) => b.revenue - a.revenue);

export const riskDistribution: RiskDistribution[] = (["Low", "Medium", "High"] as RiskLevel[]).map(
  (level) => {
    const count = customers.filter((c) => c.riskLevel === level).length;
    return { level, count, share: round2(count / customers.length) };
  },
);

export const businessInsights: BusinessInsight[] = (() => {
  const top = products[0]!;
  const falling = [...products].sort((a, b) => a.trendPct - b.trendPct)[0]!;
  const atRisk = segments.find((s) => s.name === "At Risk")!;
  const champions = segments.find((s) => s.name === "Champions")!;
  const highRisk = riskDistribution.find((r) => r.level === "High")!;
  const topCountry = revenueByCountry[0]!;
  return [
    {
      kind: "Opportunity",
      text: `${top.description} drives ${(top.revenue / kpis.totalRevenue * 100).toFixed(1)}% of revenue with a ${top.trendPct > 0 ? "+" : ""}${top.trendPct}% trend — protect stock cover.`,
    },
    {
      kind: "Opportunity",
      text: `Champions are ${(champions.share * 100).toFixed(0)}% of customers but average ${Math.round(champions.avgRevenue).toLocaleString()} lifetime spend — prime for an early-access tier.`,
    },
    {
      kind: "Watch",
      text: `${falling.description} is down ${Math.abs(falling.trendPct)}% period over period while units stay flat — likely price or listing issue.`,
    },
    {
      kind: "Watch",
      text: `${topCountry.country} concentration is ${(topCountry.revenue / kpis.totalRevenue * 100).toFixed(0)}% of revenue; diversification remains thin.`,
    },
    {
      kind: "Risk",
      text: `${atRisk.customerCount} customers sit in At Risk with an average ${atRisk.avgRecencyDays}-day gap — worth ${Math.round(atRisk.avgRevenue * atRisk.customerCount).toLocaleString()} of historic spend.`,
    },
    {
      kind: "Risk",
      text: `${(highRisk.share * 100).toFixed(0)}% of customers carry high churn probability, up from 19% last cycle.`,
    },
  ];
})();

/* ---------- predictions ---------- */
export const churnPredictions: ChurnPrediction[] = [...customers]
  .sort((a, b) => b.churnProbability - a.churnProbability)
  .slice(0, 40)
  .map((c) => ({
    customerId: c.id,
    churnProbability: c.churnProbability,
    riskLevel: c.riskLevel,
    predictedAt: isoDay(0),
  }));

export const clvPredictions: ClvPrediction[] = [...customers]
  .sort((a, b) => b.predictedValue90d - a.predictedValue90d)
  .slice(0, 40)
  .map((c) => ({ customerId: c.id, predictedValue: c.predictedValue90d, horizonDays: 90 }));

export const recommendationPredictions: ProductRecommendation[] = customers
  .slice(0, 40)
  .map((c, i) => {
    const p = products[(i * 3) % products.length]!;
    return {
      customerId: c.id,
      productId: p.id,
      productDescription: p.description,
      score: round2(0.55 + ((i * 7) % 40) / 100),
    };
  });

/* ---------- models ---------- */
export const models: MLModel[] = [
  {
    id: "segmentation",
    name: "Customer Segmentation",
    version: "v2.3.0",
    algorithm: "K-Means (k=6) on RFM features",
    status: "Healthy",
    lastTrained: isoDay(-6),
    predictionCount: 12_940,
    inferenceLatencyMs: 18,
    metrics: [
      { label: "Silhouette", value: 0.62, format: "ratio" },
      { label: "Davies-Bouldin", value: 0.78, format: "ratio" },
      { label: "Inertia (norm.)", value: 0.31, format: "ratio" },
    ],
    performanceTrend: [
      { period: "Apr", value: 0.57 },
      { period: "May", value: 0.59 },
      { period: "Jun", value: 0.6 },
      { period: "Jul", value: 0.61 },
      { period: "Aug", value: 0.63 },
      { period: "Sep", value: 0.62 },
    ],
    drift: [
      { feature: "recency", psi: 0.08, status: "Stable" },
      { feature: "frequency", psi: 0.14, status: "Watch" },
      { feature: "monetary", psi: 0.06, status: "Stable" },
    ],
    predictionDistribution: segments.map((s) => ({ bucket: s.name, count: s.customerCount })),
  },
  {
    id: "churn",
    name: "Churn Prediction",
    version: "v4.1.2",
    algorithm: "XGBoost classifier",
    status: "Healthy",
    lastTrained: isoDay(-3),
    predictionCount: 12_940,
    inferenceLatencyMs: 24,
    metrics: [
      { label: "ROC-AUC", value: 0.89, format: "ratio", target: 0.85 },
      { label: "Precision", value: 0.81, format: "ratio", target: 0.78 },
      { label: "Recall", value: 0.76, format: "ratio", target: 0.75 },
      { label: "F1 Score", value: 0.78, format: "ratio", target: 0.76 },
    ],
    performanceTrend: [
      { period: "Apr", value: 0.86 },
      { period: "May", value: 0.87 },
      { period: "Jun", value: 0.88 },
      { period: "Jul", value: 0.87 },
      { period: "Aug", value: 0.9 },
      { period: "Sep", value: 0.89 },
    ],
    drift: [
      { feature: "recency", psi: 0.21, status: "Drifting" },
      { feature: "avg_order_value", psi: 0.11, status: "Watch" },
      { feature: "country", psi: 0.04, status: "Stable" },
    ],
    predictionDistribution: [
      { bucket: "0.0–0.2", count: 4120 },
      { bucket: "0.2–0.4", count: 3180 },
      { bucket: "0.4–0.6", count: 2240 },
      { bucket: "0.6–0.8", count: 2010 },
      { bucket: "0.8–1.0", count: 1390 },
    ],
  },
  {
    id: "clv",
    name: "Customer Lifetime Value",
    version: "v1.8.0",
    algorithm: "Gradient Boosting Regressor (90d horizon)",
    status: "Healthy",
    lastTrained: isoDay(-9),
    predictionCount: 12_940,
    inferenceLatencyMs: 31,
    metrics: [
      { label: "MAE", value: 41.2, format: "currency" },
      { label: "RMSE", value: 78.9, format: "currency" },
      { label: "R²", value: 0.71, format: "ratio" },
    ],
    performanceTrend: [
      { period: "Apr", value: 0.66 },
      { period: "May", value: 0.68 },
      { period: "Jun", value: 0.69 },
      { period: "Jul", value: 0.7 },
      { period: "Aug", value: 0.71 },
      { period: "Sep", value: 0.71 },
    ],
    drift: [
      { feature: "basket_size", psi: 0.09, status: "Stable" },
      { feature: "tenure_days", psi: 0.13, status: "Watch" },
    ],
    predictionDistribution: [
      { bucket: "<100", count: 3980 },
      { bucket: "100–300", count: 4320 },
      { bucket: "300–800", count: 2870 },
      { bucket: "800+", count: 1770 },
    ],
  },
  {
    id: "recommender",
    name: "Product Recommendation",
    version: "v3.0.1",
    algorithm: "Item-item collaborative filtering + ALS",
    status: "Degraded",
    lastTrained: isoDay(-21),
    predictionCount: 86_400,
    inferenceLatencyMs: 47,
    metrics: [
      { label: "Precision@10", value: 0.24, format: "ratio" },
      { label: "Recall@10", value: 0.31, format: "ratio" },
      { label: "Coverage", value: 0.68, format: "ratio" },
    ],
    performanceTrend: [
      { period: "Apr", value: 0.29 },
      { period: "May", value: 0.28 },
      { period: "Jun", value: 0.27 },
      { period: "Jul", value: 0.26 },
      { period: "Aug", value: 0.25 },
      { period: "Sep", value: 0.24 },
    ],
    drift: [
      { feature: "catalogue_mix", psi: 0.27, status: "Drifting" },
      { feature: "session_depth", psi: 0.18, status: "Watch" },
    ],
    predictionDistribution: [
      { bucket: "Home Decor", count: 24_100 },
      { bucket: "Kitchen", count: 19_400 },
      { bucket: "Bags", count: 14_800 },
      { bucket: "Party", count: 11_200 },
      { bucket: "Other", count: 16_900 },
    ],
  },
  {
    id: "forecast",
    name: "Sales Forecasting",
    version: "v2.0.4",
    algorithm: "Gradient boosted trees on lag features",
    status: "Healthy",
    lastTrained: isoDay(-2),
    predictionCount: 5_400,
    inferenceLatencyMs: 12,
    metrics: [
      { label: "MAE", value: 1840, format: "currency" },
      { label: "RMSE", value: 2610, format: "currency" },
      { label: "MAPE", value: 6.4, format: "percent" },
    ],
    performanceTrend: [
      { period: "Apr", value: 8.9 },
      { period: "May", value: 8.1 },
      { period: "Jun", value: 7.4 },
      { period: "Jul", value: 7 },
      { period: "Aug", value: 6.6 },
      { period: "Sep", value: 6.4 },
    ],
    drift: [
      { feature: "daily_orders", psi: 0.07, status: "Stable" },
      { feature: "promo_flag", psi: 0.16, status: "Watch" },
    ],
    predictionDistribution: [
      { bucket: "<20k", count: 18 },
      { bucket: "20–26k", count: 64 },
      { bucket: "26–32k", count: 71 },
      { bucket: "32k+", count: 27 },
    ],
  },
];
