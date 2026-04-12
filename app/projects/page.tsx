"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";
import { projectsData } from "../../data/projects";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const projectTypes = useMemo(() => {
    const types = projectsData.map((p) => p.type);
    return ["All", ...Array.from(new Set(types))];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    return projectsData.filter((p) => p.type === activeFilter);
  }, [activeFilter]);

  return (
    <main className="relative min-h-screen bg-zinc-950">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />

      <section className="relative px-6 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
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
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="mb-3 font-mono text-sm tracking-widest text-violet-400">
              PORTFOLIO
            </p>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-100 md:text-6xl">
              Projects I've{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Built
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-zinc-400">
              A collection of real-world applications, from deep learning models
              to cloud-deployed APIs. Each project represents a unique challenge
              and learning experience.
            </p>
          </motion.div>

          {projectTypes.length > 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8"
            >
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      activeFilter === type
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                        : "border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                >
                  <ProjectCard
                    title={project.title}
                    type={project.type}
                    description={project.description_short}
                    technologies={project.technologies}
                    href={`/${project.slug}`}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-2xl border border-dashed border-zinc-800 p-16 text-center"
            >
              <span className="mb-4 block text-5xl">🔍</span>
              <h3 className="mb-2 text-xl font-semibold text-zinc-300">
                No projects found
              </h3>
              <p className="text-zinc-500">
                No projects match the "{activeFilter}" filter. Try another
                category!
              </p>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-6 rounded-full bg-violet-600 px-6 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-500"
              >
                Show All Projects
              </button>
            </motion.div>
          )}

          {filteredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-12 text-center text-sm text-zinc-500"
            >
              Showing {filteredProjects.length} of {projectsData.length} project
              {projectsData.length !== 1 ? "s" : ""}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
