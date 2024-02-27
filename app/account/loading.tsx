import { Skeleton } from "@/app/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="main-container">
      <div className="my-8 flex flex-col gap-4 divide-skin-gray md:flex-row">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    </main>
  );
}
