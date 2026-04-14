import Link from "next/link";
import PlaygroundCard from "@/components/PlaygroundCard";
import { projectsData } from "../../../data/projects";
import { mlp_playgroundsData } from "../../../data/mlp_playgrounds";

export default function Mlpservices() {
  const project = projectsData.find((p) => p.slug === "mlp_services");

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950">
        <h1 className="text-2xl font-semibold text-zinc-500 font-mono tracking-widest uppercase">
          404 | Project not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Back to Projects */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-zinc-100"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to Projects
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="mb-6 text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-400">
            {project.description_large}
          </p>
        </div>

        <div className="mb-16 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg">
          <h3 className="mb-4 text-sm font-mono font-semibold uppercase tracking-wider text-zinc-500">
            Technologies & Stack
          </h3>

          <ul className="flex flex-wrap gap-3 m-0 p-0">
            {project.technologies.map((tech, index) => (
              <li
                key={index}
                className="list-none rounded-full border border-zinc-700 bg-zinc-800/50 px-4 py-1.5 text-sm font-mono
                text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="mb-8 border-b border-zinc-800 pb-4 text-2xl font-bold tracking-tight text-zinc-100">
            Our services (Playgrounds)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mlp_playgroundsData.map((info) => (
              <PlaygroundCard
                key={info.id}
                title={info.title}
                description={info.description}
                slug={info.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
