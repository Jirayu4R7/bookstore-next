export interface Author {
    id?: number;
    name: string;
    slug: string;
  }
  export interface Category {
    id?: number;
    title: string;
    slug: string;
  }
  
  export interface Book {
    id?: number;
    title: string;
    price: number;
    discount_percent: number;
    description?: string;
    slug: string;
    link_to_buy?: string;
    cover?: string;
    author?: Author;
    categories?: Category[];
  }
  