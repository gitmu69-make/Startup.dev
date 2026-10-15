'use client';

import React, { useState } from 'react';
import { PROJECTS, Project } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Filter, Search, BookOpen, X, Code, BadgeCheck } from 'lucide-react';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  const categories = ['All', 'Intelligence', 'Data Engineering', 'Climate Tech', 'Automation'];

  // Filter and search logic
  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="projects-view">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Global Deployments
        </span>
        <h2 className="font-sans text-3xl font-black tracking-tighter uppercase text-zinc-900 sm:text-4xl dark:text-[#F5F5F5]">
          Our Operational Portfolio
        </h2>
        <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          From micro-credentials matching to regional flood telemetry systems, review the specific codebases, toolchains, and real-world results ADVMLabs deploys.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="project-filters">
        {/* Category Toggles */}
        <div className="flex flex-wrap gap-1.5" id="category-selector">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-sm px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border border-zinc-950 dark:border-white'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-500 hover:bg-zinc-100 dark:bg-zinc-900/40 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900/20'
              }`}
              id={`category-btn-${cat.toLowerCase().replace(' ', '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative max-w-sm w-full md:w-80" id="project-search-container">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search systems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-sm border border-zinc-200 bg-white py-2 pl-9 pr-4 text-[10px] font-bold uppercase tracking-widest shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-zinc-800 dark:bg-[#050505] dark:text-[#F5F5F5] dark:focus:border-indigo-400"
            id="project-search-input"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-8 md:grid-cols-2"
        id="projects-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              layout
              key={proj.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between rounded-sm border border-zinc-200 bg-white/70 p-6 shadow-xs hover:shadow-lg transition-all dark:border-zinc-850 dark:bg-zinc-900/10"
              id={`project-card-${proj.id}`}
            >
              {/* Header and Status */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-indigo-500">
                    {proj.category}
                  </span>
                  <span className={`rounded-sm px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest border ${
                    proj.status === 'Deployed'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/15'
                      : proj.status === 'Active Development'
                      ? 'bg-blue-500/10 text-blue-500 border-blue-500/15'
                      : 'bg-amber-500/10 text-amber-500 border-amber-500/15'
                  }`}>
                    {proj.status}
                  </span>
                </div>

                <h3 className="mt-3 font-sans text-xl font-black tracking-tight uppercase text-zinc-900 dark:text-[#F5F5F5]">
                  {proj.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                  {proj.description}
                </p>

                {/* Tech Badges */}
                <div className="mt-5 flex flex-wrap gap-1.5" id={`project-${proj.id}-tech-badges`}>
                  {proj.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center space-x-1 rounded-sm bg-zinc-50 border border-zinc-200 px-2 py-0.5 font-mono text-[9px] text-zinc-500 dark:bg-zinc-950 dark:border-zinc-850 dark:text-zinc-400"
                    >
                      <Code className="h-2.5 w-2.5" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-zinc-150 pt-4 dark:border-zinc-850" id={`project-${proj.id}-actions`}>
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 items-center justify-center rounded-sm border border-zinc-200 bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-700 shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#050505] dark:text-zinc-300 dark:hover:bg-zinc-900"
                    title="View Source Code"
                  >
                    <Github className="mr-1.5 h-3.5 w-3.5" />
                    Codebase
                  </a>
                )}
                {proj.demoUrl && (
                  <button
                    onClick={() => {
                      alert('Interactive playground simulations and live application nodes are planned in the next development sprint!');
                    }}
                    className="inline-flex h-8 items-center justify-center rounded-sm border border-zinc-200 bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-700 shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#050505] dark:text-zinc-300 dark:hover:bg-zinc-900 cursor-pointer"
                  >
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Live Demo
                  </button>
                )}
                {proj.caseStudyTitle && (
                  <button
                    onClick={() => setActiveCaseStudy(proj)}
                    className="ml-auto inline-flex h-8 items-center justify-center rounded-sm bg-indigo-50 px-3.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 transition-all hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-950/70 cursor-pointer"
                    id={`view-case-study-btn-${proj.id}`}
                  >
                    <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                    Case Study
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Modal Overlay */}
      <AnimatePresence>
        {activeCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="case-study-modal-container">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCaseStudy(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl rounded-sm border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-[#050505]"
              id="case-study-modal"
            >
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="absolute right-4 top-4 rounded-sm p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                id="close-modal-btn"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-indigo-500">
                Project Case Study
              </span>
              <h3 className="mt-2 font-sans text-2xl font-black tracking-tighter uppercase text-zinc-900 dark:text-[#F5F5F5]">
                {activeCaseStudy.caseStudyTitle}
              </h3>
              <p className="mt-1 font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Product Context: {activeCaseStudy.title}
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-sm bg-zinc-50 p-4 border border-zinc-200 dark:bg-zinc-900/60 dark:border-zinc-850">
                  <h4 className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                    <BadgeCheck className="h-4 w-4 text-emerald-500" />
                    <span>Impact & Deployment Results</span>
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {activeCaseStudy.caseStudySummary}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    Tech Stack Stackup
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeCaseStudy.technologies.map((t) => (
                      <span key={t} className="rounded-sm bg-indigo-50/60 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end border-t border-zinc-200 pt-4 dark:border-zinc-850">
                <button
                  onClick={() => setActiveCaseStudy(null)}
                  className="rounded-sm bg-zinc-950 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-indigo-600 dark:bg-[#F5F5F5] dark:text-zinc-950 dark:hover:bg-indigo-50 cursor-pointer"
                  id="modal-ok-btn"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
