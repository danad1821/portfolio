"use client";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-color-secondary-green text-white py-4 z-10">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="flex gap-3 my-2">
          <button
            className="flex gap-3 items-center justify-center text-2xl"
            onClick={() => {
              window.open("https://www.linkedin.com/in/dana-dabdoub/");
            }}
          >
            <FaLinkedin />
          </button>
          <button
            className="flex gap-3 items-center justify-center text-2xl"
            onClick={() => {
              window.open("https://github.com/danad1821");
            }}
          >
            <FaGithubSquare />
          </button>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Dana Dabdoub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
