"use client";
import { useState } from "react";
import AdminSignIn from "./adminSignIn";
import { usePathname } from "next/navigation";
export default function Header() {
  const [openAdminSignIn, setOpenAdminsignIn] = useState<boolean>(false);
  const pathname = usePathname();
  const changeOpenAdminSignIn = () => {
    setOpenAdminsignIn(!openAdminSignIn);
  };
  const closeAdminSignIn = () => {
    setOpenAdminsignIn(false);
  };
  return (
    <header className="bg-color-secondary-green text-black sticky top-0 z-15">
      <nav className="bg-color-secondary-green">
        <ul className="flex gap-4 text-white items-center justify-center">
          <li
            className="p-1 jusitfy-self-start relative"
            onClick={changeOpenAdminSignIn}
          >
            <img src="/logo.png" className="w-20 h-20" alt="logo" />
            {openAdminSignIn && (
              <AdminSignIn closeAdminSignIn={closeAdminSignIn} />
            )}
          </li>
          <li
            className={`p-4 nav-link ${pathname === "/" ? "active-link" : ""}`}
          >
            <a href="/">Home</a>
          </li>
          <li
            className={`p-4 nav-link ${
              pathname === "/projects" ? "active-link" : ""
            }`}
          >
            <a href="/projects">Projects</a>
          </li>
          <li
            className={`p-4 nav-link ${
              pathname === "/resume" ? "active-link" : ""
            }`}
          >
            <a href="/resume">Resume</a>
          </li>
          <li
            className={`p-4 nav-link ${
              pathname === "/contact" ? "active-link" : ""
            }`}
          >
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
