import { Skeleton } from "@/app/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-row gap-4">
      <Skeleton className="h-96 w-2/5" />
      <div className="w-3/5 flex flex-col gap-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  );
}
