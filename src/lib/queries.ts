import { queryOptions } from "@tanstack/react-query";

import { api } from "./api";
import type { CustomerFilters } from "./types";

export const qk = {
  kpis: () => queryOptions({ queryKey: ["kpis"], queryFn: () => api.getKpiSummary() }),
  sales: () => queryOptions({ queryKey: ["sales"], queryFn: () => api.getSalesHistory() }),
  forecast: (h: 7 | 30) =>
    queryOptions({ queryKey: ["forecast", h], queryFn: () => api.getForecast(h) }),
  countries: () =>
    queryOptions({ queryKey: ["revenue-by-country"], queryFn: () => api.getRevenueByCountry() }),
  risk: () => queryOptions({ queryKey: ["risk"], queryFn: () => api.getRiskDistribution() }),
  insights: () => queryOptions({ queryKey: ["insights"], queryFn: () => api.getBusinessInsights() }),
  segments: () => queryOptions({ queryKey: ["segments"], queryFn: () => api.getSegments() }),
  customers: (filters: CustomerFilters = {}) =>
    queryOptions({ queryKey: ["customers", filters], queryFn: () => api.getCustomers(filters) }),
  customer: (id: string) =>
    queryOptions({ queryKey: ["customer", id], queryFn: () => api.getCustomer(id) }),
  clusters: () => queryOptions({ queryKey: ["clusters"], queryFn: () => api.getCustomerClusters() }),
  products: () => queryOptions({ queryKey: ["products"], queryFn: () => api.getProducts() }),
  product: (id: string) =>
    queryOptions({ queryKey: ["product", id], queryFn: () => api.getProduct(id) }),
  churn: () => queryOptions({ queryKey: ["churn"], queryFn: () => api.getChurnPredictions() }),
  clv: () => queryOptions({ queryKey: ["clv"], queryFn: () => api.getClvPredictions() }),
  recommendations: () =>
    queryOptions({ queryKey: ["recs"], queryFn: () => api.getRecommendationPredictions() }),
  models: () => queryOptions({ queryKey: ["models"], queryFn: () => api.getModels() }),
  countryList: () =>
    queryOptions({ queryKey: ["country-list"], queryFn: () => api.getCountries() }),
};
