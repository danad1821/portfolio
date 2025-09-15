"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PDFViewer from "components/pdfViewer";

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
              <div className="flex">
                <section className="bg-color-primary-green rounded-lg p-4 text-white m-2">
                  <section>
                    <h2 className="text-xl mb-2 font-bold">Education</h2>
                    <p>Graduted from <b>Rafik Hariri University (RHU)</b> with a <b>94.34 CGPA</b></p>
                    <h3>Degree:</h3>
                    <p>Bachelor of Science in <b>Computer Science</b></p>
                    <p>Minor in Business Administration</p>
                    <p>Placed on the <b>President's Honors list</b> from my first semester to my last.</p>
                  </section>
                  <section>
                    <h2 className="text-xl mb-2 font-bold">Work Experience</h2>
                  </section>
                  <section>
                    <h2 className="text-xl mb-2 font-bold">
                      Leadership & Activities
                    </h2>
                  </section>
                </section>
                <section className="bg-color-primary-green rounded-lg p-4 text-white m-2">
                  <section>
                    <h2 className="text-xl mb-2 font-bold">Technical Skills</h2>
                    <ul>
                      {Array.from(skills).map((skill, index) => (
                        <li key={index}>{skill as string}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h2 className="text-xl mb-2 font-bold">Soft Skills</h2>
                    <ul>
                      <li>Communication</li>
                      <li>Teamwork</li>
                      <li>Leadership</li>
                      <li>Critical Thinking</li>
                      <li>Problem Solving</li>
                    </ul>
                  </section>
                  <section>
                    <h2 className="text-xl mb-2 font-bold">Languages</h2>
                    <ul>
                      <li>English</li>
                      <li>Arabic</li>
                      <li>German</li>
                      <li>Spanish</li>
                    </ul>
                  </section>
                </section>
              </div>
            ) : (
              <PDFViewer/>
            )}
          </section>
        </section>
      </main>
    </>
  );
}
