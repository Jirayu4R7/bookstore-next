import SearchIcon from "../icons/SearchIcon";
import Image from "next/image";
import cafeBookPic from "@/public/images/cafe-book.webp";
import bookPic from "@/public/images/book.png";

const HeroSection = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-y-4 px-4 py-6 md:flex-row-reverse md:gap-x-4 md:px-8 lg:py-14">
      <div className="image-wrapper flex-1 p-4 lg:p-0">
        {/* <p>IMAGE</p> */}
        <Image
          src={bookPic}
          alt="Open Book"
          priority
          className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)]"
        />
      </div>
      <div className="info-wrapper flex flex-1 flex-col gap-y-4 md:justify-center lg:justify-end lg:gap-y-8">
        <h1 className="font-serif text-3xl font-semibold md:!leading-tight lg:text-4xl xl:text-5xl">
          Discover your next <br />
          favorite book at
          <br />
          Kong Dong.
        </h1>
        <p className="font-sans xl:text-lg">
          More than a bookstore, Kong Dong is a space for learning, sharing, and
          igniting your imagination.
        </p>
        <div>
          <a
            href="#books"
            className="outline-btn-color inline-block rounded py-2 px-4 text-lg font-semibold"
          >
            Browse
            <SearchIcon className="ml-2 !stroke-skin-dark stroke-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
