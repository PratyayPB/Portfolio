'use client';

import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Provider as JotaiProvider } from 'jotai';
import { TooltipProvider } from '@repo/design-system/components/ui/tooltip';

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <JotaiProvider>
        <TooltipProvider delayDuration={0}>
          {children}
        </TooltipProvider>
        <Analytics />
        <SpeedInsights />
      </JotaiProvider>
    </ThemeProvider>
  );
}
