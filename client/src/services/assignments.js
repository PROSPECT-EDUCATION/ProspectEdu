import { api } from "../lib/api";

export const assignmentsApi = {
  create: (courseId, payload) =>
    api.post(`/assignments/courses/${courseId}`, payload),

  listByCourse: (courseId) =>
    api.get(`/assignments/teacher/courses/${courseId}`),

  remove: (assignmentId) =>
    api.delete(`/assignments/${assignmentId}`),
};
