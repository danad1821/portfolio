"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PDFViewer from "components/pdfViewer";
import ResumeCarousel from "components/resumeCarousel";

type ProjectResult = {
  _id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  link: string;
};
export default function Resume() {
  const [viewMode, setViewMode] = useState(false);
  const changeSelectedViewMode = (value: boolean) => {
    setViewMode(value);
  };

  const [skills, setSkills] = useState(new Set());

  const retrieveSkills = async () => {
    try {
      let res = await axios.get("http://localhost:5000/projects/");
      let skillList = res.data
        .map((result: ProjectResult) => {
          return result.skills;
        })
        .flat();
      const skillSet = new Set(skillList);
      setSkills(skillSet);
    } catch (er) {
      console.error(er);
    }
  };

  useEffect(() => {
    retrieveSkills();
  }, []);

  return (
    <>
      <main>
        <h1 className="font-bold text-3xl text-center m-3">Resume</h1>
        <section className="flex flex-col items-center">
          <section className="flex bg-color-pink justify-between items-center text-white rounded-full relative w-40 p-1">
            <div
              className={`absolute rounded-full bg-color-primary-green w-1/2 h-full transition-transform duration-500 ease-in-out ${
                viewMode ? "translate-x-full" : "-translate-x-1"
              }`}
            ></div>
            <button
              className="flex-1 text-center relative z-10 p-2 focus:outline-none"
              onClick={() => changeSelectedViewMode(false)}
            >
              PDF
            </button>
            <button
              className="flex-1 text-center relative z-10 p-2 focus:outline-none"
              onClick={() => changeSelectedViewMode(true)}
            >
              Web
            </button>
          </section>
          <section>
            {viewMode ? (
              <ResumeCarousel/>
            ) : (
              <PDFViewer/>
            )}
          </section>
        </section>
      </main>
    </>
  );
}
