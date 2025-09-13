type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

export default function ProjectCard({ title, description, imageUrl }: ProjectCardProps) {
  return (
    <a href="/projects/[project]" className="block hover:shadow-lg transition-shadow duration-300">
      <div className="border rounded-lg overflow-hidden shadow-lg">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </a>
  );
}