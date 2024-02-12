import { fetchBook } from "@/lib/store/server/books/queries";
import { calPriceDiscount, generateCoverDefault } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "./icons/HeartIcon";
import NotFoundBook from "./not-found-book";

type Props = {
  slug: string;
};

export default async function BookDetails({ slug }: Props) {
  // const data = await getBookBySlugMock(slug);
  const data = await fetchBook(slug);
  if (!data) {
    return (
      <NotFoundBook />
      // <div>
      //   <p>Not found</p>
      // </div>
    );
  }
  const book = data;
  const categories = data.categories;
  const hasWishlisted = false;
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:gap-10 lg:gap-16">
      <div className="image-wrapper mx-auto w-full max-w-[30rem] rounded bg-skin-muted p-8 md:w-2/5 md:max-w-none md:self-start md:p-8 lg:p-10">
        <div className="relative h-fit min-h-96 w-full overflow-hidden transition-transform duration-500 hover:scale-110 md:h-80 xl:h-96">
          <Image
            src={book?.cover ?? generateCoverDefault()}
            fill
            sizes="
            (min-width: 1024px) 28vw,
            (min-width: 768px) 30vw,
            (min-width: 640px) 35vw,
            64vw"
            alt={book.title}
            className="aspect-[5/8] h-auto w-auto object-cover transition-all"
          />
        </div>
      </div>
      <div className="md:w-3/5">
        <h1 className="mb-2 text-xl font-bold md:text-2xl">{book.title}</h1>
        <p className="text-base">{book.description}</p>
        <hr className="my-4 md:my-6" />
        <div className="grid grid-cols-2 gap-y-2 md:grid-cols-3 md:gap-y-4 lg:grid-cols-4">
          <div>Author :</div>
          <div className="md:col-span-2 lg:col-span-3">
            {book.author?.name ?? "-"}
          </div>
          <div>Price :</div>
          <div className="md:col-span-2 lg:col-span-3">
            <div className="flex flex-col items-baseline gap-1 md:flex-row">
              {book.discount_percent > 0 && (
                <div className="price pr-2 text-sm text-gray-600 line-through">
                  <span>{book.price.toLocaleString()}</span>
                  <span> บาท</span>
                </div>
              )}
              <div className="price-discount mb-1 font-medium">
                <span>
                  {calPriceDiscount(book.price, book.discount_percent)}
                </span>
                <span> บาท </span>
              </div>
            </div>
          </div>
          <div>Categories :</div>
          <div className="md:col-span-2 lg:col-span-3">
            {categories.map((category: any, index: number) => (
              <span key={category.title}>
                {index > 0 ? ", " : ""}
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-link italic"
                >
                  {category.title}
                </Link>
              </span>
            ))}
          </div>
        </div>
        <div className="my-6 flex flex-col-reverse gap-4 md:flex-row md:gap-8">
          <Link
            target="_blank"
            href={book?.link_to_buy ?? "#"}
            className="primary-btn-color flex w-full items-center justify-center gap-x-4 rounded py-2 text-center text-lg font-medium"
          >
            Buy now
          </Link>

          <button
            disabled
            type="button"
            className="outline-btn-color flex w-full items-center justify-center gap-x-4 rounded border-2 py-2 text-center text-lg font-medium"
          >
            <>
              <HeartIcon
                className={`stroke-2 ${
                  hasWishlisted ? "fill-skin-accent stroke-skin-accent" : ""
                }`}
              />
              {hasWishlisted ? "Wishlisted" : "Add To Wishlist"}
            </>
          </button>
        </div>
      </div>
    </div>
  );
}
