"use client";

import { BriefcaseIcon, ChevronDownIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { USER } from "@/config/user";
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
  PanelTitleSup,
} from "@repo/design-system/components/ui/panel";
import { BorderGlow } from "@repo/design-system/components/ui/border-glow";
import { Tag } from "@repo/design-system/components/ui/tag";
import { ProseMono } from "@repo/design-system/components/ui/typography";
import * as React from "react";

export function WorkEx() {
  const experiences = USER.experiences;

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <Panel id="work-experience" className="space-y-4">
      <PanelHeader>
        <PanelTitle>
          Work Experience
          <PanelTitleSup>({experiences.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="flex flex-col gap-3">
        {experiences.map((exp) => {
          const primaryPosition = exp.positions[0];
          const hasMultiplePositions = exp.positions.length > 1;
          const hasDetails = exp.positions.some(
            (p) =>
              Boolean(p.description) ||
              (p.skills && p.skills.length > 0) ||
              (p.points && p.points.length > 0),
          );

          return (
            <Collapsible
              key={exp.id}
              defaultOpen={exp.isCurrentEmployer}
              className="w-full"
            >
              <BorderGlow
                className="w-full"
                borderRadius={16}
                glowRadius={30}
                glowIntensity={1.2}
              >
                <CollapsibleTrigger className="group/trigger flex w-full items-start justify-between gap-4 p-4 text-left transition-colors">
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {exp.companyLogo ? (
                      <Image
                        src={exp.companyLogo}
                        alt={exp.companyName}
                        width={36}
                        height={36}
                        className="size-9 shrink-0 rounded-lg object-contain bg-neutral-900/40 p-1 border border-border/50"
                        unoptimized
                        aria-hidden="true"
                        onError={(e) => {
                          // Fallback on image load error
                          (e.currentTarget as HTMLElement).style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted text-muted-foreground"
                        aria-hidden="true"
                      >
                        <BriefcaseIcon className="size-4" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground text-sm sm:text-base leading-snug truncate">
                          {primaryPosition
                            ? primaryPosition.title
                            : exp.companyName}
                        </h3>
                      </div>

                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/80">
                          {exp.companyName}
                        </span>
                        <span>·</span>
                        <span>{exp.city}</span>
                        {primaryPosition?.employmentPeriod && (
                          <>
                            <span>·</span>
                            <span>
                              {primaryPosition.employmentPeriod.start} —{" "}
                              {primaryPosition.employmentPeriod.end ??
                                "Present"}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {exp.companyUrl && (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(e) => e.stopPropagation()}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        aria-label={`Visit ${exp.companyName} website`}
                      >
                        <ExternalLinkIcon className="size-3.5" />
                      </a>
                    )}
                    <div className="text-muted-foreground transition-transform duration-200 group-data-[state=open]/trigger:rotate-180">
                      <ChevronDownIcon className="size-4" />
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <div className="space-y-4 border-t border-border/40 p-4 pt-3 text-sm">
                    {exp.positions.map((pos, idx) => (
                      <div
                        key={pos.id || idx}
                        className={cn(
                          "space-y-2",
                          idx > 0 && "border-t border-border/20 pt-3",
                        )}
                      >
                        {hasMultiplePositions && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-foreground">
                              {pos.title}
                            </span>
                            <span className="text-muted-foreground">
                              {pos.employmentPeriod.start} —{" "}
                              {pos.employmentPeriod.end ?? "Present"}
                            </span>
                          </div>
                        )}

                        {pos.points && pos.points.length > 0 && (
                          <ul className="space-y-3 pt-1 text-sm text-neutral-700 dark:text-neutral-300">
                            {pos.points.map((point, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 leading-relaxed"
                              >
                                <span
                                  className="mt-2 size-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-400"
                                  aria-hidden="true"
                                />
                                <span className="flex-1 leading-relaxed">
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {pos.description && (
                          <ProseMono className="text-xs text-muted-foreground leading-relaxed">
                            {pos.description}
                          </ProseMono>
                        )}

                        {pos.skills && pos.skills.length > 0 && (
                          <ul className="flex flex-wrap gap-1.5 pt-1">
                            {pos.skills.map((skill) => (
                              <li key={skill}>
                                <Tag>{skill}</Tag>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </BorderGlow>
            </Collapsible>
          );
        })}
      </div>
    </Panel>
  );
}
