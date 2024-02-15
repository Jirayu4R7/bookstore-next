import HeroSection from "@/app/components/home/hero-section";
// import CategoriesSection from "./categories/categories-section";
// import { Suspense } from "react";
// import { Skeleton } from "./components/ui/skeleton";
import BooksSection from "./components/home/books-section";

export default function Home() {
  // TODO: initial books data
  return (
    <main>
      <div>
        <HeroSection />
        <BooksSection />
        {/* <Suspense fallback={<Skeleton className="h-[450px] w-full" />}>
          <div id="books" className="mx-auto max-w-6xl px-4 py-6 md:px-8">
            <CategoriesSection />
          </div>
        </Suspense> */}
      </div>
    </main>
  );
}
