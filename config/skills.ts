export type SkillItem = {
  name: string;
  icon: string;
  /**
   * "dark" -> Invert in dark mode (for black/dark monochrome icons to turn white)
   * "light" -> Invert in light mode (for white monochrome icons to turn dark)
   * "none" -> Keep original colors (for colorful icons)
   */
  invertCategory?: "dark" | "light" | "none";
};

export type SkillCategory = {
  id: string;
  title: string;
  isExpanded?: boolean;
  skills: SkillItem[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    isExpanded: true,
    skills: [
      {
        name: "React",
        icon: "/assets/stack/frontend/reactjs.svg",
        invertCategory: "none",
      },
      {
        name: "Next.js",
        icon: "/assets/stack/frontend/nextjs.svg",
        invertCategory: "dark",
      },
      {
        name: "TypeScript",
        icon: "/assets/stack/frontend/typescript.svg",
        invertCategory: "none",
      },
      {
        name: "JavaScript",
        icon: "/assets/stack/frontend/javascript.svg",
        invertCategory: "none",
      },
      {
        name: "Tailwind CSS",
        icon: "/assets/stack/frontend/tailwindcss.svg",
        invertCategory: "none",
      },
      {
        name: "HTML5",
        icon: "/assets/stack/frontend/html5.svg",
        invertCategory: "none",
      },
      {
        name: "CSS3",
        icon: "/assets/stack/frontend/css3.svg",
        invertCategory: "none",
      },
      {
        name: "Redux",
        icon: "/assets/stack/frontend/redux.svg",
        invertCategory: "none",
      },
      {
        name: "Shadcn UI",
        icon: "/assets/stack/frontend/shadcnui.svg",
        invertCategory: "dark",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    isExpanded: false,
    skills: [
      {
        name: "Node.js",
        icon: "/assets/stack/backend/nodejs.svg",
        invertCategory: "none",
      },
      {
        name: "Express.js",
        icon: "/assets/stack/backend/expressjs-dark.svg",
        invertCategory: "dark",
      },
      {
        name: "GraphQL",
        icon: "/assets/stack/backend/graphql.svg",
        invertCategory: "none",
      },
      {
        name: "Redis",
        icon: "/assets/stack/backend/redis.svg",
        invertCategory: "none",
      },
      {
        name: "Appwrite",
        icon: "/assets/stack/backend/appwrite.svg",
        invertCategory: "none",
      },
      {
        name: "Liveblocks",
        icon: "/assets/stack/backend/liveblocks.svg",
        invertCategory: "dark",
      },
      {
        name: "Clerk",
        icon: "/assets/stack/backend/clerk.svg",
        invertCategory: "none",
      },
      {
        name: "Zod",
        icon: "/assets/stack/backend/zod.svg",
        invertCategory: "none",
      },
    ],
  },
  {
    id: "database",
    title: "Database & ORM",
    isExpanded: false,
    skills: [
      {
        name: "PostgreSQL",
        icon: "/assets/stack/database/postgresql.svg",
        invertCategory: "none",
      },
      {
        name: "MongoDB",
        icon: "/assets/stack/database/mongodb.svg",
        invertCategory: "none",
      },
      {
        name: "MySQL",
        icon: "/assets/stack/database/mysql.svg",
        invertCategory: "none",
      },
      {
        name: "Prisma",
        icon: "/assets/stack/database/prisma.svg",
        invertCategory: "dark",
      },
    ],
  },
  {
    id: "ai-llm",
    title: "AI & LLM Integration",
    isExpanded: false,
    skills: [
      {
        name: "ChatGPT",
        icon: "/assets/stack/ai&llm-integration/chatgpt.svg",
        invertCategory: "none",
      },
      {
        name: "Claude AI",
        icon: "/assets/stack/ai&llm-integration/claude-ai.svg",
        invertCategory: "none",
      },
      {
        name: "Google Gemini",
        icon: "/assets/stack/ai&llm-integration/gemini.svg",
        invertCategory: "none",
      },
      {
        name: "GitHub Copilot",
        icon: "/assets/stack/ai&llm-integration/github-copilot.svg",
        invertCategory: "dark",
      },
    ],
  },
  {
    id: "tools-infra",
    title: "Tools & Infrastructure",
    isExpanded: false,
    skills: [
      {
        name: "Git",
        icon: "/assets/stack/tools&testing/git.svg",
        invertCategory: "none",
      },
      {
        name: "GitHub",
        icon: "/assets/stack/tools&testing/github-dark.svg",
        invertCategory: "dark",
      },
      {
        name: "Vercel",
        icon: "/assets/stack/tools&testing/vercel.svg",
        invertCategory: "dark",
      },
      {
        name: "Postman",
        icon: "/assets/stack/tools&testing/postman.svg",
        invertCategory: "none",
      },
      {
        name: "Cloudflare",
        icon: "/assets/stack/tools&testing/cloudflare.svg",
        invertCategory: "none",
      },
      {
        name: "Resend",
        icon: "/assets/stack/tools&testing/resend.svg",
        invertCategory: "dark",
      },
      {
        name: "Notion",
        icon: "/assets/stack/tools&testing/notion.svg",
        invertCategory: "dark",
      },
      {
        name: "npm",
        icon: "/assets/stack/tools&testing/npm.svg",
        invertCategory: "none",
      },
    ],
  },
  {
    id: "design",
    title: "Design",
    isExpanded: false,
    skills: [
      {
        name: "Figma",
        icon: "/assets/stack/design/figma.svg",
        invertCategory: "none",
      },
      {
        name: "Photoshop",
        icon: "/assets/stack/design/photoshop.svg",
        invertCategory: "none",
      },
      {
        name: "Lightroom",
        icon: "/assets/stack/design/lightroom.svg",
        invertCategory: "none",
      },
      {
        name: "Canva",
        icon: "/assets/stack/design/canva.svg",
        invertCategory: "none",
      },
      {
        name: "CSS",
        icon: "/assets/stack/design/css.svg",
        invertCategory: "none",
      },
      {
        name: "Developer Icons",
        icon: "/assets/stack/design/developer-icons.svg",
        invertCategory: "none",
      },
    ],
  },
];
