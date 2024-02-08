// "use client"
import SearchIcon from "./icons/SearchIcon";

const SearchDialog = () => {
  return (
    <button
      type="button"
      aria-label="Search"
      className="flex h-full items-center gap-x-2 py-1 pl-1 pr-2"
    >
      <SearchIcon className="stroke-skin-dark stroke-2" /> <span className="hidden md:inline">Search</span>
    </button>
  );
};

export default SearchDialog;
