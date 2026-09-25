import { type EducationItem, education } from "./education";
import { type Experience, experiences } from "./experience";

export type User = {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  location: string;
  domain: string;
  website?: string;
  description: string;
  jobTitle: string;
  // twitterHandle: string;
  // namePronunciationUrl: string;
  username: string;
  tagline: string;
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
    instagram?: string;
    resume?: string;
  };
  image: {
    profile: string;
    profileDark?: string;
    profileLight?: string;
  };
  flipSentences: string[];
  experiences?: Experience[];
  education?: EducationItem[];
};

const USER: User = {
  firstName: "Pratyay Pratim",
  lastName: "Borah",
  name: "Pratyay Pratim Borah",
  email: "pratyayborah2005@gmail.com",
  domain: "https://github.com/PratyayPB",
  jobTitle: "Full Stack Web Developer",
  username: "PratyayPB",
  tagline: "Portfolio Site",
  // twitterHandle: '@bucha.ritesh',
  location: "Shillong, India",
  description:
    "What I'm learning about shipping great products, becoming a better developer, and growing a career in tech.",
  // namePronunciationUrl: 'https://bucharitesh.in/assets/ritesh-bucha.mp3',
  social: {
    github: "https://github.com/PratyayPB",
    linkedin: "https://www.linkedin.com/in/pratyaypratimborah/",
    twitter: "https://twitter.com/PratyayPB",
    instagram: "https://instagram.com/PratyayPB",
    resume: "https://drive.google.com",
  },
  flipSentences: [
    "Building products for the web.",
    "Turning ideas into experiences.",
    "Learning. Building. Shipping.",
    "Creating impactful web experiences.",
  ],
  image: {
    profile: "https://ik.imagekit.io/ulycoljug/image_fd9b8bf3.jpg",
    profileDark: "https://ik.imagekit.io/ulycoljug/image_fd9b8bf3.jpg",
    profileLight: "https://ik.imagekit.io/ulycoljug/28204ca4-d313-4b59-b761-f573cc1c599e.png",
  },
  experiences: experiences,
  education: education,
};

USER.website = `https://${USER.domain}`;

export { USER };
