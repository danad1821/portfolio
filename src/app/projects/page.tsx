"use client";
import ProjectCard from "components/projectCard";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
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
  const projectsPerPage = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortType, setSortType] = useState<"date" | "title">("date");
  const [sortingOrder, setSortingOrder] = useState<boolean>(true);

  const popupRef = useRef<HTMLDivElement>(null);
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

    if (sortType === "date") {
      newFilteredProjects.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortingOrder ? dateB - dateA : dateA - dateB;
      });
    } else if (sortType === "title") {
      newFilteredProjects.sort((a, b) => {
        if (sortingOrder) {
          return b.title.localeCompare(a.title); // Z-A
        } else {
          return a.title.localeCompare(b.title); // A-Z
        }
      });
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
  }, [searchQuery, selectedSkills, projects, sortType, sortingOrder]);

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="relative">
          <h1 className="font-bold text-3xl text-center m-3">Projects</h1>
          <section className="flex flex-col gap-2 items-center justify-center">
            <div className="flex items-center gap-1">
              <input
                type="text"
                placeholder="search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-2 border-[#2D4734] rounded-lg p-1"
              />
              <button
                onClick={() => setOpenTooltip(!openTooltip)}
              >
                <IoFilterOutline />
              </button>
            </div>
            <div className="flex items-center gap-1">
              <select
                name="sortingOption"
                id="sortingOption"
                value={sortType}
                onChange={(e) =>
                  setSortType(e.target.value as "date" | "title")
                }
                className="border-2 rounded-lg border-b-[#2D4734]"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort By Title</option>
              </select>
              <button onClick={() => setSortingOrder(!sortingOrder)}>
                {sortingOrder ? <RiSortDesc /> : <RiSortAsc />}
              </button>
            </div>
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
