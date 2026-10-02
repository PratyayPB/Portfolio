export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string;
  title: string;
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period: {
    /** Start date (e.g., "05.2025"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Public URL (site, repository, demo, or video). */
  link: string;
  /** Github repository URL. */
  github?: string;
  /** Tags/technologies for chips or filtering. */
  skills: string[];
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string;
  /** Logo image URL (absolute or path under /public). */
  logo?: string;
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "ghost-ai",
    title: "Ghost AI",
    logo: "/assets/project-logos/ghost-ai.png",
    period: {
      start: "06.2026",
      end: "07.2026",
    },
    link: "https://ghost-ai-eta.vercel.app/",
    github: "https://github.com/PratyayPB/Ghost-AI",
    skills: [
      "Next.js",
      "TypeScript",
      "Liveblocks",
      "Trigger.dev",
      "React Flow",
      "Prisma",
      "PostgreSQL",
      "Clerk",
      "Tailwind CSS",
    ],
    description: `Agentic planning application built for software teams to collaboratively design systems and generate technical specifications.

Features include:
- Real-time multiplayer collaboration with live cursors and shared state via Liveblocks
- AI Architecture Agent that autonomously builds visual diagrams from text prompts
- Automated conversion of visual architecture graphs into downloadable Markdown specs
- Reliable background task orchestration powered by Trigger.dev
- Persistent canvas state management using Vercel Blob and PostgreSQL
- Interactive node-based UI with customizable elements powered by React Flow
- Secure user authentication and project management routing via Clerk`,
  },
  {
    id: "vaultex",
    title: "Vaultex",
    logo: "/assets/project-logos/logo-brand.svg",
    period: {
      start: "02.2026",
      end: "04.2026",
    },
    link: "https://vaultex-phi.vercel.app/",
    github: "https://github.com/PratyayPB/Vaultex",
    skills: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Appwrite",
      "shadcn/ui",
      "Recharts",
    ],
    description: `Cloud-based file storage and management platform providing secure file hosting, organization, and fine-grained sharing capabilities.

Features include:
- Passwordless OTP-based email authentication powered by Appwrite
- Multi-format file management supporting documents, images, media, and other files
- Granular email-based file sharing with dynamic access control permissions
- Real-time visual storage analytics and usage breakdown powered by Recharts
- Instant search, multi-criteria sorting, and category-based navigation
- Modern, responsive dashboard engineered with Next.js App Router and shadcn/ui`,
  },

  {
    id: "gocart",
    title: "GoCart",
    logo: "/assets/project-logos/gocart.png",
    period: {
      start: "12.2025",
      end: "02.2026",
    },
    link: "https://go-cart-one-neon.vercel.app/",
    github: "https://github.com/PratyayPB/GoCart",
    skills: [
      "Next.js 15",
      "React 19",
      "Tailwind CSS",
      "Prisma & Neon",
      "Stripe",
      "Clerk Auth",
      "Gemini API",
    ],
    description:
      "E-commerce platform built with Next.js, featuring user authentication, secure payments, AI integration, and background processing.\n\nFeatures include:\n- Secure user authentication via Clerk (Google OAuth)\n- Seamless checkout and payment processing integrated with Stripe\n- AI-powered store features using the Gemini API\n- Scalable serverless PostgreSQL database with Neon and Prisma ORM\n- Optimized product image storage and CDN delivery via ImageKit\n- Reliable asynchronous background tasks powered by Inngest\n- Comprehensive admin dashboard with analytics using Recharts",
  },

  {
    id: "get-me-chai",
    title: "Get Me Chai",
    logo: "/assets/project-logos/tea.gif",
    period: {
      start: "9.2025",
      end: "10.2025",
    },
    link: "https://get-me-chai-one.vercel.app/",
    github: "https://github.com/PratyayPB/GetMeChai",
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "MongoDB",
      "Razorpay API",
      "NextAuth.js",
    ],
    description: `Responsive crowdfunding platform enabling creators and developers to receive financial support from their audience.

Features include:
- Secure payment processing integrated with the Razorpay API
- Social authentication via NextAuth (GitHub providers)
- Real-time data persistence using MongoDB and Mongoose
- Dedicated creator profiles with shareable payment links
- Modern Next.js App Router architecture utilizing Server Actions
- Fully responsive creator dashboard styled with Tailwind CSS`,
  },
  {
    id: "tuitora",
    title: "Tuitora",
    logo: "/assets/project-logos/tuitora.png",
    period: {
      start: "08.2026",
      end: "09.2026",
    },
    link: "https://tuitora.vercel.app/",
    github: "https://github.com/PratyayPB/tuitora",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "Clerk Auth",
      "REST API",
    ],
    description: `Full-stack hyper-local platform connecting students and parents with qualified home tutors across Dibrugarh, Assam.

Features include:
- Hyper-local search and filtering by Dibrugarh localities, subjects, and classes
- Role-based dashboards tailored for Students, Teachers, and Administrators
- Direct tuition inquiry workflow with live status tracking
- Teacher profile management with subject offerings and availability toggles
- Secure authentication and automated user sync powered by Clerk & Svix webhooks
- Admin moderation suite for tutor verification, reports, and platform statistics`,
  },
  {
    id: "gemini-clone",
    title: "Gemini Clone",
    logo: "/assets/project-logos/google-gemini.png",
    period: {
      start: "04.2025",
      end: "05.2025",
    },
    link: "https://gemini-clone-demo.vercel.app/",
    github: "https://github.com/PratyayPB/Gemini-Clone",
    skills: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Gemini API",
      "React Context",
      "API Integration",
    ],
    description: `Responsive Gemini frontend clone replicating the core interaction experience of an AI-powered chat platform.

Features include:
- Real-time AI responses powered by the Gemini LLM API
- Dynamic prompt handling and chat interactions
- Recent prompt history using React Context
- Responsive UI across desktop and mobile devices
- Clean and modern AI chat interface
- Scalable frontend architecture with reusable React components`,
  },
  {
    id: "spotify-clone",
    logo: "/assets/project-logos/spotify.png",
    title: "Spotify Clone",
    period: {
      start: "03.2025",
      end: "04.2025",
    },
    link: "https://spotify-clone-self-seven.vercel.app/",
    github: "https://github.com/PratyayPB/spotify-clone",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "DOM Manipulation",
      "Dynamic Content Rendering",
    ],
    description: `Feature-rich Spotify frontend clone focused on an interactive music browsing and playback experience.

Features include:
- Dynamic fetching and rendering of songs and albums
- Browse and explore tracks from selected albums
- Interactive music player controls
- Volume control
- Play Next and Play Previous functionality
- Dynamic content handling using pure JavaScript`,
  },
];
