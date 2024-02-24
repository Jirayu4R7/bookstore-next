import { Skeleton } from "@/app/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Skeleton className="h-40 w-full md:h-96 md:w-2/5" />
      <div className="flex w-full flex-col gap-4 md:w-3/5">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  );
}
