"use client";
import { useState } from "react";
import AdminSignIn from "./adminSignIn";
import { usePathname, useRouter } from "next/navigation";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const [openAdminSignIn, setOpenAdminsignIn] = useState<boolean>(false);
  const [openResponsiveNav, setOpenResponsiveNav] = useState<boolean>(false);
  const pathname = usePathname();

  const changeOpenAdminSignIn = () => {
    setOpenAdminsignIn(!openAdminSignIn);
  };

  const closeAdminSignIn = () => {
    setOpenAdminsignIn(false);
  };

  const closeResponsiveNav = () => {
    setOpenResponsiveNav(false);
  };
  return (
    <>
      {pathname.includes("admin") ? (
        <header className="bg-color-secondary-green text-black sticky top-0 z-15">
          <nav className="bg-color-secondary-green">
            <ul className="flex gap-4 text-white items-center justify-center py-2">
              <li
                className={`p-4 nav-link ${
                  pathname === "/admin/projects" ? "active-link" : ""
                }`}
                onClick={() => {
                  router.push("/admin/projects");
                }}
              >
                <a href="/admin/projects">Projects</a>
              </li>
              <li
                className={`p-4 rounded-lg bg-red-500 hover: bg-gray-500`}
                onClick={() => {
                  router.push("/");
                }}
              >
                <a href="/">Logout</a>
              </li>
            </ul>
          </nav>
        </header>
      ) : (
        <header className="bg-color-secondary-green text-black sticky top-0 z-15">
          {width > 675 ? (
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
                  className={`p-4 nav-link ${
                    pathname === "/" ? "active-link" : ""
                  }`}
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <a href="/" onClick={closeResponsiveNav}>
                    Home
                  </a>
                </li>
                <li
                  className={`p-4 nav-link ${
                    pathname === "/projects" ? "active-link" : ""
                  }`}
                  onClick={() => {
                    router.push("/projects");
                  }}
                >
                  <a href="/projects" onClick={closeResponsiveNav}>
                    Projects
                  </a>
                </li>
                <li
                  className={`p-4 nav-link ${
                    pathname === "/resume" ? "active-link" : ""
                  }`}
                  onClick={() => {
                    router.push("/resume");
                  }}
                >
                  <a href="/resume" onClick={closeResponsiveNav}>
                    Resume
                  </a>
                </li>
                <li
                  className={`p-4 nav-link ${
                    pathname === "/contact" ? "active-link" : ""
                  }`}
                  onClick={() => {
                    router.push("/contact");
                  }}
                >
                  <a href="/contact" onClick={closeResponsiveNav}>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className="bg-color-secondary-green flex items-center justify-between relative h-20">
              <section className="p-2" onClick={changeOpenAdminSignIn}>
                <img src="/logo.png" className="w-15 h-15" alt="logo" />
                {openAdminSignIn && (
                  <AdminSignIn closeAdminSignIn={closeAdminSignIn} />
                )}
              </section>
              <button
                className="text-white p-2 text-2xl"
                onClick={() => setOpenResponsiveNav(!openResponsiveNav)}
              >
                <RxHamburgerMenu />
              </button>
              {openResponsiveNav && (
                <ul
                  className={`flex flex-col gap-4 text-white items-center justify-center absolute top-20 right-0 bg-color-secondary-green rounded-bl-lg transition-all duration-500 ease-in-out ${
                    openResponsiveNav
                      ? "max-h-96 opacity-100 p-4"
                      : "max-h-0 opacity-0 p-0"
                  }`}
                >
                  <li
                    className={`p-4 nav-link ${
                      pathname === "/" ? "active-link" : ""
                    }`}
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    <a href="/">Home</a>
                  </li>
                  <li
                    className={`p-4 nav-link ${
                      pathname === "/projects" ? "active-link" : ""
                    }`}
                    onClick={() => {
                      router.push("/projects");
                    }}
                  >
                    <a href="/projects">Projects</a>
                  </li>
                  <li
                    className={`p-4 nav-link ${
                      pathname === "/resume" ? "active-link" : ""
                    }`}
                    onClick={() => {
                      router.push("/resume");
                    }}
                  >
                    <a href="/resume">Resume</a>
                  </li>
                  <li
                    className={`p-4 nav-link ${
                      pathname === "/contact" ? "active-link" : ""
                    }`}
                    onClick={() => {
                      router.push("/contact");
                    }}
                  >
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              )}
            </nav>
          )}
        </header>
      )}
    </>
  );
}
