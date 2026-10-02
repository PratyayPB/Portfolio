export type ExperiencePositionIcon =
  /** Icon key used to render the position category in the UI. */
  "code" | "design" | "education" | "business" | "idea";

export type ExperiencePosition = {
  id: string;
  title: string;
  /**
   * Employment period of the position.
   * Use "MM.YYYY" or "YYYY" format. Omit `end` for current roles.
   */
  employmentPeriod: {
    /** Start date (e.g., "10.2022" or "2020"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Full-time | Part-time | Contract | Internship, etc. */
  employmentType?: string;
  description?: string;
  /** Key achievements and responsibilities displayed as bullet points in the dropdown. */
  points?: string[];
  /** UI icon to represent the role type. */
  icon?: ExperiencePositionIcon;
  skills?: string[];
  /** Whether the position is expanded by default in the UI. */
  isExpanded?: boolean;
};

export type Experience = {
  id: string;
  companyName: string;
  companyUrl: string;
  city: string;
  /** URL to the company logo (absolute URL or path under /public). */
  companyLogo?: string;
  /** Roles held at this company; keep newest first for display. */
  positions: ExperiencePosition[];
  /** Marks the company as the current employer for highlighting. */
  isCurrentEmployer?: boolean;
};

export const experiences: Experience[] = [
  {
    id: "codemate",
    companyName: "CodeMate Club",
    companyUrl: "https://codematenehu.tech",
    city: "Shillong",
    companyLogo: "https://ik.imagekit.io/ulycoljug/CM_Logo1_noBg.png",
    positions: [
      {
        id: "Full Stack Developer",
        title: "Fullstack Developer",
        employmentType: "Flexible",
        employmentPeriod: {
          start: "March 2026",
          end: "Present",
        },
        points: [
          "Migrated the platform from a client-side React SPA to a full-stack serverless Next.js (App Router) application, and built the backend using PostgreSQL, Prisma ORM, and server-side data handling. This was done to keep the frontend and backend in one codebase, improve SEO, and reduce redundant client-side data fetching, resulting in a more maintainable and scalable application.",

          "Implemented Incremental Static Regeneration (ISR) with data caching and on-demand revalidation using Next.js caching features. This approach was chosen to serve frequently accessed public content quickly while avoiding unnecessary database requests, improving page response times and ensuring CMS updates are reflected without rebuilding the entire application.",

          "Developed the Admin and Superadmin CMS dashboards with role-based access control using Clerk authentication and database-level permission checks. This approach was used to ensure that only authorized users could access administrative features and perform specific actions, making it easier for the team to manage events, galleries, resources, and alumni data without modifying the codebase.",

          "Built responsive Resources and Alumni directory pages with category filtering, metadata, and downloadable content. This approach was used to organize information in a structured and user-friendly way, making it easier for students to find learning resources and connect with alumni while simplifying content management for administrators.",

          "Integrated Resend's REST API to handle transactional emails for contact form submissions, including team notifications and user confirmation emails. An API-based approach was chosen because it works well with serverless applications and avoids common SMTP connection issues, resulting in a more reliable and automated email communication process.",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
];
