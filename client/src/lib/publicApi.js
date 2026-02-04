import axios from "axios";

export const publicApi = axios.create({
  baseURL: "https://api.prospectedu.org/api/v1",
  withCredentials: false, // 🔥 IMPORTANT
});
