"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import AppLogo from "@/app/components/app-logo";
import { cn } from "@/lib/utils";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import MenuIcon from "@/app/components/icons/MenuIcon";
import CancelIcon from "@/app/components/icons/CancelIcon";
import SearchDialog from "@/app/components/search-dialog";
import useScroll from "@/lib/hook/useScroll";
import UserIcon from "./icons/UserIcon";
import HeartIcon from "./icons/HeartIcon";

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
    <>
      <header
        className={cn("sticky top-0 z-20 bg-skin-base", navClassList.join(" "))}
      >
        <NavigationMenu.Root
          aria-label="primary"
          className="main-navigation padding-x max-width relative m-auto flex max-w-6xl items-center justify-between py-4"
        >
          <div className="flex justify-start md:hidden md:basis-1/3">
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
          {/* <div className="flex basis-1/3 justify-end"> */}
          <NavigationMenu.List className="flex basis-1/3 gap-x-2 text-lg md:gap-x-4">
            <NavigationMenu.Item className="nav-menu">
              <SearchDialog />
            </NavigationMenu.Item>
          
            <NavigationMenu.Item
              className={`${"hidden md:list-item"} nav-menu`}
            >
              <Link
                href="/wishlist"
                className="flex h-full items-center gap-x-2 py-1 pl-1 pr-2"
              >
                <HeartIcon className="stroke-1" />
                <span className="hidden text-sm font-light md:inline">
                  Wishlist
                </span>
              </Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item
              className={`${"hidden md:list-item"} nav-menu`}
            >
              <Link
                href="/account"
                className="flex h-full items-center gap-x-2 py-1 pl-1 pr-2"
              >
                <UserIcon className="stroke-1" />
                <span className="hidden text-sm font-light md:inline">
                  Account
                </span>
              </Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          {/* </div> */}
        </NavigationMenu.Root>
      </header>
      {/* ===== Mobile Navigation ===== */}
      <div
        className={cn(
          "fixed top-0 left-0 z-30 h-screen w-full bg-skin-dark transition-all delay-300 duration-500 md:hidden",
          openNav ? "opacity-100" : "hidden opacity-0"
        )}
        onClick={closeNav}
      >
        <div
          className={cn(
            "fixed top-0 z-30 flex h-screen max-h-screen w-10/12 flex-col items-center overflow-y-scroll bg-skin-base p-4 transition-transform duration-300 md:hidden",
            openNav ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <button
            type="button"
            title="Close Menu"
            className="self-end p-1"
            onClick={closeNav}
          >
            <CancelIcon className="scale-125" />
          </button>
          <div className="flex flex-col items-center gap-2">
            <p className="font-serif text-2xl font-medium">Book Store</p>
            <p className="text-center opacity-90">
              Discover your next favorite book <br /> at{" "}
              <span className="font-semibold">Kong Dong.</span>
            </p>
          </div>
          <NavigationMenu.Root
            orientation="vertical"
            className="mb-6 mt-4 self-stretch"
          >
            <NavigationMenu.List className="flex flex-col items-start gap-x-2 gap-y-1 divide-y text-xl md:gap-x-4">
              <NavigationMenu.Item className={`flex w-full flex-col`}>
                <Link
                  href="/"
                  className={`flex items-center gap-x-2 px-2 py-1 text-xl`}
                  onClick={closeNav}
                >
                  <span>Home</span>
                </Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item className={`flex w-full flex-col`}>
                <Link
                  href="/account"
                  className={`flex items-center gap-x-2 px-2 py-1 text-xl`}
                  onClick={closeNav}
                >
                  <span>Account</span>
                </Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item className={`flex w-full flex-col`}>
                <Link
                  href="/wishlist"
                  className={`flex items-center gap-x-2 px-2 py-1 text-xl`}
                  onClick={closeNav}
                >
                  <span>Wishlist</span>
                </Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item className={`flex w-full flex-col`}>
                <Link
                  href="/product"
                  className={`flex items-center gap-x-2 px-2 py-1 text-xl`}
                  onClick={closeNav}
                >
                  <span>Books</span>
                </Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </div>
    </>
  );
};

export default NavBar;
