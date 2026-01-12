import { api } from "../lib/api";

export const quizzesApi = {
  create: (courseId, payload) =>
    api.post(`/quizzes/courses/${courseId}`, payload),

  listByCourse: (courseId) =>
    api.get(`/quizzes/teacher/courses/${courseId}`),

  getById: (quizId) =>
    api.get(`/quizzes/${quizId}`),

  update: (quizId, payload) =>
    api.patch(`/quizzes/${quizId}`, payload),

  publish: (quizId) =>
    api.post(`/quizzes/${quizId}/publish`),
  remove: (quizId) => api.delete(`/quizzes/${quizId}`),
};
