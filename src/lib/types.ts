/**
 * Domain types for the Retail Intelligence Platform.
 * These mirror the shape the future FastAPI/ML backend will return.
 */

export type SegmentName =
  | "Champions"
  | "Loyal Customers"
  | "Potential Loyalists"
  | "New Customers"
  | "At Risk"
  | "Lost Customers";

export type RiskLevel = "Low" | "Medium" | "High";

export interface CustomerSegment {
  id: string;
  name: SegmentName;
  description: string;
  customerCount: number;
  avgRevenue: number;
  avgRecencyDays: number;
  avgFrequency: number;
  avgMonetary: number;
  share: number;
  color: string;
}

export interface Customer {
  id: string;
  country: string;
  segment: SegmentName;
  recencyDays: number;
  frequency: number;
  monetary: number;
  avgOrderValue: number;
  totalProducts: number;
  lastPurchase: string;
  firstPurchase: string;
  churnProbability: number;
  riskLevel: RiskLevel;
  predictedValue90d: number;
}

export interface CustomerOrder {
  invoiceNo: string;
  date: string;
  items: number;
  amount: number;
  topProduct: string;
}

export interface CustomerTimePoint {
  month: string;
  spend: number;
  orders: number;
}

export interface CustomerDetail extends Customer {
  timeline: CustomerTimePoint[];
  orders: CustomerOrder[];
  behavior: string[];
  riskFactors: { label: string; weight: number; note: string }[];
  recommendations: ProductRecommendation[];
  clusterX: number;
  clusterY: number;
}

export interface Product {
  id: string;
  stockCode: string;
  description: string;
  category: string;
  unitPrice: number;
  quantitySold: number;
  revenue: number;
  customerCount: number;
  popularity: number;
  trendPct: number;
}

export interface ProductDetail extends Product {
  salesHistory: { month: string; revenue: number; quantity: number }[];
  relatedProducts: { id: string; description: string; affinity: number }[];
  boughtTogether: { id: string; description: string; support: number }[];
  recommendationScore: number;
}

export interface SalesPoint {
  date: string;
  revenue: number;
  orders: number;
  quantity: number;
  avgOrderValue: number;
}

export interface ForecastPoint {
  date: string;
  predictedRevenue: number;
  lower: number;
  upper: number;
}

export interface Forecast {
  horizonDays: number;
  generatedAt: string;
  totalPredictedRevenue: number;
  confidence: number;
  points: ForecastPoint[];
}

export interface ChurnPrediction {
  customerId: string;
  churnProbability: number;
  riskLevel: RiskLevel;
  predictedAt: string;
}

export interface ClvPrediction {
  customerId: string;
  predictedValue: number;
  horizonDays: number;
}

export interface ProductRecommendation {
  customerId: string;
  productId: string;
  productDescription: string;
  score: number;
}

export interface ModelMetric {
  label: string;
  value: number;
  format: "ratio" | "currency" | "percent" | "number";
  target?: number;
}

export interface MLModel {
  id: string;
  name: string;
  version: string;
  algorithm: string;
  status: "Healthy" | "Degraded" | "Training";
  lastTrained: string;
  predictionCount: number;
  inferenceLatencyMs: number;
  metrics: ModelMetric[];
  performanceTrend: { period: string; value: number }[];
  drift: { feature: string; psi: number; status: "Stable" | "Watch" | "Drifting" }[];
  predictionDistribution: { bucket: string; count: number }[];
}

export interface KpiSummary {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  avgOrderValue: number;
  revenueChangePct: number;
  ordersChangePct: number;
  customersChangePct: number;
  aovChangePct: number;
}

export interface CountryRevenue {
  country: string;
  code: string;
  revenue: number;
}

export interface RiskDistribution {
  level: RiskLevel;
  count: number;
  share: number;
}

export interface BusinessInsight {
  kind: "Opportunity" | "Watch" | "Risk";
  text: string;
}

export interface CustomerFilters {
  search?: string;
  segment?: SegmentName | "All";
  risk?: RiskLevel | "All";
  country?: string | "All";
}
