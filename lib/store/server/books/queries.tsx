import { Book, BookQueryProps, Books } from "./types";
import book1 from "@/lib/data/dum-book.json";
import books from "@/lib/data/dum-books.json";

export const getBooksMock = async () => {
  return books.data;
};

export const getBookBySlugMock = async (slug: string) => {
  return books.data.find(
    (item) => item.attributes.slug.toLowerCase() === slug.toLowerCase()
  );
};

export const getBooksByCategoryMock = async (slug: string) => {
  return books.data.filter((item) => {
    const bookCategories = item.attributes.categories || [];

    // Check if any category's slug matches the provided slug
    return bookCategories.some(
      (category) =>
        category.attributes.slug.toLowerCase() === slug.toLowerCase()
    );
  });
};
