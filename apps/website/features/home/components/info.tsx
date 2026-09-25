'use client';

import { USER } from '@/config/user';
import { useTime, useWindowSize } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import {
  type TargetAndTransition,
  type Transition,
  motion,
} from 'motion/react';

const fadeIn: {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Info({ show }: { show: string[] }) {
  const { width } = useWindowSize();

  if (width < 1000) {
    return null;
  }

  return (
    <>
      {show.includes('time') && <Time className="top-4 left-4" />}
      {show.includes('screen') && <ScreenSize className="bottom-4 left-4" />}
    </>
  );
}

export function Time({ className }: { className?: string }) {
  const time = useTime();

  return (
    <motion.div
      className={cn(
        'fixed top-4 left-4 z-50 flex items-center font-x text-gray-600 text-xs tracking-wider dark:text-gray-300',
        className
      )}
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      {/* Local backdrop-blur with radial fade spreading around the time text */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -inset-y-5 -z-10 rounded-full dark:bg-background/30 dark:backdrop-blur-md mask-[radial-gradient(ellipse_at_center,#000_25%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_75%)]"
      />
      {time}
    </motion.div>
  );
}



export function ScreenSize({ className }: { className?: string }) {
  const { width, height } = useWindowSize();

  return (
    <motion.div
      className={cn(
        'fixed bottom-4 left-4 z-50 font-x text-gray-600 text-xs tracking-wider dark:text-gray-300',
        className
      )}
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      {width} x {height}
    </motion.div>
  );
}

