import ProjectCard from "../components/ProjectCard";
import {projectsData} from "../data/projects"

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>

      <h1 style={{ border: '1px solid black', padding: '1rem', marginBottom: '2rem' }}>
        Projects
      </h1>
      <div>
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
    </main>
  );
}