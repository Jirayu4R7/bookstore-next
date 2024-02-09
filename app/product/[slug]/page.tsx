import BookDetails from "@/app/components/book-detail";
// import Breadcrumb from "@/app/components/breadcrumb";

type Props = {
  params: { slug: string };
  searchParams: { page: number };
};

type MetaProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: MetaProps) {
  const title = params?.slug;
  return {
    title,
    openGraph: {
      title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${params.slug}`,
    },
    twitter: { title },
  };
}

export default function Page({ params, searchParams }: Props) {
  const { slug } = params;
  return (
    <main className="main-container">
      {/* <Breadcrumb /> */}
      <BookDetails slug={slug} />
    </main>
  );
}
