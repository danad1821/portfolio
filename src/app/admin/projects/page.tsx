"use client";
import { useState, useEffect } from "react";
import AdminProjectCard from "components/adminProjectCard";
import axios from "axios";
type ProjectResult = {
  _id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  link: string;
  date: Date;
};
export default function AdminProjects() {
  const [projects, setProjects] = useState<ProjectResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

    const getAllProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects");
      const projectData: ProjectResult[] = res.data;

      // Convert the date string to a Date object for each project
      const projectsWithDates = projectData.map((proj) => ({
        ...proj,
        date: new Date(proj.date),
      }));

      setProjects(projectsWithDates);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = (project:ProjectResult) =>{
    setProjects((prevProjects)=>[...prevProjects, project])
  }

  const editProject = (project: ProjectResult) =>{
    let editedProjects = projects.filter((pr)=>pr._id != project._id);
    editedProjects.push(project);
    setProjects(editedProjects);
  }

  const deleteProject = (project: ProjectResult)=>{
    let newProjects = projects.filter((pr)=>pr._id != project._id);
    setProjects(newProjects);
  }

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <main>
      <section>
        <section className="flex items-center justify-end w-full">
          <button className="bg-color-primary-green text-white rounded-lg p-2 m-2">Add Project</button>
        </section>
        <section className="flex flex-wrap items-center justify-center my-2">
          {projects.length > 0 ? (
            projects.map((project) => (
              <AdminProjectCard key={project._id} project={project} editProject={editProject} deleteProject={deleteProject} />
            ))
          ) : (
            <p>No projects available</p>
          )}
        </section>
      </section>
    </main>
  );
}
