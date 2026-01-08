import { api } from "../lib/api";

export async function getMyStudentProfile() {
  const { data } = await api.get("/students/me");
  return data; // { success, user, profile }
}

export async function updateMyStudentProfile(payload) {
  const { data } = await api.patch("/students/me", payload);
  return data; // { success, user, profile }
}
