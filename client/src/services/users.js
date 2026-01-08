import { api } from "../lib/api";

export const usersApi = {
  listTeachers: () => api.get("/users/teachers"),
};
