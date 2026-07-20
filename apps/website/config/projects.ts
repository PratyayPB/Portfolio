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
    id: 'gocart',
    title: 'GoCart',
    period: {
      start: '06.2026',
    },
    link: 'https://go-cart-one-neon.vercel.app/',
    github: 'https://github.com/PratyayPB/GoCart',
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Prisma',
      'Tailwind CSS',
      'Stripe',
    ],
    description: `Modern full-stack e-commerce platform built with scalable architecture.

Features include:
- Customer, vendor, and admin dashboards
- Product and inventory management
- Secure authentication and checkout
- Stripe payment integration
- Order management and analytics`,
  },
  {
    id: 'vaultex',
    title: 'Vaultex',
    period: {
      start: '05.2026',
    },
    link: 'https://vaultex-phi.vercel.app/',
    github: 'https://github.com/PratyayPB/Vaultex',
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Appwrite',
      'Storage',
    ],
    description: `Cloud-based file management platform focused on speed and usability.

Features include:
- Secure file upload and storage
- File organization and management
- Fast debounced search
- Responsive dashboard interface
- Storage analytics and file sharing`,
  },
  {
    id: 'pathpolish',
    title: 'PathPolish',
    period: {
      start: '03.2026',
    },
    link: 'https://pathpolish-client.vercel.app/',
    github: 'https://github.com/PratyayPB/PathPolish',
    skills: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Gemini API',
      'AI',
    ],
    description: `AI-powered career guidance platform that helps users prepare for their dream careers.

Features include:
- Personalized AI career roadmaps
- AI interview simulator
- Skill gap analysis
- Learning recommendations
- Dynamic career planning`,
  },
  {
    id: 'get-me-chai',
    title: 'GetMeChai',
    period: {
      start: '02.2026',
    },
    link: 'https://get-me-chai-one.vercel.app/',
    github: 'https://github.com/PratyayPB/GetMeChai',
    skills: [
      'Next.js',
      'React',
      'Node.js',
      'MongoDB',
      'Razorpay',
      'Authentication',
    ],
    description: `Creator monetization platform inspired by Buy Me a Coffee.

Features include:
- Creator profiles and dashboards
- Razorpay payment integration
- Supporter management
- Authentication and user accounts
- Secure donation workflow`,
  },{
    id: 'ghost-ai',
    title: 'Ghost AI',
    period: {
      start: '07.2026',
    },
    link: 'https://ghost-ai-eta.vercel.app/',
    github: 'https://github.com/PratyayPB/Ghost-AI',
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Liveblocks',
      'React Flow',
      'Prisma',
      'PostgreSQL',
      'Trigger.dev',
      'OpenAI',
    ],
    description: `AI-powered collaborative system design platform that transforms natural language into interactive software architectures.

Features include:
- AI-generated system architecture diagrams
- Real-time collaborative canvas with Liveblocks
- Interactive node editing using React Flow
- Automated technical specification generation
- Project management and persistent cloud storage`,
    isExpanded: true,
  }
];