'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import {
  Dock,
  DockIcon,
  DockIconActiveDot,
} from '@/components/shared/compoenents/floating-dock';
import { analytics } from '@/lib/analytics';
import { DockConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import ModeToggle from './mode-toggle';

const DOCK_AUTOHIDE_TIMEOUT = 5_000;

function BottomDock({ className }: { className: string }) {
  const [active, setActive] = useState(true);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to determine if a dock item should be active
  const isItemActive = (itemHref: string) => {
    // For the home route "/", only match exactly
    if (itemHref === '/') {
      return pathname === '/';
    }
    // For all other routes, match if current path starts with the item href
    return pathname.startsWith(itemHref);
  };

  // const { data: session } = useSession();

  const startTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear any existing timeout
      timeoutRef.current = setTimeout(() => {
        setActive(false);
      }, DOCK_AUTOHIDE_TIMEOUT);
    }
  };

  useEffect(() => {
    startTimeout();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      onMouseEnter={() => {
        setActive(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current); // Clear timeout when mouse enters
        }
      }}
      onMouseLeave={() => {
        startTimeout(); // Start timeout when mouse leaves
      }}
      className={cn(
        '-translate-x-1/2 fixed bottom-0 left-1/2 z-40 h-[clamp(80px,10vh,200px)] w-full',
        className
      )}
    >
      <div className="mask-[linear-gradient(to_top,#000_25%,transparent)] absolute top-0 left-0 h-full w-full backdrop-blur-sm [-webkit-mask-image:linear-gradient(to_top,#000_25%,transparent)]" />
      <Dock
        className={cn('transition-all duration-300', {
          '-bottom-18': !active,
        })}
      >
        {DockConfig.navbar.map((item) => (
          <DockIcon key={item.label} title={item.label}>
            <Link
              href={item.href}
              className="flex size-full items-center justify-center transition-transform duration-200 hover:scale-115 active:scale-90"
              onClick={() => analytics.trackNavClick(item.href, item.label)}
            >
              <item.icon className="size-4" />
            </Link>
            {isItemActive(item.href) && (
              <DockIconActiveDot isActive={isItemActive(item.href)} />
            )}
          </DockIcon>
        ))}
        <DockSeperator />
        {Object.entries(DockConfig.contact.social).map(([name, social]) => (
          <DockIcon key={name} title={name}>
            <Link
              href={social.url}
              target="_blank"
              className="flex size-full items-center justify-center transition-transform duration-200 hover:scale-115 active:scale-90"
              onClick={() => {
                if (social.url.startsWith('mailto:')) {
                  const email = social.url.replace('mailto:', '');
                  analytics.trackEmailLinkClick(email);
                } else {
                  analytics.trackSocialLinkClick(name, social.url);
                }
              }}
            >
              <social.icon className="size-4" />
            </Link>
          </DockIcon>
        ))}
        <DockIcon title={'Theme'}>
          <ModeToggle />
        </DockIcon>

       
      </Dock>
    </div>
  );
}

function DockSeperator() {
  return (
    <hr className="mask-gradient h-[36px] w-px shrink-0 border-0 bg-gray-400/50" />
  );
}

export default BottomDock;
