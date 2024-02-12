import { fetchBooks } from "@/lib/store/server/books/queries";
import Breadcrumb from "../components/breadcrumb";
import PaginationButton from "../components/pagination-button";
import NotFoundBook from "../components/not-found-book";
import ItemCard from "../components/item-card";

interface ProductPageProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}
const LIMIT_PERPAGE = 10;

export default async function Page({ searchParams }: ProductPageProps) {
  const page = searchParams?.page || "1";
  const search = searchParams?.query || "";
  const { data: books, count } = await fetchBooks({
    limit: LIMIT_PERPAGE,
    pageNum: Number(page),
    searchTerm: search,
  });
  const totalPages = Math.ceil(count / LIMIT_PERPAGE);

  return (
    <main className="main-container">
      <Breadcrumb />
      <div className="flex w-full flex-col justify-center">
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
        <div className="flex w-full items-center justify-center">
          <PaginationButton totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
