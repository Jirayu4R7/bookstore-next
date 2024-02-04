import { GetResponse } from "@/lib/types/api";

export interface BookQueryProps {
  slug?: string;
  limit?: number;
  pageNum?: number;
  ids?: number[];
  searchTerm?: string;
}

export type Books = GetResponse<Book[]>;

export interface Book {
  id: number;
  attributes: {
    title: string;
    price: number;
    discount_percent: number;
    description: string;
    slug: string;
    in_stock: boolean;
    // createdAt: Date;
    // updatedAt: Date;
    publishedAt: null | Date;
    cover: null | string;
    author: {
      id: number;
      attributes: {
        name: string;
      }
    }
    categories: {
      id: number;
      attributes: {
        name: string;
      }
    }
    // author_id: {
    //   data: {
    //     id: number;
    //     attributes: {
    //       name: string;
    //       description: null | string;
    //       slug: string;
    //       createdAt: Date;
    //       updatedAt: Date;
    //     };
    //   };
    // };
    // categories: {
    //   data: {
    //     id: number;
    //     attributes: {
    //       name: string;
    //       description: null;
    //       slug: string;
    //       featured: boolean | null;
    //       featured_order: number | null;
    //       createdAt: Date;
    //       updatedAt: Date;
    //     };
    //   }[];
    // };
    // image: {
    //   data: {
    //     id: number;
    //     attributes: {
    //       name: string;
    //       alternativeText: null;
    //       caption: null;
    //       hash: string;
    //       ext: ".webp";
    //       mime: "image/webp";
    //       size: number;
    //       url: string;
    //       previewUrl: null;
    //       provider: string;
    //       createdAt: Date;
    //       updatedAt: Date;
    //     };
    //   }[];
    // };
  };
}
