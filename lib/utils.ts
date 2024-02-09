import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaultStroke = (className: string): string =>
  new RegExp("stroke-*", "g").test(className)
    ? ""
    : "stroke-2 stroke-skin-dark";

export const generateUniqueArray = (num: number) => {
  let numbers = new Set<number>();
  while (numbers.size < num) {
    let randomNum = Math.floor(Math.random() * (num - 1 + 1)) + 1;
    numbers.add(randomNum);
  }

  return Array.from(numbers);
};

import defaultBookCover from "@/public/images/default_book_cover.jpeg";
export const generateCoverDefault = () => {
  return defaultBookCover;
};

export function calPriceDiscount(price: number, discount: number): string {
  // ราคาเต็ม x (100-จำนวนที่ลด) / 100
  const priceDiscount = (price * (100 - discount)) / 100;
  return priceDiscount.toFixed(2).toLocaleString();
}
