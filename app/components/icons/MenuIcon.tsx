import { defaultStroke } from "@/lib/utils";

const MenuIcon = ({ className = "" }: { className?: string }) => {
  const stroke = defaultStroke(className);
  return (
    <svg
      className={`${className} inline-block h-6 w-6 stroke-black ${stroke}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5h8M3 12h13M3 19h18"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default MenuIcon;
