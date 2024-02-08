import ItemCard from "@/app/components/item-card";
import NotFoundBook from "@/app/components/not-found-book";
import { fetchBooksByCategory } from "@/lib/store/server/books/queries";

type Props = {
  category: string;
};

export default async function BooksContainer({ category }: Props) {
  const page = 1;
  const books = await fetchBooksByCategory({ page, categorySlug: category });
  if (!books) {
    return <NotFoundBook />;
  }
  return (
    <div>
      {books?.length > 0 ? (
        <div className="cards-container">
          {books?.map((item: any) => {
            return (
              <ItemCard
                key={item.id}
                className={`${
                  books?.length >= 5
                    ? "last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex"
                    : books?.length === 4
                    ? "sm:last:hidden md:sm:last:flex"
                    : ""
                }`}
                data={item}
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
