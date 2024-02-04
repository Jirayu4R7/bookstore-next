import { getBookBySlugMock } from "@/lib/store/server/books/queries";
import { generateCoverDefault } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "./icons/HeartIcon";
type Props = {
  slug: string;
};

export default async function BookDetails({ slug }: Props) {
  const data = await getBookBySlugMock(slug);
  if (!data) {
    console.log(data);
    return (
      <div>
        <p>Not found</p>
      </div>
    );
  }
  const book = data!.attributes;
  const categories = data!.attributes.categories;
  const hasWishlisted = true;
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:gap-10 lg:gap-16">
      <div className="image-wrapper mx-auto w-full max-w-[20rem] rounded bg-skin-muted p-8 md:w-2/5 md:max-w-none md:self-start md:p-8 lg:p-16">
        <div className="relative h-72 w-full overflow-hidden transition-transform duration-500 hover:scale-110 md:h-80 xl:h-96">
          <Image
            src={generateCoverDefault()}
            fill
            priority
            alt={book.title}
            className="object-contain"
          />
        </div>
      </div>
      <div className="md:w-3/5">
        <h1 className="text-xl font-bold md:text-2xl mb-2">{book.title}</h1>
        <p className="text-base">{book.description}</p>
        <hr className="my-4 md:my-6" />
        <div className="grid grid-cols-2 gap-y-2 md:grid-cols-3 md:gap-y-4 lg:grid-cols-4">
          <div>Author :</div>
          <div className="md:col-span-2 lg:col-span-3">
            {book.author.attributes.name}
          </div>
          <div>Categories :</div>
          <div className="md:col-span-2 lg:col-span-3">
            {categories.map((category, index) => (
              <span key={category.attributes.name}>
                {index > 0 ? ", " : ""}
                <Link
                  href={`/categories/${category.attributes.slug}`}
                  className="text-link italic"
                >
                  {category.attributes.name}
                </Link>
              </span>
            ))}
          </div>
        </div>
        <div className="my-6 flex flex-col-reverse gap-4 md:flex-row md:gap-8">
          <button
            type="button"
            className="primary-btn-color flex w-full items-center justify-center gap-x-4 rounded py-2 text-center text-lg font-medium"
          >
            Buy now
          </button>
          <button
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
