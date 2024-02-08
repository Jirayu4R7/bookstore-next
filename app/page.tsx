import HeroSection from "@/app/components/home/hero-section";
import BooksSection from "@/app/components/home/books-section";
import CategoriesSection from "./categories/categories-section";
import { Suspense } from "react";
import { Skeleton } from "./components/ui/skeleton";

export default function Home() {
  return (
    <main>
      <div>
        <HeroSection />
        <Suspense fallback={<Skeleton className="h-[450px] w-full" />}>
          <div id="books" className="mx-auto max-w-6xl px-4 py-6 md:px-8">
            <CategoriesSection />
          </div>
        </Suspense>
        {/* <BooksSection /> */}
      </div>
    </main>
  );
}
