"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import GoldSquiggles from "components/goldSquiggles";

export default function ProjectPage() {
  const projectId = useParams();
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    skills: [""],
    link: "",
    image: "",
  });

  const getProjectDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/projects/${projectId.project}`
      );
      setProjectDetails(res.data);
    } catch (er) {
      console.error(er);
    }
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  return (
    <>
      <main className="flex flex-col items-center justify-center relative">
        <GoldSquiggles/>
        <section className="flex flex-wrap gap-2 items-center bg-color-pink w-full tex-white z-2">
          <img
            src={`/${projectDetails?.image}`}
            alt={projectDetails?.title}
            className="h-70 w-md"
          />
          <section className="m-4 text-white flex flex-col">
            <h1 className="font-bold text-3xl text-center m-2 jusitify-self-center">
              {projectDetails?.title}
            </h1>
            <section>
              <h2 className="text-xl my-2 font-bold">Description:</h2>
              <div className="flex flex-wrap items-center">
                <p className=" mr-2">{projectDetails?.description}</p>
                <a href={projectDetails?.link}>
                  <button className="bg-color-secondary-green px-2 rounded-md hover:text-[#B98A3C]">
                    Link
                  </button>
                </a>
              </div>
            </section>
            <section>
              <h2 className="text-xl my-2 font-bold">Skills:</h2>
              <div>
                {projectDetails?.skills.map((skill, index) => (
                  <button
                    key={index}
                    className="bg-color-secondary-green p-2 mr-2 rounded-lg hover:text-[#B98A3C]"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </section>
          </section>
        </section>
        <GoldSquiggles/>
      </main>
    </>
  );
}
