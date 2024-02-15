import { calPriceDiscount, cn, generateCoverDefault } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "./icons/HeartIcon";
import { Book } from "@/lib/types";
type Props = {
  className?: string;
  data: Book;
};

const ItemCard = ({ className = "", data }: Props) => {
  return (
    <article
      className={cn(
        "flex flex-col gap-y-2 rounded font-sans shadow hover:shadow-lg",
        className
      )}
    >
      <Link
        href={`/product/${data?.slug}?title=${data?.title}`}
        title={data?.title}
        className="image-wrapper rounded border-2 border-skin-muted bg-skin-muted p-4 sm:p-8 md:p-4"
      >
        <div className="relative h-52 w-full overflow-hidden transition-transform duration-200 hover:scale-105">
          <Image
            src={data?.cover ?? generateCoverDefault()}
            alt={data?.title}
            fill
            sizes="
            (min-width: 1024px) 28vw,
            (min-width: 768px) 30vw,
            (min-width: 640px) 35vw,
            64vw"
            className="aspect-[3/4] h-auto w-auto object-cover transition-all"
          />
        </div>
      </Link>
      <div className="content flex h-full flex-col px-4 pb-4">
        <header className="pb-1">
          <h2 className="line-clamp-2 text-base leading-5">{data?.title}</h2>
          {/* <p className="mt-1 text-sm text-primary">{author_name}</p> */}
        </header>
        <div className="mt-auto flex flex-col items-baseline gap-1 md:flex-row">
          {data?.discount_percent > 0 && (
            <div className="price -mb-2 text-sm text-gray-600 line-through">
              <span>{data?.price.toLocaleString()}</span>
              <span> บาท</span>
            </div>
          )}
          <div className="price-discount mb-1 font-medium">
            <span>{calPriceDiscount(data?.price, data?.discount_percent)}</span>
            <span> บาท </span>
          </div>
        </div>
        {/* ฉันต้องการแสดง ปุ่ม อยู่ตำแหน่งล่างเหมือนกัน */}

        <div className="buttons flex gap-x-2">
          <button
            type="button"
            className="primary-btn-color flex-1 rounded px-1 text-sm font-medium"
          >
            <Link target="_blank" href={data?.link_to_buy ?? "#"}>
              Buy now
            </Link>
          </button>
          <button
            type="button"
            disabled
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

export default ItemCard;
