import { cn, generateCoverDefault } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "./icons/HeartIcon";
type Props = {
  className?: string;
  id: number;
  title: string;
  price: number;
  discount_percent: number;
  slug: string;
  image: string;
  author_name: String;
};

const ItemCard = ({
  className = "",
  id,
  title,
  price,
  slug,
  image,
  discount_percent,
  author_name,
}: Props) => {
  return (
    <article
      className={cn(
        "flex flex-col gap-y-2 rounded font-sans shadow hover:shadow-lg",
        className
      )}
    >
      <Link
        href={`/product/${slug}`}
        title={title}
        className="image-wrapper rounded border-2 border-skin-muted bg-skin-muted p-4 sm:p-8 md:p-4 lg:p-8"
      >
        <div className="relative h-44 w-full overflow-hidden transition-transform duration-200 hover:scale-105">
          <Image
            src={generateCoverDefault()}
            alt={title}
            fill
            sizes="
            (min-width: 1024px) 20vw,
            (min-width: 768px) 25vw,
            (min-width: 640px) 33vw,
            50vw"
            className="object-contain"
          />
        </div>
      </Link>
      <div className="content px-4 pb-4">
        <header className="pb-1">
          <h2 className="text-base">{title}</h2>
          <p className="text-primary text-sm -mt-1">{author_name}</p>
        </header>
        <div className="flex flex-row gap-1 items-baseline">
          <div className="price text-sm line-through text-primary -mb-2">
            <span>{price.toLocaleString()}</span>
            <span> บาท</span>
          </div>
          <div className="price-discount mb-1 font-medium">
            <span>{calPriceDiscount(price, discount_percent)}</span>
            <span> บาท </span>
          </div>
        </div>
        <div className="buttons flex gap-x-2">
          <button
            type="button"
            className="primary-btn-color flex-1 rounded px-1 text-sm font-medium"
          >
            Buy now
          </button>
          <button
            type="button"
            className="outline-btn-color basis-1/4 rounded p-1"
            title="Add To Wishlist"
          >
            <HeartIcon
              className={`${
                false
                  ? "fill-skin-accent !stroke-skin-accent"
                  : "!stroke-skin-dark"
              }`}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

function calPriceDiscount(price: number, discount: number): string {
  // ราคาเต็ม x (100-จำนวนที่ลด) / 100
  const priceDiscount = (price * (100 - discount)) / 100;
  return priceDiscount.toFixed(2).toLocaleString();
}

export default ItemCard;
