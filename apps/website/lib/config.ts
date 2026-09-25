import { Icons } from "@/components/icons";
import { USER } from "@/config/user";

export const DockConfig = {
  navbar: [
    { href: "/", icon: Icons.home, label: "Home" },
    // { href: "/blog", icon: Icons.guestbook, label: "Blog" },
    // { href: "/resume", icon: Icons.resume, label: "Resume" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: USER.social.github,
        icon: Icons.github,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: USER.social.linkedin,
        icon: Icons.linkedin,
      },
      email: {
        name: "Send Email",
        url: `mailto:${USER.email}`,
        icon: Icons.email,
      },
      resume: {
        name: "Resume",
        url: "#", //resume host
        icon: Icons.email, //resume icon here
      },
    },
  },
};
