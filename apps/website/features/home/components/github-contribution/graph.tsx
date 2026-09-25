"use client";

import { LoaderIcon } from "lucide-react";
import { use } from "react";

import type { Activity } from "@repo/design-system/components/ui/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@repo/design-system/components/ui/contribution-graph";

export function GitHubContributionGraph({
  contributions,
}: {
  contributions: Promise<Activity[]>;
}) {
  const data = use(contributions);

  return (
    <div className="w-full max-w-full overflow-x-auto no-scrollbar py-1">
      <ContributionGraph
        className="mx-auto font-mono min-w-max"
        data={data}
        fontSize={12}
        blockSize={12}
        blockMargin={3}
      >
        <ContributionGraphCalendar className="no-scrollbar">
          {({ activity, dayIndex, weekIndex }) => (
            <ContributionGraphBlock
              activity={activity}
              dayIndex={dayIndex}
              weekIndex={weekIndex}
            />
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="">
          <ContributionGraphTotalCount className="text-foreground" />
          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </div>
  );
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-[162px] items-center justify-center">
      <LoaderIcon className="animate-spin text-foreground" />
    </div>
  );
}
