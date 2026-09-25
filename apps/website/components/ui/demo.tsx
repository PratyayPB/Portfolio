"use client";

import GreetingPreloader from "@/components/ui/components-preloaders-greetings";

export default function GreetingPreloaderDemo() {
  return (
    <div className="relative w-full h-screen bg-background">
      <GreetingPreloader fullPage={false} />
    </div>
  );
}
