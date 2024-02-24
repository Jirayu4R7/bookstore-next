import { Skeleton } from "@/app/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="main-container">
      <div className="cards-container">
        {Array.from({ length: 10 }, (_, index) => (
          <Skeleton key={index} className="h-64 w-full" />
        ))}
      </div>
    </main>
  );
}
