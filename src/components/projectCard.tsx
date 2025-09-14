type ProjectCardProps = {
  project: Object & {
    _id: string;
    title: string;
    description: string;
    image: string;
    skills: string[];
    link: string;
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const url = "/projects/"+project._id;
  return (
    <a
      href={url}
      className="block hover:shadow-lg transition-shadow duration-300 max-w-100  min-w-100 m-2"
    >
      <div className="border rounded-lg overflow-hidden shadow-lg bg-white max-h-90 min-h-90">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{project.title}</h2>
          <p className="text-gray-700">{project.description}</p>
        </div>
      </div>
    </a>
  );
}
