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
import { calPriceDiscount, cn, generateCoverDefault } from "@/lib/utils";
import { DialogProps } from "@radix-ui/react-dialog";
import { Book } from "@/lib/types";

const SearchDialog = ({ ...props }: DialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<Book[] | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce(
    searchTerm,
    500
  );

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      searchBooks(debouncedSearchTerm).then((books) => {
        setResult(books);
      });
    } else {
      if (debouncedSearchTerm === "") {
        searchBooks("").then((books) => {
          setResult(books);
        });
      }
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

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <Dialog open={open} onOpenChange={handleDialog}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Search"
          className="mb-1 flex h-full items-center gap-x-2 rounded-md border py-1 pl-1 pr-2"
        >
          <SearchIcon className="stroke h-5 w-5 stroke-skin-dark" />
          <span className="hidden text-sm font-light md:inline">
            Search books...
          </span>
          <kbd className="pointer-events-none right-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </DialogTrigger>
      <DialogContentSearch className="data-[state=open]:animate-contentShow bg-noe fixed bottom-3/4 left-1/2 top-1/4 z-50 max-h-[85vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md border-0 focus:outline-none md:max-w-[500px]">
        <div className="flex w-full justify-between">
          <label className="relative block w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
              <SearchIcon />
            </span>
            <input
              placeholder="Search books"
              type="text"
              onChange={(e) => handleInput(e)}
              className="block w-full rounded border-2 border-skin-base border-opacity-40 bg-skin-base py-3 pl-10 pr-16 caret-skin-accent placeholder:italic placeholder:text-opacity-75 focus:border-skin-accent focus:outline-none"
            />

            <DialogClose asChild>
              <button
                type="button"
                className="absolute inset-y-0 right-0 my-auto mr-3 hidden h-6 w-6 appearance-none items-center justify-center rounded border border-slate-200 px-5 text-skin-dark shadow-md hover:border-slate-300 active:bg-slate-100 md:flex"
                aria-label="Close"
              >
                <span className="text-sm">Esc</span>
              </button>
            </DialogClose>
          </label>
        </div>
        {result && result?.length < 1 ? (
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
            className={cn(
              "max-h-[356px] h-[348px] rounded bg-skin-base p-2",
              result ? "block" : "hidden",
              result ? "h-[348px]" : "h-fit"
            )}
          >
            <ul className="h-full divide-y overflow-y-auto">
              {result?.map((book: Book) => {
                const {
                  slug,
                  price,
                  title,
                  cover,
                  author,
                  id,
                  discount_percent,
                } = book;

                const coverSrc = cover ?? generateCoverDefault();
                const discountedPrice = calPriceDiscount(
                  price,
                  discount_percent
                );
                const authorName = author?.name || "-";

                return (
                  <li key={id}>
                    <Link
                      href={`/product/${slug}?title=${title}`}
                      onClick={() => setOpen(false)}
                      className="mb-1 flex items-center gap-x-2 rounded p-2 hover:bg-skin-muted hover:bg-opacity-50"
                    >
                      <div className="relative h-36 w-28 overflow-hidden">
                        <Image
                          src={coverSrc}
                          alt={title}
                          fill
                          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                          className="object-contain"
                        />
                      </div>
                      <div className="flex w-full flex-col justify-start">
                        <div className="line-clamp-2 h-5 text-ellipsis">
                          {title}
                        </div>
                        <div className="text-sm italic opacity-75">
                          By {authorName}
                        </div>
                        <div className="flex flex-col items-baseline gap-1 md:flex-row">
                          {discount_percent > 0 && (
                            <div className="price -mb-2 text-sm text-gray-600 line-through">
                              <span>{price.toLocaleString()}</span>
                              <span> บาท</span>
                            </div>
                          )}
                          <div className="price-discount mb-1 font-medium">
                            <span>{discountedPrice}</span>
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
