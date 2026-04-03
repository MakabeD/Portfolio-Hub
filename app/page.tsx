import ProjectCard from "../components/ProjectCard";
import { projectsData } from "../data/projects";

export default function Home() {
  return (

    <main className="min-h-screen bg-zinc-950 px-6 py-24">
      
      
      <div className="max-w-5xl mx-auto">
        
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight mb-12">
          Projects
        </h1>
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              type={project.type}
              description={project.description_short}
              href={`/${project.slug}`}
            />
          ))}
        </div>

      </div>
    </main>
  );
}