import { api } from "../lib/api";

const authHeader = () => {
  const token = sessionStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const courseContentApi = {
  // Teacher/Admin
  createModule: (courseId, payload) =>
    api.post(`/courses/${courseId}/modules`, payload, { headers: authHeader() }),

  createLesson: (moduleId, payload) =>
    api.post(`/modules/${moduleId}/lessons`, payload, { headers: authHeader() }),

  // Student (enrolled)
  listModules: (courseId) =>
    api.get(`/courses/${courseId}/modules`, { headers: authHeader() }),

  listLessons: (moduleId) =>
    api.get(`/modules/${moduleId}/lessons`, { headers: authHeader() }),
};
