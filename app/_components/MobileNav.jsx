"use client";
import Humburger from "../svgIcons/Humburger";
import XMarkIcon from "../svgIcons/XMarkIcon";
import { useEffect, useRef, useState } from "react";
import { navbar } from "./navbarData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const ref = useRef();
  const pathName = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    if (navOpen) {
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "auto";
    }
  }, [navOpen]);
  return (
    <div className="block lg:hidden">
      <button onClick={() => setNavOpen((show) => !show)}>
        {navOpen ? <XMarkIcon /> : <Humburger />}
      </button>

      <div
        className={`fixed left-0 top-0 min-h-screen w-full bg-black/80 backdrop-blur-sm ${navOpen ? "pointer-events-auto visible translate-x-0 opacity-100" : "pointer-events-none invisible -translate-x-[100%] opacity-0"} transition-all duration-700`}
        ref={ref}
        onClick={(e) => {
          if (e.target === ref.current) {
            setNavOpen(false);
          }
        }}
      >
        <div className={`fixed left-0 top-0 min-h-screen w-[50%] bg-primary`}>
          <button
            className="absolute right-0 top-4 flex aspect-square w-8 translate-x-[100%] items-center justify-center rounded-full bg-primary shadow-xl transition-all duration-300 hover:shadow-none"
            onClick={() => setNavOpen(false)}
          >
            <XMarkIcon />
          </button>
          <ul className="flex min-h-screen flex-col justify-center gap-4 p-3">
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
          </ul>
        </div>
      </div>
    </div>
  );
}
