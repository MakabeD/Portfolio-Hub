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

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-cyan-600/10 rounded-3xl blur-3xl" />
          <div className="relative rounded-2xl border border-zinc-800/50 bg-zinc-900/80 p-8 md:p-10">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs font-medium text-violet-300 border border-violet-500/30">
                    Interactive
                  </span>
                  <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-xs font-medium text-cyan-300 border border-cyan-500/30">
                    Real-time
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
                  Try Our ML Playgrounds
                </h2>
                <p className="mt-2 text-zinc-400 max-w-xl">
                  Interact with our deployed models directly in your browser.
                  Adjust parameters and see predictions in real-time.
                </p>
              </div>
              <div className="hidden sm:flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 shadow-lg shadow-violet-500/25">
                <svg
                  className="h-7 w-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mlp_playgroundsData.map((info) => (
                <div key={info.id} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                  <div className="relative">
                    <PlaygroundCard
                      title={info.title}
                      description={info.description}
                      slug={info.slug}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span>First prediction may take 30-40 seconds</span>
              </div>
              <span className="font-mono">Powered by PyTorch + FastAPI</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
