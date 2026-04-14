"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      className="border-t border-zinc-800 bg-zinc-950 px-6 py-24"
      ref={ref}
    >
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mb-4 font-mono text-sm tracking-widest text-violet-400">
          GET IN TOUCH
        </h2>
        <h3 className="mb-6 text-3xl font-bold text-zinc-100 md:text-5xl">
          Let's Work Together
        </h3>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-zinc-400">
          I'm always open to new opportunities, collaborations, or just a
          friendly chat about software engineering and machine learning. Feel
          free to reach out!
        </p>

        <motion.div
          className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a
            href="mailto:danielcoc356@gmail.com"
            className="rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/30"
          >
            Say Hello
          </a>
          <Link
            href="/projects"
            className="rounded-full border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-900"
          >
            Browse Projects
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a
            href="https://github.com/makabed"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-800 p-3 text-zinc-400 transition-all duration-300 hover:border-zinc-600 hover:text-zinc-100 hover:shadow-lg"
            aria-label="GitHub"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/daniel-yepesm/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-800 p-3 text-zinc-400 transition-all duration-300 hover:border-zinc-600 hover:text-zinc-100 hover:shadow-lg"
            aria-label="LinkedIn"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          {/*
          <a
            href="https://x.com/Daniel01019996"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-800 p-3 text-zinc-400 transition-all duration-300 hover:border-zinc-600 hover:text-zinc-100 hover:shadow-lg"
            aria-label="Twitter"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          */}
        </motion.div>
      </motion.div>

      <motion.div
        className="mx-auto mt-24 max-w-4xl border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <p>
          Built with Next.js, Tailwind CSS, and Framer Motion. Designed &
          developed by Daniel.
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </motion.div>
    </section>
  );
}
