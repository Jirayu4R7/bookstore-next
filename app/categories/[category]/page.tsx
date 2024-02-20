// import { genPageMetadata } from "@/app/seo";
import BooksContainer from "./book-container";
import Breadcrumb from "@/app/components/breadcrumb";

type Props = {
  params: { category: string };
  searchParams: { page: string };
};

type MetaProps = {
  params: { category: string };
};

// export const metadata = genPageMetadata({ title: "Categories" });

export async function generateMetadata({ params }: MetaProps) {
  // const bookData = await getCategoryBySlug(params.category)
  const title = params?.category;
  return {
    title,
    openGraph: {
      title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${params.category}`,
    },
    twitter: { title },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { category } = params;
  const page = searchParams?.page || "1";

  return (
    <main className="main-container">
      <Breadcrumb />
      <h1 className="font-serif text-2xl font-semibold capitalize">
        {category}
      </h1>
      <BooksContainer category={category} page={page} />
    </main>
  );
}
