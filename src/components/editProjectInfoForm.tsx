"use client";
import { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

type ProjectResult = {
  _id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  link: string;
  date: Date;
};

type PopUpProps = {
  closePopUp: () => void;
  project: ProjectResult;
  editProject: (project: ProjectResult) => void;
};

// Helper function to format a Date object into "YYYY-MM-DD" string
const formatDateForInput = (date: Date) => {
  if (!date) return ""; // Handle case where date is not provided
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function EditProjectInfoForm({
  closePopUp,
  project,
  editProject,
}: PopUpProps) {
  // Initialize state with the correct type and empty values
  const [projectInfo, setProjectInfo] = useState<ProjectResult>({
    _id: "",
    title: "",
    description: "",
    image: "",
    skills: [],
    link: "",
    date: new Date(), // Initialize with a new Date object
  });

  const [skillInput, setSkillInput] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "date") {
      // When the date input changes, parse the string value back to a Date object
      setProjectInfo((prev) => ({
        ...prev,
        date: new Date(value),
      }));
    } else {
      // For all other inputs, update the state normally
      setProjectInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the click from bubbling up to the parent elements
  };

  const confirmEdits = async () => {
    if (!projectInfo._id || projectInfo._id.length !== 24) {
      console.error(
        "Error: Project ID is missing or invalid. Aborting update."
      );
      // Optional: Show an error message to the user
      return;
    }
    try {
      console.log(project);
      console.log(projectInfo);
      await axios.post(
        "http://localhost:5000/projects/edit_project",
        projectInfo
      );

      editProject(projectInfo);
      closePopUp(); // Close on success
    } catch (er) {
      console.error("Error confirming edits:", er);
      // Optional: Add user-facing error message here
    }
  };

  const addSkill = () => {
    // 1. Basic validation: don't add empty skills
    if (!skillInput.trim()) return;

    setProjectInfo((prev) => ({
      ...prev,
      // 2. Create a NEW array by spreading the old skills and adding the new one
      skills: [...prev.skills, skillInput.trim()],
    }));

    // 3. Clear the input field
    setSkillInput("");
  };

  const removeSkill = (skillToRemove: string) => {
    setProjectInfo((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  useEffect(() => {
    // Ensure the date object is properly copied from props
    if (project) {
      setProjectInfo({
        ...project,
        date: new Date(project.date), // Clone the date to avoid mutation issues
      });
    }
  }, [project]);

  return (
    <section>
      {/* Overlay - covers the entire screen */}
      <div className="fixed inset-0 z-10 bg-black opacity-50"></div>

      {/* Popup - centered over the overlay */}
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        {/* Add the onClick handler to stop propagation */}
        <section
          className="bg-color-primary-green text-white rounded-lg py-6 px-4 shadow-lg flex flex-col justify-center min-w-90"
          onClick={handlePopupClick}
        >
          <section className="flex justify-between">
            <h2 className="font-bold text-2xl">Editing: {projectInfo.title}</h2>
            <button className="text-2xl" onClick={closePopUp}>
              <RiCloseFill />
            </button>
          </section>
          <form
            action="/send-message"
            className="flex flex-col gap-2 items-center"
            onSubmit={async (e) => {
              e.preventDefault();
              await confirmEdits(); // Call the async function
            }}
          >
            <div className="flex justify-center flex-wrap gap-2">
              <div className="flex flex-col gap-4 w-70">
                <label htmlFor="title" className="mt-2">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="border-[#568F87] border-2 rounded-lg p-4 bg-white text-black"
                  placeholder=""
                  value={projectInfo.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-4 w-70">
                <label htmlFor="description-input" className="mt-2">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description-input"
                  className="border-[#568F87] border-2 rounded-lg p-4 bg-white text-black"
                  placeholder=""
                  value={projectInfo.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex justify-center flex-wrap gap-2">
              <div className="flex flex-col gap-4 w-70">
                <label htmlFor="link" className="mt-2">
                  Link
                </label>
                <input
                  type="text"
                  name="link"
                  id="link"
                  className="border-[#568F87] border-2 rounded-lg p-4 bg-white text-black"
                  placeholder=""
                  value={projectInfo.link}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-4 w-70">
                <label htmlFor="date" className="mt-2">
                  Date of completion
                </label>
                <input
                  type="date"
                  name="date" // Corrected name to 'date'
                  id="date"
                  className="border-[#568F87] border-2 rounded-lg p-4 bg-white text-black"
                  value={formatDateForInput(projectInfo.date)} // Use helper function
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-70">
              <label htmlFor="image" className="mt-2">
                Image
              </label>
              <input
                type="text"
                name="image"
                id="image"
                className="border-[#568F87] border-2 rounded-lg p-4 bg-white text-black"
                placeholder=""
                value={projectInfo.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col gap-4 w-70 items-center">
              <label htmlFor="skill" className="mt-2">
                Skills
              </label>
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  name="skill"
                  id="skill"
                  className="border-[#568F87] border-2 rounded-lg p-4 bg-white text-black"
                  placeholder=""
                  value={skillInput}
                  onChange={(e) => {
                    setSkillInput(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-color-secondary-green rounded-lg text-md p-2 m-2 min-w-30"
                >
                  Add skill
                </button>
              </div>
            </div>
            <section className="flex flex-wrap">
              {projectInfo.skills.length > 0 ? (
                projectInfo.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-color-pink rounded-lg p-2 m-2 flex items-center"
                  >
                    <p>{skill}</p>
                    <button
                      onClick={() => {
                        removeSkill(skill);
                      }}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                ))
              ) : (
                <section>No skills inputted yet...</section>
              )}
            </section>
            <div className="flex items-center justify-end gap-2">
              <button
                type="submit"
                className="bg-color-secondary-green rounded-lg p-2"
              >
                Confirm changes
              </button>
              <button
                type="button"
                onClick={closePopUp}
                className="bg-color-secondary-green rounded-lg p-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
}
