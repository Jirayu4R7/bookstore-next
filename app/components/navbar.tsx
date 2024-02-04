"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import AppLogo from "@/app/components/app-logo";

import { cn } from "@/lib/utils";
import MenuIcon from "./icons/MenuIcon";
import { useEffect, useState } from "react";
import useScroll from "@/lib/hook/useScroll";

const NavBar = () => {
  const [navClassList, setNavClassList] = useState<string[]>([]);
  const scroll = useScroll();
  const [openNav, setOpenNav] = useState(false);

  const closeNav = () => {
    setOpenNav(false);
  };

  useEffect(() => {
    document.body.style.overflowY = openNav ? "hidden" : "scroll";
  }, [openNav]);

  useEffect(() => {
    const _classList = [];

    if (scroll.y > 25) _classList.push("!shadow");

    setNavClassList(_classList);
  }, [scroll.y]);

  return (
    <header className={cn("sticky top-0 z-20 bg-skin-base", navClassList)}>
      <NavigationMenu.Root
        aria-label="primary"
        className=" main-navigation padding-x max-width relative m-auto flex max-w-6xl items-center justify-between py-4"
      >
        <div className="flex basis-1/3 justify-start md:hidden">
          <button
            type="button"
            title="menu"
            className="p-1"
            onClick={() => {
              setOpenNav(true);
              console.log("open drawer");
            }}
          >
            <MenuIcon />
          </button>
        </div>
        <div className="flex basis-1/3 justify-center md:justify-start">
          <AppLogo />
        </div>
        <NavigationMenu.List className="flex basis-1/3 gap-x-2 text-lg md:gap-x-4">
          <NavigationMenu.Item className="nav-menu">
            {/* <SearchDialog /> */}
            <p>Search</p>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
};

export default NavBar;
