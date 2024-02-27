import { WishlistBook } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  books: any[];
}

const initialState: WishlistState = {
  books: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<any>) => {
      state.books = action.payload;
    },
    addBooksToWishlist: (state, action: PayloadAction<WishlistBook[]>) => {
      const existingBooks = new Set(state.books.map((book) => book.id));

      const booksToAdd = action.payload.filter(
        ({ book }) => !existingBooks.has(book.id)
      );

      state.books.push(...booksToAdd);
    },
    addBookToWishlist: (state, action: PayloadAction<number>) => {
      const existingBookIndex = state.books.findIndex(
        ({ book }) => book.id === action.payload
      );

      if (existingBookIndex === -1) {
        state.books.push({ book: { id: action.payload } });
      } else {
        state.books.splice(existingBookIndex, 1);
      }
    },
    removeBookFromWishlist: (state, action: PayloadAction<number>) => {
      const bookIndex = state.books.findIndex(
        ({ book }) => book.id === action.payload
      );

      if (bookIndex !== -1) {
        state.books.splice(bookIndex, 1);
      }
    },
  },
});
export const {
  setWishlist,
  addBookToWishlist,
  removeBookFromWishlist,
  addBooksToWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
