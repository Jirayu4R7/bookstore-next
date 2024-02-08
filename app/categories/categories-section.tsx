import { fetchCategories } from "@/lib/store/server/categories/queries";
import { fetchBooksByCategory } from "@/lib/store/server/books/queries";
import Link from "next/link";
import CaretDownIcon from "@/app/components/icons/CaretDownIcon";
import BookRow from "../components/book-row";
import { Skeleton } from "../components/ui/skeleton";
import { Separator } from "../components/ui/separator";

export default async function CategoriesSection() {
  const page = 1;
  const categories = (await fetchCategories({ page })) || [];

  return (
    <>
      {categories.length > 0 ? (
        await Promise.all(
          categories.map(async ({ title, slug }) => {
            const books = await fetchBooksByCategory({
              page: 1,
              categorySlug: slug,
            });
            if (books === null) {
              return <Skeleton className="w-full h-12" />;
            }
            return (
              <section key={slug} className="pb-6">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-serif text-2xl font-medium capitalize md:text-2xl">
                    {title}
                  </h2>
                  {books.length > 0 && <SeeAll href={`/categories/${slug}`} />}
                </div>
                <Separator />
                <BookRow key={slug} slug={slug} books={books} />
                <div className="mt-8 flex items-center justify-center md:hidden">
                  <SeeAll href={`/categories/${slug}`} bottom />
                </div>
              </section>
            );
          })
        )
      ) : (
        <Skeleton className="w-full h-48" />
      )}
    </>
  );
}

type SeeAllType = {
  href: string;
  bottom?: boolean;
};

const SeeAll = ({ href, bottom = false }: SeeAllType) => (
  <Link
    href={href}
    className={`${
      bottom ? "flex" : "hidden md:flex"
    } items-center font-sans font-medium`}
  >
    See All
    <CaretDownIcon className="-rotate-90 scale-75" />
  </Link>
);
