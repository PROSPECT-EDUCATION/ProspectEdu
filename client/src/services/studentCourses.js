import { api } from "../lib/api";

export const studentCoursesApi = {
  myEnrollments: () => api.get("/courses/me/enrollments"),
};
