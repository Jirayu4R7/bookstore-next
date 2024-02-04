import ItemCard from "@/app/components/item-card";
import { getBooksByCategoryMock } from "@/lib/store/server/books/queries";

type Props = {
  category: string;
};

export default async function BooksContainer({ category }: Props) {
  const data = {
    data: await getBooksByCategoryMock(category),
  };
  return (
    <div>
      {data?.data.length > 0 ? (
        <div className="cards-container">
          {data?.data.map((item: any) => {
            const { slug, price, title, image, discount_percent, author } =
              item.attributes;
            return (
              <ItemCard
                key={item.id}
                className={`${
                  data.data.length >= 5
                    ? "last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex"
                    : data.data.length === 4
                    ? "sm:last:hidden md:sm:last:flex"
                    : ""
                }`}
                id={item.id}
                price={price}
                discount_percent={discount_percent}
                slug={slug}
                title={title}
                image={image}
                author_name={author.attributes.name}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full">
          <p className="text-center">Not found any book.</p>
        </div>
      )}
    </div>
  );
}
