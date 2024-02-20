import ItemCard from "@/app/components/item-card";
import NotFoundBook from "@/app/components/not-found-book";
import PaginationButton from "@/app/components/pagination-button";
import { fetchBooksByCategory } from "@/lib/store/server/books/queries";
import { Book } from "@/lib/types";

type Props = {
  category: string;
  page: string;
};

const LIMIT_BOOK_IN_CONTAINER = 10;

export default async function BooksContainer({ category, page }: Props) {
  const currentPage = Number(page);
  const { data: books, count } = await fetchBooksByCategory({
    page: currentPage,
    categorySlug: category,
    limit: LIMIT_BOOK_IN_CONTAINER,
  });
  const totalPages = Math.ceil(count / LIMIT_BOOK_IN_CONTAINER);

  if (!books) {
    return <NotFoundBook />;
  }
  return (
    <div>
      {books?.length > 0 ? (
        <div className="cards-container">
          {books?.map((book: Book) => {
            return (
              <ItemCard
                key={book.id}
                className={`${
                  books?.length >= 5
                    ? "last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex"
                    : books?.length === 4
                    ? "sm:last:hidden md:sm:last:flex"
                    : ""
                }`}
                data={book}
              />
            );
          })}
        </div>
      ) : (
        <NotFoundBook />
      )}
      {totalPages > 1 ? (
        <div className="flex w-full items-center justify-center">
          <PaginationButton totalPages={totalPages} />
        </div>
      ) : null}
    </div>
  );
}
