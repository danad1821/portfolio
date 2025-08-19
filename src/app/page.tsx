import Header from "../components/header";
import Footer from "../components/footer";
import ProjectCard from "../components/projectCard";
import ContactForm from "../components/contactForm";
import Image from "next/image";

export default function Home() {
  let projects = [
    {
      name: "Project 1",
      description: "Description of project 1",
      url: "https://example.com/project1",
    },
    {
      name: "Project 2",
      description: "Description of project 2",
      url: "https://example.com/project1",
    },
    {
      name: "Project 3",
      description: "Description of project 3",
      url: "https://example.com/project1",
    },
  ];

  const projectList = projects.map((project, index) => (
    <ProjectCard
      key={index}
      title={project.name}
      description={project.description}
      imageUrl={project.url}
    />
  ));

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
            <h1 className="font-bold text-3xl">Welcome to my portfolio!</h1>
            <h2 className="text-xl text-center">Dana Dabdoub</h2>
          </section>
        </section>
        <section className="p-8">
          <h2 className="text-xl mb-2">About me</h2>
          <p>
            I am a passionate developer with experience in building applications
            using modern technologies. My portfolio showcases my skills and
            projects that I have worked on. Feel free to explore and reach out
            if you have any questions or opportunities!
          </p>
        </section>
        <section className="bg-color-pink p-8">
          <h2 className="text-xl mb-2">Checkout my projects</h2>
          <div className="flex flex-wrap gap-4">{projectList}</div>
        </section>

        <section className="p-8 m-5">
          <h2 className="text-xl text-center mb-2">Contact me</h2>
          <ContactForm/>
        </section>
      </main>

      <Footer />
    </>
  );
}
