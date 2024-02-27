"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import books from "@/lib/data/dum-books.json";
import { DEFAUL_PAGE_SIZE } from "@/lib/constants";
import { Book, WishlistBook } from "@/lib/types";
import { decrypt } from "../account/actions";
import { revalidatePath } from "next/cache";

export interface GetResponseBooks {
  data: Book[];
  count: number;
}

export interface GetResponseWishlist {
  data: WishlistBook[];
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
  limit = DEFAUL_PAGE_SIZE,
}: {
  page?: number;
  limit?: number;
  categorySlug?: string;
}): Promise<GetResponseBooks> {
  const supabase = createServerSupabaseClient();
  try {
    const offset = (page - 1) * limit;
    const { count } = await supabase
      .from("book")
      .select("title, categories!inner(slug)", { count: "exact" })
      .eq("categories.slug", categorySlug);

    let { data: books, error } = await supabase
      .from("book")
      .select("*, author(id, name),categories!inner(title, slug, id)")
      .eq("categories.slug", categorySlug)
      .range(offset, offset + limit - 1);
    if (error) {
      console.log("error fetchbooks : ", error.message);
      throw new Error("Error fetching books by category: " + categorySlug);
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

export async function fetchMyBooks({
  limit = 10,
  pageNum = 1,
  searchTerm,
}: BookQueryProps): Promise<GetResponseWishlist> {
  const supabase = createServerSupabaseClient();
  // console.log(searchTerm);
  try {
    const offset = (pageNum - 1) * limit;
    const { count } = await supabase
      .from("user_book")
      .select("*", { count: "exact" })
      .eq("user_id", searchTerm);

    let { data: books, error } = await supabase
      .from("user_book")
      .select("*, book(id, cover, slug, price, discount_percent, title, link_to_buy)")
      .eq("user_id", searchTerm)
      .range(offset, offset + limit - 1);
    if (error) {
      console.log("error fetchbooks : ", error.message);
      throw new Error("Error fetching books");
    }

    if (books) {
      // console.log("books", books);
      return { data: books, count: count || 0 };
    } else {
      return { data: [], count: count || 0 };
    }
  } catch (error) {
    return { data: [], count: 0 };
  }
}

export async function addToWishlist(bookId: number) {
  try {
    const supabase = createServerSupabaseClient();
    const cookieStore = cookies();
    let session = cookieStore.get("session");
    if (session) {
      let { user } = await decrypt(session.value);
      const { error } = await supabase
        .from("user_book")
        .insert([{ user_id: user.id, book_id: bookId }]);
      if (error) {
        console.log("error addToWishlist : ", error.message);
        throw new Error("Error addToWishlist: " + error.message);
      } else {
        revalidatePath("/wishlist");
        return { success: true, message: "Add book to wishlist successfully." };
      }
    } else {
      return { success: false, message: "Please login." };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong." };
  }
  // console.log("cookieStore", cookieStore);
}

export async function removeBookFromWishlist(bookId: number) {
  try {
    const supabase = createServerSupabaseClient();
    const cookieStore = cookies();
    let session = cookieStore.get("session");

    if (session) {
      let { user } = await decrypt(session.value);
      const { data, error } = await supabase
        .from("user_book")
        .delete()
        .eq("user_id", user.id)
        .eq("book_id", bookId)
        .select();

      if (error) {
        console.error("Error removing book from wishlist:", error.message);
        throw new Error("Error removing book from wishlist");
      } else if (data.length === 0) {
        return { success: false, message: "Book not found in wishlist." };
      } else {
        revalidatePath("/wishlist");
        return {
          success: true,
          message: "Book removed from wishlist.",
        };
      }
    } else {
      return { success: false, message: "Please login." };
    }
  } catch (error) {
    console.error("Error removing book from wishlist:", error);
    return { success: false, message: "Something went wrong." };
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
