"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="mb-4 font-mono text-sm tracking-widest text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            HELLO, I'M
          </motion.p>

          <motion.h1
            className="mb-6 text-5xl font-extrabold tracking-tight text-zinc-100 md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Daniel Yepes Molina
          </motion.h1>

          <motion.p
            className="mx-auto mb-8 max-w-2xl text-lg text-zinc-400 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Software Engineering Student | Building Intelligent Applications
            with Machine Learning & Deep Learning
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a
              href="#projects"
              className="rounded-full bg-slate-700 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-600 hover:shadow-lg hover:shadow-slate-500/20"
            >
              View My Work
            </a>

            <Link
              href="#contact"
              className="rounded-full border border-zinc-700 bg-transparent px-8 py-3 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-900"
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            className="h-6 w-6 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
