import { api } from "../lib/api";

const authHeader = () => {
  const token = sessionStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const courseContentApi = {
  // ✅ Teacher/Admin: create module
  createModule: (courseId, payload) =>
    api.post(`/content/courses/${courseId}/modules`, payload, {
      headers: authHeader(),
    }),

  // ✅ Teacher/Admin: create lesson
  createLesson: (moduleId, payload) =>
    api.post(`/content/modules/${moduleId}/lessons`, payload, {
      headers: authHeader(),
    }),

  // ✅ Teacher/Admin: get modules WITH lessons (NEW)
  teacherModulesWithLessons: (courseId) =>
    api.get(`/content/teacher/courses/${courseId}/modules`, {
      headers: authHeader(),
    }),

  // ✅ Student: list published modules (enrolled)
  listModules: (courseId) =>
    api.get(`/content/courses/${courseId}/modules`, {
      headers: authHeader(),
    }),

  // ✅ Student: list lessons in a module (enrolled)
  listLessons: (moduleId) =>
    api.get(`/content/modules/${moduleId}/lessons`, {
      headers: authHeader(),
    }),
  deleteLesson: (lessonId) =>
  api.delete(`/content/lessons/${lessonId}`, { headers: authHeader() }),

deleteLesson: (lessonId) =>
  api.delete(`/content/lessons/${lessonId}`, { headers: authHeader() }),

updateLesson: (lessonId, payload) =>
  api.patch(`/content/lessons/${lessonId}`, payload, { headers: authHeader() }),
};
