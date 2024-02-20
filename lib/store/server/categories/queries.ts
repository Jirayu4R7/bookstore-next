"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { DEFAUL_PAGE_SIZE } from "@/lib/constants";
import { Category } from "@/lib/types";

export interface GetResponseCategory {
  data: Category[];
  count?: number;
}

export interface CategoryQueryProps {
  limit?: number;
  pageNum?: number;
  searchTerm?: string;
}

export const createServerSupabaseClient = () => {
  const cookieStore = cookies();
  return createClient(cookieStore);
};

export async function fetchCategories({
  pageNum = 1,
}: CategoryQueryProps): Promise<GetResponseCategory> {
  const supabase = createServerSupabaseClient();
  try {
    const limit = DEFAUL_PAGE_SIZE;
    const offset = (pageNum - 1) * limit;
    let { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .range(offset, offset + limit - 1);
    if (error) {
      console.log("error fetchCategories : ", error.message);
      throw new Error("Error fetching categories");
    }
    if (categories) {
      return { data: categories };
    } else {
      return { data: [] };
    }
  } catch (error) {
    return { data: [] };
  }
}
