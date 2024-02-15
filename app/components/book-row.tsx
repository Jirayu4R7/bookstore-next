import ItemCard from "@/app/components/item-card";
import CardSkeletons from "@/app/components/loading-ui/card-skeletons";
import NotFoundBook from "@/app/components/not-found-book";
import { Book } from "@/lib/types";

type Props = {
  slug: string;
  books?: Book[];
};

export default function BookRow({ slug, books }: Props) {
  const { isLoading, isError } = { isLoading: false, isError: false };
  if (isLoading || isError) return <CardSkeletons number={5} slug={slug} />;

  if (!books || books.length === 0) {
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
    </div>
  );
}
