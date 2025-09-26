"use client";
import { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
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

type PopUpProps = {
  closePopUp: () => void;
  addProject: (project:ProjectResult)=>void;
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

export default function AddProjectInfoForm({
  closePopUp,
  addProject
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

  const addAProject = async() =>{
    try{
        await axios.post("http://localhost:5000/projects/add_project", projectInfo)
        addProject(projectInfo);
    }catch(err){
        console.error("Error adding Project: ", err);
    }
    
  }


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
            <h2 className="font-bold text-2xl">Adding: {projectInfo.title}</h2>
            <button className="text-2xl" onClick={closePopUp}>
              <RiCloseFill />
            </button>
          </section>
          <form
            action="/send-message"
            className="flex flex-col gap-2 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              // Add your form submission logic here
              console.log(projectInfo);
              closePopUp();
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
            <div className="flex items-center justify-end gap-2">
              <button
                type="submit"
                className="bg-color-secondary-green rounded-lg p-2"
                onClick={addAProject}
              >
                Add
              </button>
              <button type="button" onClick={closePopUp} className="bg-color-secondary-green rounded-lg p-2">
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
}
