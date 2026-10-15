'use client';

import React, { useState } from 'react';
import { FOUNDER_DATA, FUTURE_ROADMAP } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Github, Mail, Target, Eye, ShieldCheck, HeartHandshake, Compass, Plus, Minus, ArrowUpRight } from 'lucide-react';

export default function About() {
  const [expandedRoadmap, setExpandedRoadmap] = useState<number | null>(null);

  const missionValues = [
    { title: 'The Mission', desc: 'To design AI-powered software that improves careers, businesses, climate resilience, education, and decision-making.', icon: Target, accent: 'text-blue-500' },
    { title: 'The Vision', desc: 'To position ADVMLabs as Africa’s preeminent laboratory for industrial-scale artificial intelligence solutions.', icon: Eye, accent: 'text-violet-500' },
    { title: 'Responsible AI', desc: 'Ensuring models respect cultural context, regional data sovereignty, and ethical decision boundaries.', icon: ShieldCheck, accent: 'text-emerald-500' }
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="about-view">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          The Laboratory & Leadership
        </span>
        <h2 className="font-sans text-3xl font-black tracking-tighter uppercase text-zinc-900 sm:text-4xl dark:text-[#F5F5F5]">
          Who We Are & What We Stand For
        </h2>
        <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          ADVMLabs was founded with a singular, stubborn focus: to construct real, useful, high-impact machine learning systems that operate seamlessly under real-world infrastructure constraints.
        </p>
      </div>

      {/* Mission / Vision Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-20" id="mission-vision-grid">
        {missionValues.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-sm border border-zinc-200 bg-white/70 p-6 shadow-xs hover:shadow-lg transition-all dark:border-zinc-850 dark:bg-zinc-900/10"
              id={`mission-card-${idx}`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`rounded-sm p-2 bg-zinc-50 dark:bg-zinc-950 ${item.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-lg font-black tracking-tight uppercase text-zinc-900 dark:text-[#F5F5F5]">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Founder Spotlight and Bio */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-20 items-center" id="founder-spotlight">
        {/* Founder Bio (Left Column) */}
        <div className="lg:col-span-7 space-y-6" id="founder-bio">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Founder Profile
          </span>
          <h3 className="font-sans text-3xl font-black tracking-tighter uppercase text-zinc-900 dark:text-[#F5F5F5]">
            Mujahid Adam
          </h3>
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {FOUNDER_DATA.title}
          </p>
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
            {FOUNDER_DATA.bio}
          </p>
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
            Prior to launching ADVMLabs, Mujahid spent years analyzing geospatial datasets, configuring machine learning engines, and engineering cloud-scale software. Passionate about empowering regional engineering ecosystems, Mujahid represents the core commitment of ADVMLabs: constructing tangible tools that bypass tech larping and solve tangible problems.
          </p>

          {/* Social Icons for Founder */}
          <div className="flex items-center space-x-4 pt-2" id="founder-socials">
            <a
              href={FOUNDER_DATA.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-zinc-200 bg-white text-zinc-600 shadow-xs transition-all hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-[#F5F5F5] cursor-pointer"
              title="LinkedIn Profile"
              id="founder-linkedin-link"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={FOUNDER_DATA.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-zinc-200 bg-white text-zinc-600 shadow-xs transition-all hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-[#F5F5F5] cursor-pointer"
              title="GitHub Profile"
              id="founder-github-link"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${FOUNDER_DATA.links.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-zinc-200 bg-white text-zinc-600 shadow-xs transition-all hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-[#F5F5F5] cursor-pointer"
              title="Send Direct Email"
              id="founder-email-link"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Founder Visual Card (Right Column) */}
        <div className="lg:col-span-5 flex justify-center" id="founder-card-visual">
          <div className="relative h-80 w-full max-w-[340px] rounded-sm border border-zinc-200 bg-white/70 p-6 shadow-lg dark:border-zinc-850 dark:bg-zinc-900/10 flex flex-col justify-between overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-radial-[circle_at_top,_var(--tw-gradient-stops)] from-indigo-500/10 via-transparent to-transparent" />
            
            <div className="flex justify-between items-start">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-450">FOUNDER_SPOTLIGHT</span>
              <span className="rounded-sm bg-emerald-500/10 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest text-emerald-500">ENGINEER_LEAD</span>
            </div>

            <div className="space-y-4">
              <div className="h-14 w-14 rounded-sm bg-indigo-600 flex items-center justify-center text-white font-sans text-xl font-black tracking-tighter shadow-md">
                MA
              </div>
              <div>
                <h4 className="font-sans text-lg font-black tracking-tight uppercase text-zinc-900 dark:text-[#F5F5F5]">Mujahid Adam</h4>
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-450">ADVM_FOUNDER // RES_CORE</p>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-500 italic">
                &ldquo;Practical, localized artificial intelligence is not just a technological luxury—it is an economic and safety imperative.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Future Expansion Architecture (Satisfies "Future Architecture" criteria) */}
      <div className="border-t border-zinc-200 pt-16 dark:border-zinc-850" id="future-architecture">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Upcoming Expansion
          </span>
          <h3 className="text-2xl font-black tracking-tighter uppercase text-zinc-900 dark:text-[#F5F5F5]">
            Planned Architectural Infrastructure
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            ADVMLabs is built for long-term scalability. Expand the cards below to review the technical details of our upcoming development sprints.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto" id="roadmap-accordion">
          {FUTURE_ROADMAP.map((roadmap, idx) => {
            const isExpanded = expandedRoadmap === idx;
            return (
              <div
                key={idx}
                className="rounded-sm border border-zinc-200 bg-white/70 transition-all dark:border-zinc-850 dark:bg-zinc-900/10"
                id={`roadmap-item-${idx}`}
              >
                <button
                  onClick={() => setExpandedRoadmap(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  id={`roadmap-trigger-${idx}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="rounded-sm bg-zinc-100 px-2.5 py-1 font-mono text-[9px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                      SYSTEM_0{idx + 1}
                    </span>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-[#F5F5F5]">
                      {roadmap.title}
                    </h4>
                  </div>
                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="rounded-sm bg-indigo-50/60 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                      {roadmap.status}
                    </span>
                    {isExpanded ? <Minus className="h-4 w-4 text-zinc-450" /> : <Plus className="h-4 w-4 text-zinc-450" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                      id={`roadmap-content-${idx}`}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-zinc-150 dark:border-zinc-850">
                        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                          {roadmap.description}
                        </p>
                        <div className="mt-3 flex items-center space-x-1 font-mono text-[9px] text-zinc-400">
                          <Compass className="h-3.5 w-3.5" />
                          <span>Planned deployment pathway: local server authentication nodes coupled with edge telemetry clusters.</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
