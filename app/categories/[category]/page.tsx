import BooksContainer from "./book-container";
import Breadcrumb from "@/app/components/breadcrumb";

type Props = {
  params: { category: string };
  searchParams: { page: number };
};

export default async function Page({ params, searchParams }: Props) {
  const { category } = params;

  return (
    <main className="main-container">
      <Breadcrumb />
      <h1 className="font-serif text-2xl font-semibold capitalize">
        {category}
      </h1>
      <BooksContainer category={category} />
    </main>
  );
}
