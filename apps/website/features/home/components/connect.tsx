'use client';

import { ArrowUpRight } from 'lucide-react';
import { USER } from '@/config/user';
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from '@repo/design-system/components/ui/panel';
import { BorderGlow } from '@repo/design-system/components/ui/border-glow';
import * as React from 'react';

export function Connect() {
  const socialLinks = [
    { label: 'Github', url: USER.social.github },
    { label: 'Twitter', url: USER.social.twitter },
    { label: 'LinkedIn', url: USER.social.linkedin },
    { label: 'Instagram', url: USER.social.instagram },
    { label: 'Resume pdf', url: USER.social.resume },
  ].filter((item): item is { label: string; url: string } => Boolean(item.url));

  return (
    <Panel id="connect" className="space-y-4">
      <PanelHeader>
        <PanelTitle>Connect</PanelTitle>
      </PanelHeader>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Feel free to contact me at{' '}
          <a
            href={`mailto:${USER.email}`}
            className="text-foreground underline underline-offset-4 transition-colors hover:text-foreground/80 font-medium"
          >
            {USER.email}
          </a>
        </p>

        <div className="flex flex-wrap gap-2.5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex rounded-full outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BorderGlow
                borderRadius={9999}
                edgeSensitivity={15}
                glowRadius={24}
                glowIntensity={1.2}
                className="rounded-full shadow-xs"
              >
                <div className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-secondary-foreground sm:text-sm">
                  <span>{link.label}</span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground" />
                </div>
              </BorderGlow>
            </a>
          ))}
        </div>
      </div>
    </Panel>
  );
}

