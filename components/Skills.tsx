"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Tech icons from react-icons
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiGooglecloud,
  SiDocker,
  SiMlflow,
  SiGit,
  SiDvc,
  SiFastapi,
  SiNextdotjs,
  SiTailwindcss,
  SiPydantic,
  SiNumpy,
} from "react-icons/si";

const skills = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: <SiPython className="h-4 w-4" /> },
      { name: "TypeScript", icon: <SiTypescript className="h-4 w-4" /> },
      { name: "JavaScript", icon: <SiJavascript className="h-4 w-4" /> },
    ],
  },
  {
    category: "AI, Data & Deep Learning",
    items: [
      { name: "PyTorch", icon: <SiPytorch className="h-4 w-4" /> },
      { name: "Scikit-Learn", icon: <SiScikitlearn className="h-4 w-4" /> },
      { name: "Pandas", icon: <SiPandas className="h-4 w-4" /> },
      { name: "NumPy", icon: <SiNumpy className="h-4 w-4" /> },
      { name: "Matplotlib/Seaborn", icon: <SiPandas className="h-4 w-4" /> },
    ],
  },
  {
    category: "MLOps & Cloud",
    items: [
      { name: "Google Cloud", icon: <SiGooglecloud className="h-4 w-4" /> },
      { name: "Docker", icon: <SiDocker className="h-4 w-4" /> },
      { name: "MLflow", icon: <SiMlflow className="h-4 w-4" /> },
      { name: "DVC", icon: <SiDvc className="h-4 w-4" /> },
      { name: "Git", icon: <SiGit className="h-4 w-4" /> },
    ],
  },
  {
    category: "Web & APIs",
    items: [
      { name: "FastAPI", icon: <SiFastapi className="h-4 w-4" /> },
      { name: "Next.js / React", icon: <SiNextdotjs className="h-4 w-4" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="h-4 w-4" /> },
      { name: "Pydantic", icon: <SiPydantic className="h-4 w-4" /> },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="border-t border-zinc-800 bg-zinc-900/30 px-6 py-24"
      ref={ref}
    >
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-12 text-center">
          <h2 className="mb-2 font-mono text-sm tracking-widest text-violet-400">
            TECH STACK
          </h2>
          <h3 className="text-3xl font-bold text-zinc-100 md:text-4xl">
            Technologies I Work With
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: groupIndex * 0.15, duration: 0.5 }}
            >
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-600 hover:shadow-lg">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
                  {skillGroup.category}
                </h4>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                      }
                      transition={{
                        delay: groupIndex * 0.15 + skillIndex * 0.1 + 0.2,
                        duration: 0.4,
                      }}
                      className="flex items-center gap-2.5 text-sm text-zinc-400"
                    >
                      <span className="text-zinc-300 transition-colors group-hover:text-zinc-100">
                        {skill.icon}
                      </span>
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
