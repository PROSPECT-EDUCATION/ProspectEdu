import { api } from "../lib/api";

export const purchasesApi = {
  checkout: (courseId) => api.post(`/purchases/courses/${courseId}/checkout`),
  confirm: (purchaseId, payload) => api.post(`/purchases/${purchaseId}/confirm`, payload),
};
