import { Skeleton } from "@/app/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="main-container">
      <div className="my-8 flex flex-col divide-y-2 divide-skin-gray md:flex-row md:divide-x-2 md:divide-y-0">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    </main>
  );
}
