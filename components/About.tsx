"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-zinc-950 px-6 py-24" ref={ref}>
      <motion.div
        className="mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-12">
          <h2 className="mb-2 font-mono text-sm tracking-widest text-violet-400">
            ABOUT ME
          </h2>
          <h3 className="text-3xl font-bold text-zinc-100 md:text-4xl">
            Passionate about code & algorithms
          </h3>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="leading-relaxed text-zinc-400">
              I'm a Software Engineering student with a deep fascination for
              machine learning and artificial intelligence. I love building
              intelligent applications that solve real-world problems.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-400">
              My journey started with a curiosity about how computers learn, and
              has grown into hands-on experience with PyTorch, FastAPI, and cloud
              deployment. I'm constantly learning and looking for opportunities to
              apply cutting-edge technology to practical solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h4 className="mb-4 font-semibold text-zinc-100">
                Current Focus
              </h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  Deep Learning & Neural Networks
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Cloud Architecture & Deployment
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  API Design & Microservices
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Software Engineering Best Practices
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
