import { cn } from "@/lib/utils";
type Props = {
  className?: string;
  id: number;
  title: string;
  price: number;
  slug: string;
  image: string;
};

const ItemCard = ({ className = "", id }: Props) => {
  return (
    <article
      className={cn(
        "flex flex-col gap-y-2 rounded font-sans shadow hover:shadow-lg",
        className
      )}
    ></article>
  );
};

export default ItemCard;
