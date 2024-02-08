import BookDetails from "@/app/components/book-detail";
// import Breadcrumb from "@/app/components/breadcrumb";

type Props = {
  params: { slug: string };
  searchParams: { page: number };
};

export default function Page({ params, searchParams }: Props) {
  const { slug } = params;
  return (
    <main className="main-container">
      {/* <Breadcrumb /> */}
      <BookDetails slug={slug} />
    </main>
  );
}
