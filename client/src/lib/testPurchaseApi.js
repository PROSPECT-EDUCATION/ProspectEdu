// src/lib/testPurchaseApi.js
import { api } from "./api";

// ✅ confirm purchase
export async function confirmTestPurchase(payload) {
  const res = await api.post("/test-purchase/confirm", payload);
  return res.data?.data;
}

// ✅ get my purchased test series
export async function fetchMyPurchasedSeries() {
  const res = await api.get("/test-purchase/mine");
  return res.data?.data || [];
}

// ✅ check if already purchased
export async function hasPurchasedSeries(testSeriesId) {
  const res = await api.get(`/test-purchase/has/${testSeriesId}`);
  return !!res.data?.purchased;
}
export async function fetchMySeriesDetails(seriesId) {
  // Try purchased-details first (student access safe)
  try {
    const res = await api.get(`/test-purchase/me/series/${seriesId}`);
    return res?.data?.data || res?.data || null;
  } catch (e) {
    // fallback to public series details (if you have it)
    const res2 = await api.get(`/test-series/${seriesId}`);
    return res2?.data?.data || res2?.data || null;
  }
}
