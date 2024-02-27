"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hook/useStore";
import HeartIcon from "./icons/HeartIcon";
import {
  addToWishlist,
  removeBookFromWishlist,
} from "@/lib/store/server/books/queries";
import { useToast } from "@/app/components/ui/use-toast";
import { addBookToWishlist } from "@/lib/store/reducers/wishlistSlice";
import { useEffect, useState } from "react";

type WishlistButtonType = "mini" | "full";
interface WishlistButtonProp {
  variant?: WishlistButtonType;
  id: number;
}
const WishlistButton = ({ variant, id }: WishlistButtonProp) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const wishlistBook = useAppSelector((state) => state.wishlist.books);

  const [hasWished, setHasWished] = useState(false);

  useEffect(() => {
    const existing = wishlistBook.some(({ book }: any) => book.id === id);
    setHasWished(existing);
  }, [wishlistBook]);

  const buttonClasses =
    variant === "full"
      ? "outline-btn-color flex w-full items-center justify-center gap-x-4 rounded border-2 py-2 text-center text-lg font-medium"
      : "outline-btn-color basis-1/4 rounded p-1";

  const handleAddToWishlist = async () => {
    try {
      const result = hasWished
        ? await removeBookFromWishlist(id)
        : await addToWishlist(id);
      dispatch(addBookToWishlist(id));
      toast({ description: result.message, duration: 1500 });
    } catch (error) {
      console.error("Error adding/removing from wishlist:", error);
      toast({
        description: "Something went wrong. Please try again.",
        duration: 1500,
      });
    }
  };

  return (
    <button
      type="button"
      className={buttonClasses}
      title="Add To Wishlist"
      onClick={async () => {
        await handleAddToWishlist();
      }}
    >
      <HeartIcon
        className={`${
          hasWished ? "fill-skin-accent stroke-skin-accent" : "stroke-1"
        }`}
      />
      {variant === "full" ? (
        <span>{hasWished ? "Wishlisted" : "Add To Wishlist"}</span>
      ) : null}
    </button>
  );
};

export default WishlistButton;
