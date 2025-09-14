"use client";
import { useState } from "react";
export default function Resume() {
  const [viewMode, setViewMode] = useState(false);
  const changeSelectedViewMode = () => {
    setViewMode(!viewMode);
  };
  return (
    <>
      <main>
        <h1 className="font-bold text-3xl text-center m-3">Resume</h1>
        <section className="flex bg-color-pink justify-between items-center text-white rounded-full relative w-40 ">
          <div
            className={`absolute rounded-full min-w-15 bg-gold min-h-12 transition-all duration-5 ease-in-out z-1 p-2 ${
              viewMode ? "right-1" : "left-1"
            }`}
          ></div>
          <div className="bg-transparent m-2 z-2 p-2">
            <label htmlFor="pdfFormat">PDF</label>
            <input
              type="checkbox"
              name="pdf"
              id="pdfFormat"
              className="hidden"
              onChange={changeSelectedViewMode}
            />
          </div>
          <div className="bg-transparent m-2 z-2 p-2">
            <label htmlFor="webFormat">Web</label>
            <input
              type="checkbox"
              name="web"
              id="webFormat"
              className="hidden"
              onChange={changeSelectedViewMode}
            />
          </div>
        </section>
      </main>
    </>
  );
}
