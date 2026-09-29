/**
 * Service layer. UI components only talk to this module.
 * Today it resolves from the mock dataset; later each function becomes a
 * fetch() against the FastAPI backend without changing any UI code.
 */

import * as mock from "./mock-data";
import type {
  BusinessInsight,
  ChurnPrediction,
  ClvPrediction,
  CountryRevenue,
  Customer,
  CustomerDetail,
  CustomerFilters,
  CustomerSegment,
  Forecast,
  KpiSummary,
  MLModel,
  Product,
  ProductDetail,
  ProductRecommendation,
  RiskDistribution,
  SalesPoint,
} from "./types";

/** Base URL of the future Python service. */
export const API_BASE_URL = "/api/v1";

/** Flip to false once the FastAPI backend is live. */
export const USING_MOCK_DATA = true;

const resolve = <T,>(value: T): Promise<T> => Promise.resolve(value);

export const api = {
  getKpiSummary: (): Promise<KpiSummary> => resolve(mock.kpis),

  getSalesHistory: (): Promise<SalesPoint[]> => resolve(mock.salesHistory),

  getForecast: (horizonDays: 7 | 30): Promise<Forecast> =>
    resolve(horizonDays === 7 ? mock.forecast7 : mock.forecast30),

  getRevenueByCountry: (): Promise<CountryRevenue[]> => resolve(mock.revenueByCountry),

  getRiskDistribution: (): Promise<RiskDistribution[]> => resolve(mock.riskDistribution),

  getBusinessInsights: (): Promise<BusinessInsight[]> => resolve(mock.businessInsights),

  getSegments: (): Promise<CustomerSegment[]> => resolve(mock.segments),

  getCustomers: (filters: CustomerFilters = {}): Promise<Customer[]> => {
    const search = filters.search?.trim().toLowerCase() ?? "";
    return resolve(
      mock.customers.filter((c) => {
        if (search && !`${c.id} ${c.country} ${c.segment}`.toLowerCase().includes(search))
          return false;
        if (filters.segment && filters.segment !== "All" && c.segment !== filters.segment)
          return false;
        if (filters.risk && filters.risk !== "All" && c.riskLevel !== filters.risk) return false;
        if (filters.country && filters.country !== "All" && c.country !== filters.country)
          return false;
        return true;
      }),
    );
  },

  getCustomer: (id: string): Promise<CustomerDetail | null> =>
    resolve(mock.buildCustomerDetail(id) ?? null),

  getCustomerClusters: (): Promise<
    { id: string; segment: string; frequency: number; monetary: number; recencyDays: number }[]
  > =>
    resolve(
      mock.customers.map((c) => ({
        id: c.id,
        segment: c.segment,
        frequency: c.frequency,
        monetary: c.monetary,
        recencyDays: c.recencyDays,
      })),
    ),

  getProducts: (): Promise<Product[]> => resolve(mock.products),

  getProduct: (id: string): Promise<ProductDetail | null> =>
    resolve(mock.buildProductDetail(id) ?? null),

  getChurnPredictions: (): Promise<ChurnPrediction[]> => resolve(mock.churnPredictions),

  getClvPredictions: (): Promise<ClvPrediction[]> => resolve(mock.clvPredictions),

  getRecommendationPredictions: (): Promise<ProductRecommendation[]> =>
    resolve(mock.recommendationPredictions),

  getModels: (): Promise<MLModel[]> => resolve(mock.models),

  getCountries: (): Promise<string[]> => resolve(mock.COUNTRIES.map((c) => c.country)),
};
