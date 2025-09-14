"use client";
import ProjectCard from "components/projectCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const projectsPerPage = 6;
  const [numOfPages, setNumOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [begIndex, setBegIndex] =useState(0);
  const [endIndex, setEndIndex] = useState(6);

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

  useEffect(() => {
    setNumOfPages(Math.ceil(projects.length / projectsPerPage));
    setDisplayedProjects(projects.slice(begIndex, endIndex));
  }, [projects]);

  const nextPage =()=>{
    if(currentPage == numOfPages){
      return;
    }
    setDisplayedProjects(projects.slice(begIndex+6,endIndex+6));
    setBegIndex(begIndex+6);
    setEndIndex(endIndex+6);
    setCurrentPage(currentPage+1);
  }

  const previousPage = () =>{
    if(begIndex == 0){
      return;
    }
    setDisplayedProjects(projects.slice(begIndex-6,endIndex-6));
    setBegIndex(begIndex-6);
    setEndIndex(endIndex-6);
    setCurrentPage(currentPage-1);
  }

  return (
    <>
      <main>
        <h1 className="font-bold text-3xl text-center m-3">Projects</h1>
        <section>
          <input type="text" placeholder="" />
        </section>
        <section className="flex flex-wrap items-center justify-center m-2">
          {displayedProjects.length > 0
            ? displayedProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))
            : "No projects available"}
        </section>

        {projects.length > 0 ? (
          <section className="flex items-center justify-center m-3">
            <button onClick={previousPage} className="bg-color-primary-green rounded-md text-white p-2 m-2">
              <FaChevronLeft />
            </button>
            Page {currentPage} of {numOfPages}
            <button onClick={nextPage} className="bg-color-primary-green rounded-md text-white p-2 m-2">
              <FaChevronRight />
            </button>
          </section>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
