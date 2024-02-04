const Footer = () => {
  return (
    <footer className="mt-auto shadow-inner">
      <div className="footer-container mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:grid-rows-4 md:gap-x-6 md:gap-y-0 md:px-8 lg:gap-x-8 lg:gap-y-2">
        <div className="col-span-2 md:row-span-3">
          <h2 className="my-2 font-serif text-xl font-semibold">
            Next Bookstore
          </h2>
          <div className="text-sm">
            <p className="my-1">
              We are an online bookstore that offers a wide selection of books
              in various genres, including fiction, non-fiction, biographies,
              and more.
            </p>
            <p>
              We provide a convenient and enjoyable shopping experience while
              offering competitive prices and excellent customer service.
            </p>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
