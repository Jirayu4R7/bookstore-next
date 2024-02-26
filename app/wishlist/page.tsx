import Breadcrumb from "@/app/components/breadcrumb";
import { fetchMyBooks } from "@/lib/store/server/books/queries";
import NotFoundBook from "@/app/components/not-found-book";
import PaginationButton from "@/app/components/pagination-button";
import ItemCard from "@/app/components/item-card";
import { getToken, fetchInfoMe } from "@/lib/store/server/account/actions";
import Link from "next/link";
import { WishlistBook } from "@/lib/types";

interface PageProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}
const LIMIT_PERPAGE = 10;

export default async function Page({ searchParams }: PageProps) {
  const token = await getToken();
  let user = null;
  if (token) {
    user = await fetchInfoMe(token);
  } else {
    return (
      <div className="main-container">
        <div className="flex flex-col gap-3">
          <NotFoundBook />
          <button
            type="button"
            className="primary-btn-color mx-auto min-w-56 rounded px-8 py-2 font-sans font-medium md:px-5 md:py-1"
          >
            <Link href="/account">Go to Account Page.</Link>
          </button>
        </div>
      </div>
    );
  }
  const page = searchParams?.page || "1";
  const search = user?.id || 0;
  const { data: books, count } = await fetchMyBooks({
    limit: LIMIT_PERPAGE,
    pageNum: Number(page),
    searchTerm: search,
  });
  const totalPages = Math.ceil(count / LIMIT_PERPAGE);

  return (
    <div className="main-container">
      <Breadcrumb customTitle="My Wishlist" />
      <div className="flex w-full flex-col justify-center">
        {books?.length > 0 ? (
          <div className="cards-container">
            {books?.map(({ book }: WishlistBook) => {
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
        <div className="flex w-full items-center justify-center">
          <PaginationButton totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
