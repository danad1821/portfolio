"use client";
import Header from "../../components/header";
import Footer from "../../components/footer";
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
      <Header />
      <main>
        <h1>Projects</h1>
        <div className="flex flex-wrap gap-4">
          {projects.length > 0
            ? projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))
            : "No projects available"}
        </div>
      </main>
      <Footer />
    </>
  );
}
