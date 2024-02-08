"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import books from "@/lib/data/dum-books.json";
import { PAGE_SIZE } from "@/lib/constants";

export const createServerSupabaseClient = () => {
  const cookieStore = cookies();
  return createClient(cookieStore);
};

export async function fetchCategories({ page = 1 }: { page: number }) {
  const supabase = createServerSupabaseClient();
  try {
    let { data: books, error } = await supabase
      .from("categories")
      .select("*")
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
    if (error) {
      console.log("error fetchCategories : ", error.message);
      return [];
    }
    return books ? books : [];
  } catch (error) {
    return [];
  }
}
