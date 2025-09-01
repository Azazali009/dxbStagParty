"use client";
import Humburger from "../svgIcons/Humburger";
import XMarkIcon from "../svgIcons/XMarkIcon";
import { useEffect, useRef, useState } from "react";
import { navbar } from "./navbarData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Button from "./Button";

export default function MobileNav() {
  const ref = useRef();
  const pathName = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="block lg:hidden">
      <button onClick={() => setNavOpen((show) => !show)}>
        {navOpen ? <XMarkIcon /> : <Humburger />}
      </button>

      <div
        className={`fixed left-0 top-0 h-dvh w-full bg-black/80 backdrop-blur-sm ${navOpen ? "pointer-events-auto visible translate-x-0 opacity-100" : "pointer-events-none invisible -translate-x-[100%] opacity-0"} transition-all duration-700`}
        ref={ref}
        onClick={(e) => {
          if (e.target === ref.current) {
            setNavOpen(false);
          }
        }}
      >
        <div className={`fixed left-0 top-0 h-full w-[50%] bg-primary`}>
          <button
            className="absolute right-0 top-4 flex aspect-square w-8 translate-x-[100%] items-center justify-center rounded-full bg-primary shadow-xl transition-all duration-300 hover:shadow-none"
            onClick={() => setNavOpen(false)}
          >
            <XMarkIcon />
          </button>
          <ul className="flex h-dvh flex-col justify-start gap-4 p-3">
            <Logo />
            {navbar.map((cur) => (
              <li
                key={cur.id}
                className={`text-sm ${pathName === cur.href ? "text-secondary" : "text-white"} duration-300 hover:text-secondary`}
              >
                <Link onClick={() => setNavOpen(false)} href={cur.href}>
                  {cur.navItem}
                </Link>
              </li>
            ))}
            <li>
              {" "}
              <Button
                variation="gold"
                className={"w-fit !px-4 !py-2 !text-[10px]"}
                href={"/builder"}
              >
                Start Planning Your Stag Party
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
