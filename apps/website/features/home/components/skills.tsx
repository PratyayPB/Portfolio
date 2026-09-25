"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";
import { skillCategories, type SkillCategory } from "@/config/skills";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/design-system/components/ui/collapsible";
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@repo/design-system/components/ui/panel";
import { BorderGlow } from "@repo/design-system/components/ui/border-glow";

export function Skills() {
  if (!skillCategories || skillCategories.length === 0) {
    return null;
  }

  return (
    <Panel id="skills" className="space-y-4">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <div className="flex flex-col gap-3">
        {skillCategories.map((category: SkillCategory) => {
          const hasSkills = Boolean(
            category.skills && category.skills.length > 0,
          );

          return (
            <Collapsible
              key={category.id}
              defaultOpen={category.isExpanded}
              className="w-full"
            >
              <BorderGlow
                className="w-full"
                borderRadius={16}
                glowRadius={30}
                glowIntensity={1.2}
              >
                <CollapsibleTrigger
                  disabled={!hasSkills}
                  className="group/trigger flex w-full items-center justify-between gap-4 p-4 text-left transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm sm:text-base leading-snug">
                      {category.title}
                    </h3>
                  </div>

                  {hasSkills && (
                    <div className="shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/trigger:rotate-180">
                      <ChevronDownIcon className="size-4" />
                    </div>
                  )}
                </CollapsibleTrigger>

                {hasSkills && (
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="border-t border-border/40 p-4 pt-3">
                      <ul className="flex flex-wrap gap-2.5">
                        {category.skills.map((skill) => (
                          <li key={skill.name}>
                            <div className="inline-flex items-center gap-2.5 rounded-lg border border-border/60 bg-zinc-50/80 px-3 py-2 font-mono text-xs sm:text-sm text-foreground shadow-xs transition-colors hover:bg-zinc-100 dark:bg-zinc-900/60 dark:hover:bg-zinc-900">
                              <div className="flex size-5 shrink-0 items-center justify-center">
                                <Image
                                  src={skill.icon}
                                  alt={skill.name}
                                  width={20}
                                  height={20}
                                  unoptimized
                                  className={cn(
                                    "size-4 sm:size-5 object-contain transition-all",
                                    skill.invertCategory === "dark" &&
                                      "dark:invert",
                                    skill.invertCategory === "light" &&
                                      "invert dark:invert-0",
                                  )}
                                />
                              </div>
                              <span>{skill.name}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleContent>
                )}
              </BorderGlow>
            </Collapsible>
          );
        })}
      </div>
    </Panel>
  );
}

export default Skills;
