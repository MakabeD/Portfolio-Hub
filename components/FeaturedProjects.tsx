"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projectsData } from "../data/projects";
import Link from "next/link";

export default function FeaturedProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="bg-zinc-950 px-6 py-24" ref={ref}>
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-12">
          <h2 className="mb-2 font-mono text-sm tracking-widest text-violet-400">
            FEATURED WORK
          </h2>
          <h3 className="text-3xl font-bold text-zinc-100 md:text-4xl">
            Projects I've Built
          </h3>
          <p className="mt-4 text-zinc-400">
            A selection of projects that showcase my skills in software
            engineering and machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <ProjectCard
                title={project.title}
                type={project.type}
                description={project.description_short}
                href={`/${project.slug}`}
              />
            </motion.div>
          ))}
        </div>

        {projectsData.length === 0 && (
          <motion.div
            className="rounded-xl border border-dashed border-zinc-800 p-12 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-zinc-500">
              More projects coming soon. Stay tuned!
            </p>
          </motion.div>
        )}

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-900"
          >
            View All Projects
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
