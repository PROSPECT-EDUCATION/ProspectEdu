export const parentStudents = [
  {
    id: 1,
    name: "Aarav Singh",
    class: "8",
    roll: "08-23",
    avatar: "/src/assets/profile.webp",
    attendance: 92,
    lastScore: "84%",
    performance: "Good",
    overallProgress: 78,

    courses: [
      { id: 1, name: "Mathematics", progress: 80, modulesDone: 12, totalModules: 15 },
      { id: 2, name: "Science", progress: 65, modulesDone: 10, totalModules: 18 },
      { id: 3, name: "English", progress: 85, modulesDone: 14, totalModules: 16 },
    ],

    performance: {
      assignments: 82,
      quizzes: 76,
      courseProgress: 78,
    },

    activity: [
      "Submitted Assignment 2",
      "Scored 85% in Quiz 4",
      "Watched 3 modules today",
      "Teacher: Good improvement!",
    ],

    alerts: [
      "Missing Assignment: Science Project",
      "Low Engagement: English Course",
      "Test Scheduled: Math on Friday",
    ],
  },

  {
    id: 2,
    name: "Sneha Verma",
    class: "10",
    roll: "10-15",
    avatar: "/src/assets/profile.webp",
    attendance: 88,
    lastScore: "84%",
    performance: "Good",
    overallProgress: 74,

    courses: [
      { id: 1, name: "Physics", progress: 70, modulesDone: 9, totalModules: 14 },
      { id: 2, name: "Chemistry", progress: 74, modulesDone: 11, totalModules: 16 },
      { id: 3, name: "Maths", progress: 81, modulesDone: 13, totalModules: 15 },
    ],

    performance: {
      assignments: 79,
      quizzes: 83,
      courseProgress: 74,
    },

    activity: [
      "Completed Physics Module 8",
      "Scored 92% in Maths Quiz",
      "Watched 4 modules today",
    ],

    alerts: [
      "Upcoming Test: Chemistry",
      "Late Submission: Physics Assignment 3",
    ],
  },
];
