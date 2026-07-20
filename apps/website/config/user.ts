import { type Experience, experiences } from './experience';

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
  };
  image: {
    profile: string;
  };
  flipSentences: string[];
  experiences?: Experience[];
};

const USER: User = {
  firstName: 'Pratyay Pratim',
  lastName: 'Borah',
  name: 'Pratyay Pratim Borah',
  email: 'pratyayborah2005@gmail.com',
  domain: 'https://github.com/PratyayPB',
  jobTitle: 'Full Stack Web Developer',
  username: 'PratyayPB',
  tagline: 'Portfolio Site',
  // twitterHandle: '@bucha.ritesh',
  location: 'Shillong, India',
  description:
    "What I'm learning about shipping great products, becoming a better developer, and growing a career in tech.",
  // namePronunciationUrl: 'https://bucharitesh.in/assets/ritesh-bucha.mp3',
  social: {
    github: 'https://github.com/PratyayPB',
    linkedin: 'https://www.linkedin.com/in/pratyaypratimborah/',
  },
  flipSentences: [
  'Full Stack Developer',
  'Building products for the web.',
  'Turning ideas into experiences.',
  'Learning. Building. Shipping.',
  'Creating impactful web experiences.',
  
  ],
  image: {
    profile:
      'https://ik.imagekit.io/ulycoljug/28204ca4-d313-4b59-b761-f573cc1c599e.png',
  },
  experiences: experiences,
};

USER.website = `https://${USER.domain}`;

export { USER };
