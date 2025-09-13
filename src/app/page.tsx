"use client";
import Header from "../components/header";
import Footer from "../components/footer";
import ProjectCard from "../components/projectCard";
import ContactForm from "../components/contactForm";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";



export default function Home() {

  const [projects, setProjects] = useState([]);

  const getAllProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects");
      console.log(res);
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
        <section className="bg-color-teal text-white p-8 flex items-center justify-center">
          <Image
            src="/frameProf.png"
            alt="Profile Picture"
            width={500}
            height={700}
            className="mr-8"
          />
          <section>
            <h1 className="font-bold text-3xl text-center">
              Welcome to my portfolio!
            </h1>
            <h2 className="text-xl text-center">Dana Dabdoub</h2>
          </section>
        </section>

        <section className="p-8">
          <h2 className="text-xl mb-2">About me</h2>
          <div>
            <p>
              I am a passionate developer with experience in building
              applications using modern technologies. My portfolio showcases my
              skills and projects that I have worked on. Feel free to explore
              and reach out if you have any questions or opportunities!
            </p>
            <button className="bg-color-teal rounded-lg px-4 py-2 text-white">
              Know more
            </button>
          </div>
        </section>

        <section className="bg-color-pink p-8">
          <h2 className="text-xl mb-2">Checkout my projects</h2>
          <div className="flex flex-wrap gap-4">
            {projects.length > 0
              ? projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))
              : "No projects available"}
          </div>
        </section>

        <section className="p-8 m-5 flex flex-col items-center">
          <h2 className="text-xl text-center mb-2">Contact me</h2>
          <ContactForm />
        </section>
      </main>

      <Footer />
    </>
  );
}
