import { ChevronDownIcon } from "lucide-react";
import { Slot as SlotPrimitive } from "radix-ui";
import React from "react";

import { Button } from "@repo/design-system/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/design-system/components/ui/collapsible";

const Slot = SlotPrimitive.Slot;

export function CollapsibleList<T>({
  items,
  max = 3,
  keyExtractor,
  renderItem,
}: {
  items: T[];
  max?: number;
  keyExtractor?: (item: T) => string;
  renderItem: (item: T, isFirst: boolean, isLast: boolean) => React.ReactNode;
}) {
  const totalItems = items.length;

  return (
    <Collapsible>
      {items.slice(0, max).map((item, index) => (
        <Slot
          key={typeof keyExtractor === "function" ? keyExtractor(item) : index}
          className=""
        >
          {renderItem(item, index === 0, index === totalItems - 1)}
        </Slot>
      ))}

      <CollapsibleContent>
        {items.slice(max).map((item, index) => (
          <Slot
            key={
              typeof keyExtractor === "function"
                ? keyExtractor(item)
                : max + index
            }
            className=""
          >
            {renderItem(item, false, max + index === totalItems - 1)}
          </Slot>
        ))}
      </CollapsibleContent>

      {items.length > max && (
        <div className="flex h-14 items-center justify-center pt-2">
          <CollapsibleTrigger asChild>
            <Button
              className="group/collapsible-trigger flex items-center gap-2 px-5 py-2 transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.97] cursor-pointer border border-border/80 bg-zinc-100/90 text-zinc-900 shadow-xs hover:bg-zinc-200/80 hover:text-zinc-950 hover:shadow-sm dark:border-transparent dark:bg-linear-to-b dark:from-zinc-600 dark:to-zinc-700 dark:text-white dark:inset-shadow-[1px_1px_1px,0px_0px_2px] dark:inset-shadow-white/20 dark:hover:to-zinc-600"
              variant="default"
            >
              <span className="group-data-[state=closed]/collapsible-trigger:inline group-data-[state=open]/collapsible-trigger:hidden transition-all duration-200">
                Show More
              </span>
              <span className="group-data-[state=open]/collapsible-trigger:inline group-data-[state=closed]/collapsible-trigger:hidden transition-all duration-200">
                Show Less
              </span>
              <ChevronDownIcon
                className="size-4 text-zinc-500 group-hover/collapsible-trigger:text-zinc-900 dark:text-zinc-300 dark:group-hover/collapsible-trigger:text-white transition-transform duration-300 ease-in-out group-data-[state=open]/collapsible-trigger:rotate-180"
                aria-hidden
              />
            </Button>
          </CollapsibleTrigger>
        </div>
      )}
    </Collapsible>
  );
}
