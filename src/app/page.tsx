"use client";
import ProjectCard from "../components/projectCard";
import ContactForm from "../components/contactForm";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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

  const goToResume = () => {
    router.push("/resume");
  };

  return (
    <>
      <main>
        <section className="bg-color-pink text-white p-8 flex items-center justify-center flex-wrap gap-4">
          <Image
            src="/frameProf.png"
            alt="Profile Picture"
            width={500}
            height={700}
          />
          <section>
            <h1 className="font-bold text-3xl text-center">
              Welcome to my portfolio!
            </h1>
            <h2 className="text-xl text-center">Dana Dabdoub</h2>
          </section>
        </section>

        <section className="p-8 flex items-center justify-around flex-wrap">
          <h2 className="text-xl font-bold">About me</h2>
          <p className="my-5 mx-10 max-w-xl">
            I am a passionate developer with experience in building applications
            using modern technologies. My portfolio showcases my skills and
            projects that I have worked on. Feel free to explore and reach out
            if you have any questions or opportunities!
          </p>
          <button
            className="bg-color-primary-green rounded-lg px-4 py-2 text-white max-w-md m-2 flex items-center"
            onClick={goToResume}
          >
            My Resume
            <FaChevronRight className="ml-1" />
          </button>
        </section>

        <section className="bg-color-primary-green p-8 flex flex-col items-center">
          <h2 className="text-xl mb-4 font-bold text-white">Checkout my projects</h2>
          <div className="flex gap-4 overflow-auto">
            {projects.length > 0
              ? projects.slice(0,3).map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))
              : "No projects available"}
          </div>
        </section>

        <section className="p-8 m-5 flex flex-col items-center">
          <h2 className="text-xl font-bold text-center mb-2">Contact me</h2>
          <ContactForm />
        </section>
      </main>
    </>
  );
}
