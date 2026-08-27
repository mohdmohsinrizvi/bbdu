"use client";

import { cn } from "@/lib/utils";

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-border/60",
        className
      )}
    />
  );
}

export function SubjectCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between">
        <SkeletonBlock className="h-10 w-16" />
        <SkeletonBlock className="h-5 w-16 rounded-md" />
      </div>
      <SkeletonBlock className="mt-3 h-4 w-3/4" />
      <SkeletonBlock className="mt-2 h-3 w-1/2" />
      <div className="mt-3 flex items-center gap-3">
        <SkeletonBlock className="h-1.5 flex-1 rounded-full" />
        <SkeletonBlock className="h-3 w-8" />
      </div>
    </div>
  );
}

export function TopicCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3">
      <SkeletonBlock className="h-5 w-5 shrink-0 rounded-full" />
      <div className="flex-1">
        <SkeletonBlock className="h-3.5 w-3/4" />
        <SkeletonBlock className="mt-1.5 h-2.5 w-1/2" />
      </div>
    </div>
  );
}

export function UnitCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <SkeletonBlock className="h-8 w-8 shrink-0 rounded-lg" />
        <div className="flex-1">
          <SkeletonBlock className="h-4 w-2/3" />
          <SkeletonBlock className="mt-1.5 h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <TopicCardSkeleton />
        <TopicCardSkeleton />
        <TopicCardSkeleton />
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg bg-surface-hover p-3">
          <SkeletonBlock className="h-8 w-8 shrink-0 rounded-lg" />
          <div className="flex-1">
            <SkeletonBlock className="h-3.5 w-2/3" />
            <SkeletonBlock className="mt-1.5 h-2.5 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function VideoCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="aspect-video rounded-lg bg-border/40" />
      <div className="mt-2 space-y-1.5">
        <SkeletonBlock className="h-3.5 w-4/5" />
        <SkeletonBlock className="h-2.5 w-1/3" />
      </div>
    </div>
  );
}

export function ProgressPageSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonBlock className="h-8 w-48" />
      <SkeletonBlock className="h-4 w-64" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SubjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
