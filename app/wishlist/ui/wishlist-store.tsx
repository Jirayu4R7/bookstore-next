import { getSession } from "@/lib/store/server/account/actions";
import WishlistContainer from "./wishlist-container";
import { fetchMyBooks } from "@/lib/store/server/books/queries";
import { WishlistBook } from "@/lib/types";

export default async function WishlistStore() {
  const session = await getSession();
  let bookWishlist: WishlistBook[] = [];
  if (session) {
    const { data: books } = await fetchMyBooks({
      limit: Number.MAX_SAFE_INTEGER,
      pageNum: 1,
      searchTerm: session.user.id,
    });
    bookWishlist = books;
  }
  return <WishlistContainer init wishlist={bookWishlist} />;
}
