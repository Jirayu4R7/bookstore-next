import BookDetails from "@/app/components/book-detail";
import BooksContainer from "./book-container";
import Breadcrumb from "@/app/components/breadcrumb";

let mockBooks: number[] = [];

type Props = {
  params: { slug: string };
  searchParams: { page: number };
};

export default function Page({ params, searchParams }: Props) {
  const { slug } = params;
  return (
    <main className="main-container">
      <Breadcrumb />
      {/* <h1 className="font-serif text-2xl font-semibold capitalize">{slug}</h1> */}
      {/* <hr className="border border-skin-dark opacity-5" /> */}
      <BookDetails slug={slug} />
    </main>
  );
}
