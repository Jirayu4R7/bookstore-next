"use client";

import { useAppDispatch } from "@/lib/hook/useStore";
import {
  addBooksToWishlist,
  setWishlist,
} from "@/lib/store/reducers/wishlistSlice";
import { WishlistBook } from "@/lib/types";
import { useEffect } from "react";

interface WishlistContainerProps {
  init?: boolean;
  wishlist: WishlistBook[];
}
export default function WishlistContainer({
  wishlist,
  init,
}: WishlistContainerProps) {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (init) {
      dispatch(setWishlist(wishlist));
    }
    {
      dispatch(addBooksToWishlist(wishlist));
    }
  }, [wishlist]);

  return null;
}
