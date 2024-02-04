import ItemCard from "./item-card";
import CardSkeletons from "./loading-ui/card-skeletons";

type Props = {
  slug: string;
  books: Record<string, any>;
};

export default function BookRow({ slug, books }: Props) {
  // const { data, isError, isLoading } = useBooks({
  //   initialData: books[slug],
  //   filter: { slug, limit: 5 },
  // })
  const { isLoading, isError } = { isLoading: true, isError: false };
  const data = {
    data: [
      {
        id: 1,
        attributes: {
          slug: "the-art-of-coding",
          price: 19.99,
          title: "The Art of Coding",
          image: "https://example.com/the-art-of-coding.jpg",
        },
      },
      {
        id: 2,
        attributes: {
          slug: "data-science-mastery",
          price: 29.99,
          title: "Data Science Mastery",
          image: "https://example.com/data-science-mastery.jpg",
        },
      },
      {
        id: 3,
        attributes: {
          slug: "quantum-computing-explained",
          price: 24.99,
          title: "Quantum Computing Explained",
          image: "https://example.com/quantum-computing.jpg",
        },
      },
      {
        id: 4,
        attributes: {
          slug: "machine-learning-essentials",
          price: 22.99,
          title: "Machine Learning Essentials",
          image: "https://example.com/machine-learning.jpg",
        },
      },
    ],
  };

  if (isLoading || isError) return <CardSkeletons number={5} slug={slug} />;

  return (
    <div className="cards-container">
      {data?.data.map(({ id, attributes }) => {
        const { slug, price, title, image } = attributes;
        return (
          <ItemCard
            key={id}
            className={`${
              data.data.length >= 5
                ? "last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex"
                : data.data.length === 4
                ? "sm:last:hidden md:sm:last:flex"
                : ""
            }`}
            id={id}
            price={price}
            slug={slug}
            title={title}
            image={image}
          />
        );
      })}
    </div>
  );
}
