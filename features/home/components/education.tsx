'use client';

import { ChevronDownIcon } from 'lucide-react';
import { USER } from '@/config/user';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/design-system/components/ui/collapsible';
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from '@repo/design-system/components/ui/panel';
import { BorderGlow } from '@repo/design-system/components/ui/border-glow';
import { Tag } from '@repo/design-system/components/ui/tag';
import { ProseMono } from '@repo/design-system/components/ui/typography';
import * as React from 'react';

export function Education() {
  if (!USER.education || USER.education.length === 0) {
    return null;
  }

  return (
    <Panel id="education" className="space-y-4">
      <PanelHeader>
        <PanelTitle>Education</PanelTitle>
      </PanelHeader>

      <div className="flex flex-col gap-3">
        {USER.education.map((item) => {
          const hasDetails =
            Boolean(item.description) ||
            Boolean(item.skills && item.skills.length > 0) ||
            Boolean(item.institution) ||
            Boolean(item.period);

          return (
            <Collapsible key={item.id} defaultOpen={item.isExpanded} className="w-full">
              <BorderGlow
                className="w-full"
                borderRadius={16}
                glowRadius={30}
                glowIntensity={1.2}
              >


                <CollapsibleTrigger
                  disabled={!hasDetails}
                  className={cn(
                    'group/trigger flex w-full items-center justify-between gap-4 p-4 text-left transition-all duration-200 select-none',
                    hasDetails ? 'cursor-pointer' : 'cursor-default'
                  )}
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm sm:text-base leading-snug">
                      {item.degree}
                    </h3>
                    {item.institution && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.institution}
                        {item.period && ` · ${item.period.start} — ${item.period.end ?? 'Present'}`}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 text-muted-foreground transition-transform duration-300 ease-in-out group-data-[state=open]/trigger:rotate-180">
                    <ChevronDownIcon className="size-4" />
                  </div>
                </CollapsibleTrigger>

                {hasDetails && (
                  <CollapsibleContent>
                    <div className="space-y-3 border-t border-border/40 p-4 pt-3 text-sm">
                      {item.period && !item.institution && (
                        <p className="text-xs text-muted-foreground">
                          {item.period.start} — {item.period.end ?? 'Present'}
                        </p>
                      )}
                      {item.description && (
                        <ProseMono className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </ProseMono>
                      )}
                      {item.skills && item.skills.length > 0 && (
                        <ul className="flex flex-wrap gap-1.5 pt-1">
                          {item.skills.map((skill) => (
                            <li key={skill}>
                              <Tag className="transition-all duration-200 hover:scale-105">{skill}</Tag>
                            </li>
                          ))}
                        </ul>
                      )}
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
