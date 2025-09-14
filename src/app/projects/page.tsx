"use client";
import ProjectCard from "components/projectCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects");
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <main>
        <h1 className="font-bold text-3xl text-center m-2">Projects</h1>
        <section>
          <input type="text" placeholder="" />
        </section>
        <section className="flex flex-wrap m-2">
          {projects.length > 0
            ? projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))
            : "No projects available"}
        </section>
      </main>
    </>
  );
}
