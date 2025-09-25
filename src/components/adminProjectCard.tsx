"use client";
type ProjectResult = {
  _id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  link: string;
  date: Date;
};
type ProjectCardProps = {
  project: ProjectResult;
  editProject: (project: ProjectResult)=> void;
  deleteProject: (project: ProjectResult)=> void;
};
import { useState } from "react";
import EditProjectInfoForm from "./editProjectInfoForm";

export default function AdminProjectCard({ project, editProject, deleteProject }: ProjectCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const closeEditingWindow = ()=>{
    setIsEditing(false);
  }

  const deleteAProject = () =>{
    deleteProject(project);
  }
  return (
    <>
      <div className="block hover:shadow-lg transition-shadow duration-300 max-w-80  min-w-80 m-2">
        <div className="border rounded-lg overflow-hidden shadow-lg bg-white max-h-60 min-h-60 flex flex-col items-center">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="text-gray-700">
              {project.description.split(" ").length > 14
                ? project.description.split(" ").slice(0, 14).join(" ") + "..."
                : project.description}
            </p>
          </div>
          <div>
            <button
              className="bg-green-500 p-2 m-2 rounded-lg text-white"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit
            </button>
            <button className="bg-red-500 p-2 rounded-lg m-2 text-white" onClick={deleteAProject}>
              Delete
            </button>
          </div>
          {
            isEditing ? <EditProjectInfoForm closePopUp={closeEditingWindow} project={project} editProject={editProject}/> : <></>
          }
          
        </div>
      </div>
    </>
  );
}
