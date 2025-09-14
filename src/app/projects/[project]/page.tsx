"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { title } from "process";

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
      <main>
        <section>
          <img src={projectDetails?.image} alt={projectDetails?.title} />
          <h1 className="font-bold text-3xl text-center m-2">
            {projectDetails?.title}
          </h1>
        </section>
        <section>
          <h2>Description:</h2>
          <p>{projectDetails?.description}</p>
          <a href={projectDetails?.link}>
            <button>Link</button>
          </a>
        </section>
        <section>
          <h2>Skills:</h2>
          <div>
            {projectDetails?.skills.map((skill, index) => (
              <button key={index}>{skill}</button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
