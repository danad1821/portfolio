"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import GoldSquiggles from "components/goldSquiggles";
import { useRouter } from "next/navigation";

export default function ProjectPage() {
  const projectId = useParams();
  const router = useRouter();
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    skills: [""],
    link: "",
    image: "",
    date: new Date()
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

  const checkProjectsBySkill = (skill: string) =>{
    router.push(`/projects?filterSkills=${skill}`)
  }

  return (
    <>
      <main className="flex flex-col items-center justify-center relative overflow-hidden">
        <GoldSquiggles/>
        <section className="flex flex-wrap gap-2 items-center bg-color-pink w-full tex-white z-2">
          <div className="w-80 flex items-center justify-center bg-gray-100 rounded-lg my-4 mx-2">
            <img
              src={`/${projectDetails?.image}`}
              alt={projectDetails?.title}
              className="h-70 w-auto rounded-lg"
            />
          </div>
          <section className="m-4 text-white flex flex-col">
            <h1 className="font-bold text-3xl text-center m-2 jusitify-self-center">
              {projectDetails?.title}
            </h1>
            <section>
              <h2 className="text-xl my-2 font-bold">Description:</h2>
              <div className="flex flex-wrap items-center">
                <p className="max-w-3xl mr-2">{projectDetails?.description}</p>
                <a href={projectDetails?.link}>
                  <button className="bg-color-secondary-green px-2 rounded-md hover:text-[#B98A3C] my-1">
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
                    className="bg-color-secondary-green p-2 mr-2 mt-1 rounded-lg hover:text-[#B98A3C]"
                    onClick={()=>{checkProjectsBySkill(skill)}}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </section>
          </section>
        </section>
        {/* <GoldSquiggles/> */}
      </main>
    </>
  );
}
