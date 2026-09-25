export type EducationItem = {
  id: string;
  degree: string;
  institution?: string;
  period?: {
    start: string;
    end?: string;
  };
  description?: string;
  grade?: string;
  skills?: string[];
  isExpanded?: boolean;
};

export const education: EducationItem[] = [
  {
    id: "bsc-cs",
    degree: "Bachelor of Science in Computer Science",
    period: {
      start: "2023",
      end: "2026",
    },
    description:
      "Core curriculum covering programming, data structures, databases, operating systems, networks, mathematics, software engineering, and practical labs.",
    skills: [
      "Software Engineering",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Data Structures and Algorithms",
      "Mathematics for Computer Science",
      "Computer Architecture",
      "AI&ML",
      "Programming Languages (C,Java, Python, Javascript, SQL)",
    ],
  },
];
