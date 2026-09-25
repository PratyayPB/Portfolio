import { BoxIcon, InfinityIcon, LinkIcon } from "lucide-react";
import Image from "next/image";

import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import type { Project } from "@/config/projects";
import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/lib/url";
import { cn } from "@/lib/utils";
import { BorderGlow } from "@repo/design-system/components/ui/border-glow";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@repo/design-system/components/ui/collapsible";
import { Tag } from "@repo/design-system/components/ui/tag";
import { TooltipWrapper } from "@repo/design-system/components/ui/tooltip";
import { ProseMono } from "@repo/design-system/components/ui/typography";

export function ProjectItem({
  className,
  project,
  isFirst = false,
  isLast = false,
}: {
  className?: string;
  project: Project;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  const { start, end } = project.period;
  const isOngoing = !end;
  const isSinglePeriod = end === start;
  const isExpanded = project.isExpanded ?? false;

  return (
    <CollapsibleWithContext defaultOpen={isExpanded}>
      <div className={cn("group/item mb-3", className)}>
        <BorderGlow
          className="w-full"
          borderRadius={16}
          glowRadius={30}
          glowIntensity={1.2}
        >
          <div className="flex items-center">
            {project.logo ? (
              <Image
                src={project.logo}
                alt={project.title}
                width={32}
                height={32}
                quality={100}
                className="mx-4 flex size-6 shrink-0 select-none"
                unoptimized
                aria-hidden="true"
              />
            ) : (
              <div
                className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none"
                aria-hidden="true"
              >
                <BoxIcon className="size-4" />
              </div>
            )}

            <div className="flex-1">
              <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 pr-2 text-left">
                <div className="flex-1">
                  <h3 className="mb-1 leading-snug font-medium text-balance">
                    {project.title}
                  </h3>
                  <dl className="text-sm text-muted-foreground">
                    <dt className="sr-only">Period</dt>
                    <dd className="flex items-center gap-0.5">
                      <span>{start}</span>
                      {!isSinglePeriod && (
                        <>
                          <span className="font-mono">—</span>
                          {isOngoing ? (
                            <>
                              <InfinityIcon
                                className="size-4.5 translate-y-[0.5px]"
                                aria-hidden
                              />
                              <span className="sr-only">Present</span>
                            </>
                          ) : (
                            <span>{end}</span>
                          )}
                        </>
                      )}
                    </dd>
                  </dl>
                </div>
                {project.github && (
                  <TooltipWrapper content="Open Github Link">
                    <a
                      className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Icons.github className="pointer-events-none size-4" />
                    </a>
                  </TooltipWrapper>
                )}
                <TooltipWrapper content="Open Project Link">
                  <a
                    className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                    href={addQueryParams(project.link, UTM_PARAMS)}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <LinkIcon className="pointer-events-none size-4" />
                  </a>
                </TooltipWrapper>
                <div
                  className="shrink-0 text-muted-foreground [&_svg]:size-4"
                  aria-hidden
                >
                  <CollapsibleChevronsIcon />
                </div>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent className="group/content overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <div className="border-t border-border/40">
              <div className="space-y-4 p-4 duration-300 group-data-[state=closed]/content:animate-fade-out group-data-[state=open]/content:animate-fade-in">
                {project.description && (
                  <ProseMono>
                    <Markdown>{project.description}</Markdown>
                  </ProseMono>
                )}

                {project.skills.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5">
                    {project.skills.map((skill, index) => (
                      <li key={index} className="flex">
                        <Tag>{skill}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </BorderGlow>
      </div>
    </CollapsibleWithContext>
  );
}
