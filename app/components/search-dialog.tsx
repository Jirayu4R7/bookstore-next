"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { searchBooks } from "@/lib/store/server/books/queries";
import SearchIcon from "@/app/components/icons/SearchIcon";
import { useDebounce } from "use-debounce";
import {
  Dialog,
  DialogClose,
  DialogContentSearch,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { calPriceDiscount } from "@/lib/utils";

const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce(
    searchTerm,
    500
  );

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      searchBooks(debouncedSearchTerm).then((data) => {
        setResult({ data: data });
      });
    } else {
      setResult({ data: [] });
    }
  }, [debouncedSearchTerm]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDialog = () => {
    setResult(null);
    setDebouncedSearchTerm("");
    setOpen((prevState) => !prevState);
  };
  return (
    <Dialog open={open} onOpenChange={handleDialog}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Search"
          className="flex h-full items-center gap-x-2 py-1 pl-1 pr-2"
        >
          <SearchIcon className="stroke-skin-dark stroke-2" />
          <span className="hidden md:inline">Search</span>
        </button>
      </DialogTrigger>
      <DialogContentSearch className="data-[state=open]:animate-contentShow fixed border-0 top-1/4 bottom-3/4 left-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-noe focus:outline-none">
        <div className="flex w-full justify-between">
          <label className="relative block w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
              <SearchIcon />
            </span>
            <input
              placeholder="Find books"
              type="text"
              onChange={(e) => handleInput(e)}
              className="block w-full rounded border-2 border-skin-base border-opacity-40 bg-skin-base py-3 pl-10 pr-16 caret-skin-accent placeholder:italic placeholder:text-opacity-75 focus:border-skin-accent focus:outline-none"
            />

            <DialogClose asChild>
              <button
                type="button"
                className="absolute inset-y-0 right-0 my-auto hidden mr-3 h-6 w-6 appearance-none items-center justify-center rounded  border border-slate-200 px-5 text-skin-dark shadow-md hover:border-slate-300 active:bg-slate-100 md:flex"
                aria-label="Close"
              >
                <span>Esc</span>
              </button>
            </DialogClose>
          </label>
        </div>
        {result && result.data.length < 1 ? (
          <div
            className={`flex h-24 items-center justify-center rounded bg-skin-base p-2`}
          >
            <div>
              <span className="opacity-80">No results for </span>
              <span className="font-bold">{`"${searchTerm}"`}</span>
            </div>
          </div>
        ) : (
          <div
            className={`h-80 rounded bg-skin-base p-2 ${
              result ? "block" : "hidden"
            }`}
          >
            <ul className="h-full overflow-y-auto">
              {result?.data.map((book: any) => {
                const {
                  slug,
                  price,
                  title,
                  cover,
                  author,
                  id,
                  discount_percent,
                } = book;
                return (
                  <li key={id}>
                    <Link
                      href={`/product/${slug}`}
                      onClick={() => setOpen(false)}
                      className="mb-1 flex items-center gap-x-2 rounded p-2 hover:bg-skin-muted hover:bg-opacity-50"
                    >
                      <div className="relative h-36 w-28 overflow-hidden">
                        <Image
                          src={cover}
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
                      <div className="flex w-full flex-col justify-start">
                        <div className="h-5 text-ellipsis line-clamp-2">
                          {title}
                        </div>
                        {author ? (
                          <div className="text-sm italic opacity-75">
                            By {author?.name}
                          </div>
                        ) : (
                          <div className="text-sm italic opacity-75">-</div>
                        )}
                        <div className="flex md:flex-row flex-col gap-1 items-baseline">
                          {discount_percent > 0 && (
                            <div className="price text-sm line-through text-gray-600 -mb-2">
                              <span>{price.toLocaleString()}</span>
                              <span> บาท</span>
                            </div>
                          )}
                          <div className="price-discount mb-1 font-medium">
                            <span>
                              {calPriceDiscount(price, discount_percent)}
                            </span>
                            <span> บาท </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </DialogContentSearch>
    </Dialog>
  );
};

export default SearchDialog;
