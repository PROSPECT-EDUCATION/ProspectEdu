import { api } from "../lib/api";

export const usersApi = {
  listTeachers: () => api.get("/users/teachers"),
  listStudents: () => api.get("/users/students"),
  blockUser: (userId) => api.patch(`/users/${userId}/block`),
  unblockUser: (userId) => api.patch(`/users/${userId}/unblock`),
};
