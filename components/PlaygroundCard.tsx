"use client";

import React, { useRef, MouseEvent } from "react";
import Link from "next/link";

interface PlaygroundCardProps {
  title: string;
  description: string;
  slug: string;
}

export default function PlaygroundCard({
  title,
  description,
  slug,
}: PlaygroundCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <Link href={`/projects/${slug}`} className="block w-full no-underline group">
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative flex w-full flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl transition-all duration-300 hover:border-violet-500/50 hover:shadow-violet-500/10 cursor-pointer"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(
              600px circle at var(--x, 50%) var(--y, 50%),
              rgba(139, 92, 246, 0.15),
              transparent 40%
            )`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="m-0 text-xl font-bold tracking-tight text-zinc-100 group-hover:text-violet-300 transition-colors">
              {title}
            </h3>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-violet-600">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>

          <small className="font-mono text-xs tracking-wider text-zinc-500 uppercase">
            TYPE:{" "}
            <strong className="font-semibold text-zinc-300">
              MLP SERVICES
            </strong>
          </small>

          <p className="m-0 text-sm leading-relaxed text-zinc-400">
            {description}
          </p>

          <div className="mt-2 flex items-center gap-2 text-sm font-medium text-violet-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span>Try it now</span>
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
