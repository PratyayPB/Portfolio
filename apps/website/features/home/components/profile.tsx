"use client";

import { ProfileImage } from "@/components/profile-image";
import { USER } from "@/config/user";
import { FlipSentences } from "@repo/design-system/components/ui/flip-sentences";

const NAV_ITEMS = [
  { label: "-Projects", id: "projects" },
  { label: "-Skills", id: "skills" },
  { label: "-Work Experience", id: "work-experience" },
  { label: "-Education", id: "education" },
];

export function Profile() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 ">
      <ProfileImage className="size-[250px] sm:size-[250px]" />
      <div className="space-y-2  ">
        <div className="flex space-x-2">
          <h1
            className="font-mono font-semibold text-3xl sm:text-3xl"
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            }}
          >
            PRATYAY PRATIM BORAH
          </h1>
        </div>
        <div>
          <FlipSentences sentences={USER.flipSentences} />
        </div>
        <div className="page-nav flex flex-col items-start gap-y-2 pt-3 font-x text-sm">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(item.id);
              }}
              className="inline-flex items-center text-sm font-x text-neutral-600 dark:text-neutral-400 transition-all duration-200 hover:text-black dark:hover:text-white hover:translate-x-1 cursor-pointer select-none"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
