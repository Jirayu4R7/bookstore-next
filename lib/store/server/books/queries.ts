"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
// import { Book, BookQueryProps, Books } from "./types";
import books from "@/lib/data/dum-books.json";
import { PAGE_SIZE } from "@/lib/constants";
import { Book } from "@/lib/types";

export interface GetResponseBooks {
  data: Book[];
  count: number;
}

export interface BookQueryProps {
  limit?: number;
  pageNum?: number;
  searchTerm?: string;
}

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

export async function fetchBooks({
  limit = 10,
  pageNum = 1,
  searchTerm,
}: BookQueryProps): Promise<GetResponseBooks> {
  const supabase = createServerSupabaseClient();
  try {
    const offset = (pageNum - 1) * limit;
    const { count } = await supabase
      .from("book")
      .select("*", { count: "exact" })
      .ilike("title", `%${searchTerm}%`);

    let { data: books, error } = await supabase
      .from("book")
      .select("*, author(id, name),categories(id, title, slug)")
      .ilike("title", `%${searchTerm}%`)
      .range(offset, offset + limit - 1);
    if (error) {
      console.log("error fetchbooks : ", error.message);
      throw new Error("Error fetching books");
    }
    if (books) {
      return { data: books, count: count || 0 };
    } else {
      return { data: [], count: count || 0 };
    }
  } catch (error) {
    return { data: [], count: 0 };
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

export async function searchBooks(keyword: string) {
  const supabase = createServerSupabaseClient();
  try {
    let { data: books, error } = await supabase
      .from("book")
      .select("*, author(id, name),categories(id, title, slug)")
      .ilike("title", `%${keyword}%`)
      .limit(10);
    if (error) {
      console.log("error fetchbooks : ", error.message);
      return null;
    }
    return books;
  } catch (error) {
    return null;
  }
}
