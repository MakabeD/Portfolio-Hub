"use client";

import React, { useRef, MouseEvent } from "react";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  type: string;
  description: string;
  technologies: string[];
  href: string;
}

const getProjectIcon = (type: string) => {
  const icons: Record<string, string> = {
    MLP: "🧠",
    Classification: "📊",
    Regression: "📈",
    NLP: "💬",
    Computer: "👁️",
    API: "⚡",
  };

  return Object.keys(icons).find((key) => type.includes(key))
    ? icons[Object.keys(icons).find((key) => type.includes(key))!]
    : "🚀";
};

export default function ProjectCard({
  title,
  type,
  description,
  technologies,
  href,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  const displayTech = technologies.slice(0, 3);
  const techOverflow = technologies.length - 3;

  return (
    <Link href={`/projects${href}`} className="group block w-full no-underline">
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl transition-all duration-300 hover:border-zinc-600 hover:shadow-2xl hover:shadow-violet-500/5"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(
              600px circle at var(--x, 50%) var(--y, 50%),
              rgba(139,92,246,0.15),
              transparent 40%
            )`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <span className="text-2xl" role="img" aria-hidden="true">
              {getProjectIcon(type)}
            </span>
            <span className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 font-mono text-xs tracking-wider text-zinc-400">
              {type.toUpperCase()}
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-zinc-100 transition-colors duration-300 group-hover:text-violet-300">
            {title}
          </h3>

          <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
        </div>

        <div className="relative z-10 mt-6 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {displayTech.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300 ring-1 ring-violet-500/20"
              >
                {tech}
              </span>
            ))}
            {techOverflow > 0 && (
              <span className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-500">
                +{techOverflow}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors duration-300 group-hover:text-violet-400">
            <span>View Details</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
          </div>
        </div>
      </article>
    </Link>
  );
}
