type ProjectCardProps = {
  project: Object & {
    _id: string;
    title: string;
    description: string;
    image: string;
    skills: string[];
    link: string;
    date: Date;
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const url = "/projects/"+project._id;
  return (
    <a
      href={url}
      className="block hover:shadow-lg transition-shadow duration-300 max-w-80  min-w-80 m-2"
    >
      <div className="border rounded-lg overflow-hidden shadow-lg bg-white max-h-90 min-h-90 flex flex-col items-center">
        <img
          src={project.image}
          alt={project.title}
          className="w-auto h-48 bg-gray-100 self-center text-center"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{project.title}</h2>
          <p className="text-gray-700">{project.description.split(" ").length >14 ? project.description.split(" ").slice(0,14).join(" ") + "...": project.description}</p>
        </div>
      </div>
    </a>
  );
}
