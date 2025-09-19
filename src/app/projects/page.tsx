"use client";
import ProjectCard from "components/projectCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Loading from "app/loading";
import { IoFilterOutline } from "react-icons/io5";
import FilterToolTip from "components/filterTooltip";
import { useSearchParams } from "next/navigation";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";

type ProjectResult = {
  _id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  link: string;
  date: Date;
};

export default function Projects() {
  const searchParams = useSearchParams();
  const filterSkills = searchParams.get("filterSkills");

  const [projects, setProjects] = useState<ProjectResult[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<ProjectResult[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProjects, setFilteredProjects] = useState<ProjectResult[]>([]);
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);
  const [allSkills, setAllSkills] = useState<Set<string>>(new Set());
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    filterSkills ? [filterSkills] : []
  );
  const projectsPerPage = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sorting, setSorting] = useState<boolean>(true);

  const sortProjects = (projectsToSort: ProjectResult[]) => {
    const sorted = [...projectsToSort]; // Create a new array to avoid mutating state
    if (sorting) {
      sorted.sort((a: any, b: any) => b.date - a.date); // Sort from latest to earliest (descending)
    } else {
      sorted.sort((a: any, b: any) => a.date - b.date); // Sort from earliest to latest (ascending)
    }
    setFilteredProjects(sorted);
  };

  const applyFilters = () => {
    let newFilteredProjects = [...projects];

    if (searchQuery) {
      newFilteredProjects = newFilteredProjects.filter((proj) =>
        proj.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSkills.length > 0) {
      newFilteredProjects = newFilteredProjects.filter((proj) =>
        selectedSkills.every((skill) => proj.skills.includes(skill))
      );
    }

    if (sorting) {
      newFilteredProjects.sort((a: any, b: any) => b.date - a.date); // Sort from latest to earliest (descending)
    } else {
      newFilteredProjects.sort((a: any, b: any) => a.date - b.date); // Sort from earliest to latest (ascending)
    }

    setFilteredProjects(newFilteredProjects);
    setCurrentPage(1);
  };

  const addSelectedSkill = (skill: string) => {
    setSelectedSkills((prevSkills) => {
      if (!prevSkills.includes(skill)) {
        return [...prevSkills, skill];
      }
      return prevSkills;
    });
  };

  const removeSelectedSkill = (skill: string) => {
    setSelectedSkills((prevSkills) => prevSkills.filter((sk) => sk !== skill));
  };

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
      setFilteredProjects(
        projectsWithDates.sort((a: any, b: any) => b.date - a.date)
      );

      const skillList = projectsWithDates.flatMap((result) => result.skills);
      const skillSet = new Set(skillList);
      setAllSkills(skillSet);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedSkills, projects]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    setDisplayedProjects(filteredProjects.slice(startIndex, endIndex));
  }, [currentPage, filteredProjects]);

  const numOfPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numOfPages));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSortClick = () => {
    setSorting((prevSorting) => !prevSorting);
    sortProjects(filteredProjects);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="relative">
          <h1 className="font-bold text-3xl text-center m-3">Projects</h1>
          <section className="flex gap-2 items-center justify-center">
            <input
              type="text"
              placeholder="search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-2 border-[#2D4734] rounded-lg p-1"
            />
            <button onClick={() => setOpenTooltip(!openTooltip)}>
              <IoFilterOutline />
            </button>
            <button onClick={handleSortClick}>
              {!sorting ? <RiSortAsc /> : <RiSortDesc />}
            </button>
          </section>
          {openTooltip && (
            <div className="absolute top-10 right-1/2 translate-x-3/5 z-10 min-w-lg">
              <FilterToolTip
                skills={Array.from(allSkills)}
                addSelectedSkill={addSelectedSkill}
                removeSelectedSkill={removeSelectedSkill}
                selectedSkills={selectedSkills}
              />
            </div>
          )}
          <section className="flex flex-wrap items-center justify-center m-2">
            {displayedProjects.length > 0 ? (
              displayedProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))
            ) : (
              <p>No projects available</p>
            )}
          </section>
          {filteredProjects.length > 0 && numOfPages > 1 && (
            <section className="flex items-center justify-center m-3">
              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                className="bg-color-primary-green rounded-md text-white p-2 m-2 disabled:bg-gray-400"
              >
                <FaChevronLeft />
              </button>
              Page {currentPage} of {numOfPages}
              <button
                onClick={nextPage}
                disabled={currentPage === numOfPages}
                className="bg-color-primary-green rounded-md text-white p-2 m-2 disabled:bg-gray-400"
              >
                <FaChevronRight />
              </button>
            </section>
          )}
        </main>
      )}
    </>
  );
}
