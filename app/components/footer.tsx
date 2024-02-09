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
              The world is at your fingertips. Discover endless stories with
              Kong Dong, your reading companion.
            </p>
          </div>
        </div>
        <div className="about-us md:row-span-4">
          <h2 className="my-1 font-serif text-xl font-semibold">Contact</h2>
          <p className="mb-3 text-sm">
            Email:{" "}
            <a href="mailto:info@book.com" className="text-link mt-1 block">
              info@book.com
            </a>
          </p>
          <p className="mb-3 text-sm">
            Phone:{" "}
            <a href="tel:" className="text-link mt-1 block">
              +669 999-999-99
            </a>
          </p>
        </div>
        <div className="social-group col-span-2 md:row-span-1 md:self-center"></div>
      </div>
    </footer>
  );
};

export default Footer;
