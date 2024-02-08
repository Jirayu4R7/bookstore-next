import { cn, generateCoverDefault } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "./icons/HeartIcon";
type Props = {
  className?: string;
  data: any;
  // id: number;
  // title: string;
  // price: number;
  // discount_percent: number;
  // slug: string;
  // author_name?: string;
  // cover?: string;
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
        href={`/product/${data?.slug}`}
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
            className="h-auto w-auto object-cover transition-all aspect-[3/4]"
          />
        </div>
      </Link>
      <div className="content px-4 pb-4 flex flex-col  h-full">
        <header className="pb-1">
          <h2 className="text-base line-clamp-2 leading-5">{data?.title}</h2>
          {/* <p className="text-primary text-sm mt-1">{author_name}</p> */}
        </header>
        <div className="flex md:flex-row flex-col gap-1 items-baseline mt-auto">
          {data?.discount_percent > 0 && (
            <div className="price text-sm line-through text-gray-600 -mb-2">
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

function calPriceDiscount(price: number, discount: number): string {
  // ราคาเต็ม x (100-จำนวนที่ลด) / 100
  const priceDiscount = (price * (100 - discount)) / 100;
  return priceDiscount.toFixed(2).toLocaleString();
}

export default ItemCard;
