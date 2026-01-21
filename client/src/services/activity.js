import { api } from "../lib/api";

export const activityApi = {
  log: (payload) => api.post("/activity/log", payload),
 myRecent: () => api.get("/activity/me", { params: { t: `${Date.now()}-${Math.random()}` } }),

};
