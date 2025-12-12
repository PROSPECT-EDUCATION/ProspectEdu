// src/data/courses.js
const courses = [
  {
    slug: "quantity-surveying",
    title: "PG Programme in Quantity Surveying & Contract Management",
    category: "Information Technology",
    short: "Online | Working Professionals",
    desc: "Full program on quantity surveying, contracts and software tools.",
    img: "/src/assets/it.png",

    // ------------------ Added Fields ------------------
    description: "Full program on quantity surveying, contracts and software tools.",
    info:  `This program is designed to provide learners with a deep understanding of industry practices and modern tools.
It combines theoretical foundations with hands-on training to build strong practical competence.
Throughout the course, students explore real-world case studies and project-based applications.
The curriculum emphasizes analytical thinking, problem-solving, and decision-making skills.
Learners are guided through essential concepts step-by-step to ensure clarity and mastery.
Industry experts contribute with insights into current trends and professional expectations.
Interactive sessions, assignments, and assessments enhance engagement and learning retention.
Students will develop technical, managerial, and professional communication skills.
The program prepares learners to confidently face workplace challenges and industry roles.
By the end, participants emerge with job-ready skills and a strong foundational understanding.
This program is designed to provide learners with a deep understanding of industry practices and modern tools.
`,

    duration: "2 Years",
    professors: ["Jimmy Morris", "Sarah Lewis"],
    tags: ["Quantity Surveying", "Contract Management", "Construction"],
    languages: ["English"],
    price: 1500,
    discount: 10,
    tax: 18
  },

  {
    slug: "project-management",
    title: "PG Programme in Project Management for Working Professionals",
    category: "Information Technology",
    short: "Online | Professional Level",
    desc: "Project management fundamentals, Agile, and practical tools.",
    img: "/src/assets/project.png",

    // ------------------ Added Fields ------------------
    description: "Project management fundamentals, Agile, and practical tools.",
    info:`This program is designed to provide learners with a deep understanding of industry practices and modern tools.
It combines theoretical foundations with hands-on training to build strong practical competence.
Throughout the course, students explore real-world case studies and project-based applications.
The curriculum emphasizes analytical thinking, problem-solving, and decision-making skills.
Learners are guided through essential concepts step-by-step to ensure clarity and mastery.
Industry experts contribute with insights into current trends and professional expectations.
Interactive sessions, assignments, and assessments enhance engagement and learning retention.
Students will develop technical, managerial, and professional communication skills.
The program prepares learners to confidently face workplace challenges and industry roles.
By the end, participants emerge with job-ready skills and a strong foundational understanding.
This program is designed to provide learners with a deep understanding of industry practices and modern tools.
`,

    duration: "1 Year",
    professors: ["Anil Kumar", "Priya Singh"],
    tags: ["Project Management", "Agile", "Scrum"],
    languages: ["English", "Hindi"],
    price: 1800,
    discount: 5,
    tax: 18
  },

  {
    slug: "construction-management",
    title: "PG Programme in Construction Management for Working Professionals",
    category: "Information Technology",
    short: "Hybrid | Weekend Classes",
    desc: "Construction project planning, scheduling and site management.",
    img: "/src/assets/electrical.png",

    // ------------------ Added Fields ------------------
    description: "Construction project planning, scheduling and site management.",
    info: `This program is designed to provide learners with a deep understanding of industry practices and modern tools.
It combines theoretical foundations with hands-on training to build strong practical competence.
Throughout the course, students explore real-world case studies and project-based applications.
The curriculum emphasizes analytical thinking, problem-solving, and decision-making skills.
Learners are guided through essential concepts step-by-step to ensure clarity and mastery.
Industry experts contribute with insights into current trends and professional expectations.
Interactive sessions, assignments, and assessments enhance engagement and learning retention.
Students will develop technical, managerial, and professional communication skills.
The program prepares learners to confidently face workplace challenges and industry roles.
By the end, participants emerge with job-ready skills and a strong foundational understanding.
This program is designed to provide learners with a deep understanding of industry practices and modern tools.
`,

    duration: "2 Years",
    professors: ["Rohit Mehta", "Sneha Chauhan"],
    tags: ["Construction", "Management", "Planning"],
    languages: ["English"],
    price: 1700,
    discount: 8,
    tax: 18
  },

  {
    slug: "law-internship",
    title: "Law Internship Programme",
    category: "Law",
    short: "Offline / Online | 6 Weeks",
    desc: "Practical law internship with case studies and drafting tasks.",
    img: "/src/assets/law.png",

    // ------------------ Added Fields ------------------
    description: "Practical law internship with case studies and drafting tasks.",
    info: `This program is designed to provide learners with a deep understanding of industry practices and modern tools.
It combines theoretical foundations with hands-on training to build strong practical competence.
Throughout the course, students explore real-world case studies and project-based applications.
The curriculum emphasizes analytical thinking, problem-solving, and decision-making skills.
Learners are guided through essential concepts step-by-step to ensure clarity and mastery.
Industry experts contribute with insights into current trends and professional expectations.
Interactive sessions, assignments, and assessments enhance engagement and learning retention.
Students will develop technical, managerial, and professional communication skills.
The program prepares learners to confidently face workplace challenges and industry roles.
By the end, participants emerge with job-ready skills and a strong foundational understanding.
This program is designed to provide learners with a deep understanding of industry practices and modern tools.
`,

    duration: "6 Weeks",
    professors: ["Adv. Kavita Sharma", "Adv. Deepak Verma"],
    tags: ["Law", "Internship", "Case Studies"],
    languages: ["English", "Hindi"],
    price: 900,
    discount: 0,
    tax: 18
  },

  {
    slug: "electrical-design",
    title: "Electrical System Design & Drafting",
    category: "Electrical",
    short: "Online | Beginner to Advanced",
    desc: "Learn circuit design, CAD drafting and power systems basics.",
    img: "/src/assets/electrical.png",

    // ------------------ Added Fields ------------------
    description: "Learn circuit design, CAD drafting and power systems basics.",
    info: `This program is designed to provide learners with a deep understanding of industry practices and modern tools.
It combines theoretical foundations with hands-on training to build strong practical competence.
Throughout the course, students explore real-world case studies and project-based applications.
The curriculum emphasizes analytical thinking, problem-solving, and decision-making skills.
Learners are guided through essential concepts step-by-step to ensure clarity and mastery.
Industry experts contribute with insights into current trends and professional expectations.
Interactive sessions, assignments, and assessments enhance engagement and learning retention.
Students will develop technical, managerial, and professional communication skills.
The program prepares learners to confidently face workplace challenges and industry roles.
By the end, participants emerge with job-ready skills and a strong foundational understanding.
This program is designed to provide learners with a deep understanding of industry practices and modern tools.
`,

    duration: "1 Year",
    professors: ["Mohit Sharma", "Riya Agarwal"],
    tags: ["Electrical", "Design", "Drafting"],
    languages: ["English"],
    price: 1300,
    discount: 5,
    tax: 18
  }
];

export default courses;
