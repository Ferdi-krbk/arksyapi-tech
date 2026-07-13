import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
  style?: CSSProperties;
};

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-forest-deep/8 dark:bg-bone/8",
        className,
      )}
      style={style}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="group overflow-hidden block">
      <Skeleton className="w-full aspect-[4/3]" />
      <div className="mt-5 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="block border-t border-forest-deep/20 pt-6">
      <Skeleton className="w-full aspect-[16/10] mb-5" />
      <Skeleton className="h-3 w-20 mb-2" />
      <Skeleton className="h-7 w-3/4" />
      <Skeleton className="h-4 w-full mt-3" />
      <Skeleton className="h-3 w-24 mt-4" />
    </div>
  );
}

export function GalleryGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-full break-inside-avoid"
          style={{ height: `${160 + (i % 3) * 60}px` }}
        />
      ))}
    </div>
  );
}

export function ServicePageSkeleton() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-12 gap-6 items-end">
        <Skeleton className="col-span-1 h-4" />
        <div className="col-span-11 space-y-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-14 w-2/3" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>
      <Skeleton className="w-full aspect-[16/9] max-h-[70vh]" />
    </div>
  );
}
