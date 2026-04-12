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
    <Link href={`/projects/${slug}`} className="block w-full no-underline">
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl transition-all duration-300 hover:border-zinc-500 hover:scale-[1.02]"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(
              600px circle at var(--x, 50%) var(--y, 50%),
              rgba(255,255,255,0.1),
              transparent 40%
            )`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-2">
          <h3 className="m-0 text-xl font-bold tracking-tight text-zinc-100">
            {title}
          </h3>

          <small className="font-mono text-xs tracking-wider text-zinc-500 uppercase">
            TYPE:{" "}
            <strong className="font-semibold text-zinc-300">
              MLP SERVICES
            </strong>
          </small>

          <p className="m-0 mt-2 text-sm leading-relaxed text-zinc-400">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
}
