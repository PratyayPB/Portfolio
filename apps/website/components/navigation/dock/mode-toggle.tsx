'use client';

import { useTheme } from 'next-themes';
import { useCallback, useRef } from 'react';

import { META_THEME_COLORS } from '@/config/site';
import { analytics } from '@/lib/analytics';
import { useMetaColor } from '@/lib/hooks/use-meta-colors';
import { useSound } from '@/lib/hooks/use-sound';
import { cn } from '@/lib/utils';

export default function ModeToggle({ className }: { className?: string }) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { resolvedTheme, setTheme } = useTheme();
  const { setMetaColor } = useMetaColor();
  const playClick = useSound('/assets/button-click.mp3');

  const switchTheme = useCallback(() => {
    try {
      playClick();
    } catch (e) {
      console.error(e);
    }
    const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Track theme toggle
    analytics.trackThemeToggle(currentTheme, newTheme);

    setTheme(newTheme);
    setMetaColor(
      currentTheme === 'dark' ? META_THEME_COLORS.light : META_THEME_COLORS.dark
    );
  }, [resolvedTheme, setTheme, setMetaColor, playClick]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        'flex h-full w-full items-center justify-center cursor-pointer border-none bg-transparent',
        className
      )}
      onClick={switchTheme}
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-100 hidden dark:block"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange-500 block dark:hidden"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    </button>
  );
}
