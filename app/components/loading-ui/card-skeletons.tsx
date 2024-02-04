import { Skeleton } from "@/app/components/ui/skeleton";
import { generateUniqueArray } from "@/lib/utils";

const CardSkeletons = ({
  number = 5,
  slug,
}: {
  number: number;
  slug?: string;
}) => {
  const numOfCards = generateUniqueArray(number);
  return (
    <div className="cards-container">
      {numOfCards.map((id) => (
        <div
          key={`${slug}${id}`}
          className="flex flex-col gap-y-2 rounded border-2 border-gray-100 last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex"
        >
          <div className="p-4 md:p-6 lg:p-8">
            <Skeleton className="h-44" />
          </div>
          <div className="px-4 pb-4">
            <header className="h-8 line-clamp-2">
              <Skeleton className="h-4 w-1/2" />
            </header>
            <div className="price mb-3 font-medium">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="buttons flex gap-x-2">
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeletons;
