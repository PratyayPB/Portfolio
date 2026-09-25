'use client';

import { DesignSystemProvider } from '@repo/design-system';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Provider as JotaiProvider } from 'jotai';

export function Providers({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <DesignSystemProvider defaultTheme="dark" enableSystem={false}>
      <JotaiProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </JotaiProvider>
    </DesignSystemProvider>
  );
}
