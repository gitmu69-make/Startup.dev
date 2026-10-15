'use client';

import React, { useState } from 'react';
import { RESEARCH_PAPERS, ResearchPaper } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, User, Tag, Sparkles, Network, ArrowRight, Brain, AlertTriangle } from 'lucide-react';

export default function Research() {
  const [activePaper, setActivePaper] = useState<string | null>(null);

  const researchFields = [
    { name: 'Agentic AI', desc: 'Low-latency autonomous decision pipelines optimized for edge deployment.' },
    { name: 'Climate AI', desc: 'Multivariate hydrological modeling and spatial neural networks.' },
    { name: 'Career Intelligence', desc: 'Dynamic labor taxonomy normalization and graph-based skill routing.' },
    { name: 'Decision Intelligence', desc: 'Predictive frameworks supporting civil and commercial operations.' },
    { name: 'Multi-Agent Systems', desc: 'Secure local consensus and bundle-routing protocols.' },
    { name: 'AI Ethics & Alignment', desc: 'Socio-technically aligned safety audits for regional populations.' }
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="research-view">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Theoretical Core & Publications
        </span>
        <h2 className="font-sans text-3xl font-black tracking-tighter uppercase text-zinc-900 sm:text-4xl dark:text-[#F5F5F5]">
          Pioneering AI Research for Emerging Markets
        </h2>
        <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          At ADVMLabs, we do not simply wrap external APIs. We research and write foundational ML architectures that adapt to real-world infrastructure constraints, focusing heavily on regional resilience.
        </p>
      </div>

      {/* Focus Domains Bento Grid */}
      <div className="mb-20">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6 text-center">
          Core Research Domains
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="research-fields-grid">
          {researchFields.map((field, idx) => (
            <div
              key={idx}
              className="rounded-sm border border-zinc-200 bg-white/70 p-6 shadow-xs hover:border-indigo-500/50 transition-all dark:border-zinc-800 dark:bg-zinc-900/10"
              id={`research-field-${idx}`}
            >
              <div className="flex items-center space-x-2.5">
                <Brain className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                <h4 className="font-sans text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-[#F5F5F5]">
                  {field.name}
                </h4>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                {field.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Interactive Theoretical Framework Graph vs Publications */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12" id="research-main-container">
        
        {/* Left: Interactive Multi-Agent Network Diagram */}
        <div className="lg:col-span-5" id="research-diagram-column">
          <div className="rounded-sm border border-zinc-200 bg-white/70 p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/10 backdrop-blur-md">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2 flex items-center space-x-2">
              <Network className="h-4 w-4 text-indigo-500" />
              <span>Multi-Agent Inundation Mesh</span>
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed mb-6 font-light">
              An interactive representation of our distributed compute-routing architecture. Review local distillation loops.
            </p>

            {/* Interactive Steps */}
            <div className="space-y-4" id="mesh-diagram-steps">
              {[
                { step: '01', title: 'Geospatial SAR Ingest', desc: 'Sentinel-1 radar telemetry captures spatial inundation coordinates over high-risk basins.' },
                { step: '02', title: 'Local Weight Distillation', desc: 'Edge servers compile telemetry data and process it utilizing sub-8B parameter local LSTM networks.' },
                { step: '03', title: 'Event SMS Broadcasting', desc: 'Decentralized alert nodes broadcast localized warnings over cellular towers without requiring internet connectivity.' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 rounded-sm border border-zinc-200 bg-white p-4 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#050505]/40"
                  id={`mesh-step-${idx}`}
                >
                  <span className="font-mono text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 rounded-sm p-2 h-8 w-8 flex items-center justify-center shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-tight text-zinc-950 dark:text-[#F5F5F5]">{item.title}</h5>
                    <p className="mt-1 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center space-x-2 rounded-sm bg-indigo-50/50 p-3.5 border border-indigo-100/30 dark:bg-indigo-950/20 dark:border-indigo-900/30">
              <Sparkles className="h-4 w-4 text-indigo-500 shrink-0" />
              <p className="text-[10px] text-indigo-600 dark:text-indigo-300 leading-normal font-medium">
                ADVMLabs models operate under standard SLA even when backhaul bandwidth falls below 128kbps.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Academic Papers & Abstracts */}
        <div className="lg:col-span-7" id="publications-column">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6 flex items-center space-x-1.5">
            <BookOpen className="h-4.5 w-4.5 text-indigo-500" />
            <span>Published Papers & Manuscripts</span>
          </h4>

          <div className="space-y-6" id="publications-list">
            {RESEARCH_PAPERS.map((paper) => {
              const isOpen = activePaper === paper.id;
              return (
                <div
                  key={paper.id}
                  className="rounded-sm border border-zinc-200 bg-white/70 p-5 shadow-xs transition-all dark:border-zinc-800 dark:bg-zinc-900/10"
                  id={`paper-card-${paper.id}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-sm dark:bg-indigo-950/40 border border-indigo-500/10">
                        {paper.domain}
                      </span>
                      <h3 className="mt-2 text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-[#F5F5F5]">
                        {paper.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400 shrink-0">
                      {paper.date}
                    </span>
                  </div>

                  {/* Authors */}
                  <div className="mt-3 flex items-center space-x-4 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center space-x-1">
                      <User className="h-3 w-3 text-zinc-400" />
                      <span>{paper.authors.join(', ')}</span>
                    </span>
                    {paper.publishedIn && (
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-neutral-400" />
                        <span>{paper.publishedIn}</span>
                      </span>
                    )}
                  </div>

                  {/* Toggleable Abstract */}
                  <div className="mt-4">
                    <button
                      onClick={() => setActivePaper(isOpen ? null : paper.id)}
                      className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
                      id={`paper-toggle-btn-${paper.id}`}
                    >
                      {isOpen ? 'Collapse Abstract' : 'View Full Abstract'}
                      <ArrowRight className={`ml-1 h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                          id={`paper-abstract-container-${paper.id}`}
                        >
                          <p className="mt-4 rounded-sm bg-zinc-50 p-4 font-sans text-xs leading-relaxed text-zinc-500 dark:bg-[#050505]/40 dark:text-zinc-450 font-light">
                            {paper.abstract}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {paper.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center space-x-1 rounded-sm bg-zinc-100 px-2 py-0.5 font-mono text-[9px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-450"
                              >
                                <Tag className="h-2 w-2 text-zinc-400" />
                                <span>{tag}</span>
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
