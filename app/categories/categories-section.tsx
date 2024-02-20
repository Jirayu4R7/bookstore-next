import { fetchCategories } from "@/lib/store/server/categories/queries";
import { fetchBooksByCategory } from "@/lib/store/server/books/queries";
import Link from "next/link";
import CaretDownIcon from "@/app/components/icons/CaretDownIcon";
import BookRow from "../components/book-row";
import { Skeleton } from "../components/ui/skeleton";
import { Separator } from "../components/ui/separator";
import { DEFAUL_PAGE_SIZE, LIMIT_SHOW_CATAGORY } from "@/lib/constants";

export default async function CategoriesSection() {
  const { data: categories } = await fetchCategories({
    limit: LIMIT_SHOW_CATAGORY,
  });

  return (
    <>
      {categories.length > 0 ? (
        await Promise.all(
          categories.map(async ({ title, slug }) => {
            const { data: books } = await fetchBooksByCategory({
              categorySlug: slug,
              limit: DEFAUL_PAGE_SIZE,
            });
            if (books === null) {
              return <Skeleton className="h-12 w-full" />;
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
        <Skeleton className="h-48 w-full" />
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
