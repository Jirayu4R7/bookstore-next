import Link from "next/link";
import CaretDownIcon from "@/app/components/icons/CaretDownIcon";
import BookRow from "../book-row";
import { fetchBooksByCategory } from "@/lib/store/server/books/queries";
import { fetchCategories } from "@/lib/store/server/categories/queries";

const BooksSection = async () => {
  const page = 1;
  const categories = await fetchCategories({ page });

  return (
    <div id="books" className="py-14">
      {await Promise.all(
        categories.map(async ({ title, slug }) => {
          const books = await fetchBooksByCategory({
            page: 1,
            categorySlug: slug,
          });
          return (
            <section key={slug} className="mx-auto max-w-6xl px-4 py-6 md:px-8">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-2xl font-medium capitalize md:text-2xl">
                  {title}
                </h2>
                <SeeAll href={`/categories/${slug}`} />
              </div>{" "}
              <BookRow slug={slug} books={books ?? []} />
              <div className="mt-8 flex items-center justify-center md:hidden">
                <SeeAll href={`/categories/${slug}`} bottom />
              </div>
            </section>
          );
        })
      )}
    </div>
  );
};

type SeeAllType = {
  href: string;
  bottom?: boolean;
};

export const SeeAll = ({ href, bottom = false }: SeeAllType) => (
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

export default BooksSection;
