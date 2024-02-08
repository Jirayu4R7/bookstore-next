import ItemCard from "@/app/components/item-card";
import CardSkeletons from "@/app/components/loading-ui/card-skeletons";
import NotFoundBook from "@/app/components/not-found-book";

type Props = {
  slug: string;
  books?: Record<string, any>;
};

export default function BookRow({ slug, books }: Props) {
  // const { data, isError, isLoading } = useBooks({
  //   initialData: books[slug],
  //   filter: { slug, limit: 5 },
  // })
  const { isLoading, isError } = { isLoading: false, isError: false };
  // const data = {
  //   data: books,
  // };

  if (isLoading || isError) return <CardSkeletons number={5} slug={slug} />;

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
        // <div className="flex h-[148px] shrink-0 items-center justify-center rounded-md border border-dashed">
        //   <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        //     <svg
        //       xmlns="http://www.w3.org/2000/svg"
        //       fill="none"
        //       viewBox="0 0 24 24"
        //       stroke-width="1.5"
        //       stroke="currentColor"
        //       className="h-8 w-8 text-muted-foreground"
        //     >
        //       <path
        //         stroke-linecap="round"
        //         stroke-linejoin="round"
        //         d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        //       />
        //     </svg>

        //     <h3 className="mt-4 text-lg font-semibold">Not found any book.</h3>
        //   </div>
        // </div>
      )}
    </div>
  );
}
