"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import AdminProjectCard from "components/adminProjectCard";
import axios from "axios";
import AddProjectInfoForm from "components/addProjectForm";

// Define the type for a single project result
type ProjectResult = {
  _id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  link: string;
  date: Date; // Note: In the initial fetch, this is converted from a string to a Date object
};

// Define the number of projects to display per page
const PROJECTS_PER_PAGE = 9;

export default function AdminProjects() {
  // State for all projects fetched from the backend
  const [allProjects, setAllProjects] = useState<ProjectResult[]>([]);
  // State for search term input
  const [searchTerm, setSearchTerm] = useState<string>("");
  // State for the current pagination page
  const [currentPage, setCurrentPage] = useState<number>(1);
  // State for loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to control the visibility of the Add Project form
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // --- Data Fetching ---

  const getAllProjects = useCallback(async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await axios.get("http://localhost:5000/projects");
      const projectData: ProjectResult[] = res.data;

      // Convert the date string to a Date object for each project
      // And sort them by date, newest first (optional, but good practice for project lists)
      const projectsWithDates = projectData
        .map((proj) => ({
          ...proj,
          date: new Date(proj.date),
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort descending by date

      setAllProjects(projectsWithDates);
      setCurrentPage(1); // Reset to the first page after fetching new data
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Optional: Add user-facing error message here
    } finally {
      setIsLoading(false); // Stop loading
    }
  }, []);

  useEffect(() => {
    getAllProjects();
  }, [getAllProjects]);

  // --- CRUD Operations (UI State Management) ---

  const addProject = (project: ProjectResult) => {
    // Add the new project to the list and sort again
    setAllProjects((prevProjects) =>
      [...prevProjects, project].sort((a, b) => b.date.getTime() - a.date.getTime())
    );
    setCurrentPage(1); // Go back to the first page to see the new project
  };

  const editProject = (project: ProjectResult) => {
    // Replace the old version with the edited project and re-sort
    setAllProjects((prevProjects) =>
      prevProjects
        .map((pr) => (pr._id === project._id ? project : pr))
        .sort((a, b) => b.date.getTime() - a.date.getTime())
    );
  };

  const deleteProject = (project: ProjectResult) => {
    // Filter out the deleted project
    setAllProjects((prevProjects) =>
      prevProjects.filter((pr) => pr._id !== project._id)
    );
    
    setCurrentPage((prev) => Math.min(prev, Math.ceil((allProjects.length - 1) / PROJECTS_PER_PAGE) || 1));
  };

  // --- Filtering and Pagination Logic ---

  // Filter projects based on the search term (by title, case-insensitive)
  const filteredProjects = useMemo(() => {
    if (!searchTerm) {
      return allProjects;
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return allProjects.filter((project) =>
      project.title.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allProjects, searchTerm]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  // Calculate the slice of projects to display on the current page
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]);

  // Handle page change
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Reset page to 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  // --- Render Components ---

  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    // Determine the range of page buttons to show (e.g., current +/- 2)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Adjust range if near the start or end
    if (currentPage <= 3) endPage = Math.min(totalPages, 5);
    if (currentPage > totalPages - 2) startPage = Math.max(1, totalPages - 4);


    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
      <div className="flex justify-center items-center my-4 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm rounded-md border border-gray-300 disabled:opacity-50"
        >
          &larr; Prev
        </button>

        {/* First page and ellipsis */}
        {startPage > 1 && (
            <>
                <button
                    onClick={() => goToPage(1)}
                    className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                >
                    1
                </button>
                {startPage > 2 && <span className="px-2">...</span>}
            </>
        )}

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 text-sm rounded-md ${
              page === currentPage
                ? "bg-color-primary-green text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Ellipsis and last page */}
        {endPage < totalPages && (
            <>
                {endPage < totalPages - 1 && <span className="px-2">...</span>}
                <button
                    onClick={() => goToPage(totalPages)}
                    className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                >
                    {totalPages}
                </button>
            </>
        )}

        {/* Next Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm rounded-md border border-gray-300 disabled:opacity-50"
        >
          Next &rarr;
        </button>
      </div>
    );
  };

  return (
    <main className="p-4">
      <section className="max-w-6xl mx-auto">
        {/* --- Top Control Section (Add Button & Search Bar) --- */}
        <section className="flex flex-col sm:flex-row items-center justify-between w-full mb-4 space-y-3 sm:space-y-0">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search projects by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-color-primary-green focus:border-color-primary-green"
          />

          {/* Add Project Button */}
          <button
            className="w-full sm:w-auto bg-color-primary-green text-white rounded-lg p-2 transition duration-150 ease-in-out hover:opacity-90"
            onClick={() => setIsAdding(true)}
          >
            ➕ Add New Project
          </button>

          {/* Add Project Form Pop-up */}
          {isAdding && (
            <AddProjectInfoForm
              closePopUp={() => setIsAdding(false)}
              addProject={addProject}
            />
          )}
        </section>

        {/* --- Project List Section --- */}
        <section className="flex flex-wrap items-stretch justify-center my-4 gap-4">
          {isLoading ? (
            <p className="text-lg text-gray-500">Loading projects...</p>
          ) : paginatedProjects.length > 0 ? (
            paginatedProjects.map((project) => (
              <AdminProjectCard
                key={project._id}
                project={project}
                editProject={editProject}
                deleteProject={deleteProject}
              />
            ))
          ) : searchTerm ? (
            <p className="text-lg text-gray-500">No projects found matching "{searchTerm}".</p>
          ) : (
            <p className="text-lg text-gray-500">No projects available.</p>
          )}
        </section>

        {/* --- Pagination Controls --- */}
        {renderPaginationButtons()}

        {/* Displaying information about the current view */}
        <div className="text-center text-sm text-gray-500 mt-2">
            Showing {paginatedProjects.length} of {filteredProjects.length} filtered projects.
            {searchTerm && ` (Total ${allProjects.length} projects before search)`}
        </div>
      </section>
    </main>
  );
}