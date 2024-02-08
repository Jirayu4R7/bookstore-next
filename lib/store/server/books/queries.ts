"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Book, BookQueryProps, Books } from "./types";
import books from "@/lib/data/dum-books.json";
import { PAGE_SIZE } from "@/lib/constants";

export const createServerSupabaseClient = () => {
  const cookieStore = cookies();
  return createClient(cookieStore);
};

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

export async function fetchBooksByCategory({
  page = 1,
  categorySlug,
}: {
  page: number;
  categorySlug?: string;
}) {
  const supabase = createServerSupabaseClient();
  // console.log("categorySlug: ", categorySlug);
  try {
    let { data: books, error } = await supabase
      .from("book")
      .select("*, author(id, name),categories!inner(title, slug, id)")
      .eq("categories.slug", categorySlug)
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
    if (error) {
      console.log("error fetchbooks : ", error.message);
      return [];
    }
    return books ? books : [];
  } catch (error) {
    return [];
  }
}

export async function fetchBooks(page = 1) {
  const supabase = createServerSupabaseClient();
  try {
    let { data: books, error } = await supabase
      .from("book")
      .select("*, author(id, name),categories(title, slug)")
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
    if (error) {
      console.log("error fetchbooks : ", error.message);
      return [];
    }
    return books;
  } catch (error) {
    return [];
  }
}

export async function fetchBook(slug: string) {
  const supabase = createServerSupabaseClient();
  try {
    let { data: book, error } = await supabase
      .from("book")
      .select("*, author(id, name),categories(id, title, slug)")
      .eq("slug", slug)
      .single();
    if (error) {
      console.log("error fetchbooks : ", error.message);
      return null;
    }
    return book;
  } catch (error) {
    return null;
  }
}
