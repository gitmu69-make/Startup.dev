'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, Product } from '@/lib/data';
import { CheckCircle2, TrendingUp, Sparkles, Map, Database, ArrowRight, UserCheck, ShieldAlert, Cpu, BarChart3, CloudRain } from 'lucide-react';

export default function Products() {
  const [activeProduct, setActiveProduct] = useState<string>(PRODUCTS[0].id);

  const activeProductData = PRODUCTS.find((p) => p.id === activeProduct) || PRODUCTS[0];

  // Helper icons to map beautiful designs
  const getProductIcon = (id: string) => {
    switch (id) {
      case 'career-intelligence':
        return <UserCheck className="h-5 w-5 text-blue-500" />;
      case 'job-market-pipeline':
        return <Database className="h-5 w-5 text-emerald-500" />;
      case 'flood-intelligence':
        return <CloudRain className="h-5 w-5 text-amber-500" />;
      default:
        return <Cpu className="h-5 w-5 text-violet-500" />;
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="products-view">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Advanced Core Products
        </span>
        <h2 className="font-sans text-3xl font-black tracking-tighter uppercase text-zinc-900 sm:text-4xl dark:text-[#F5F5F5]">
          AI Software Engineered to Perform
        </h2>
        <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          Explore our intelligent systems designed for maximum societal and financial impact. We bridge computational theory with deployment-ready solutions.
        </p>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12" id="products-container">
        {/* Left Side: Product Selector Cards */}
        <div className="space-y-4 lg:col-span-4" id="product-tabs">
          {PRODUCTS.map((prod) => {
            const isActive = prod.id === activeProduct;
            return (
              <button
                key={prod.id}
                onClick={() => setActiveProduct(prod.id)}
                className={`w-full text-left rounded-sm border p-5 transition-all cursor-pointer ${
                  isActive
                    ? 'border-zinc-950 bg-white/80 shadow-md dark:border-indigo-500 dark:bg-zinc-900/40'
                    : 'border-zinc-200/60 bg-zinc-50/20 hover:bg-zinc-100 dark:border-zinc-800/40 dark:bg-[#050505]/20 dark:hover:bg-zinc-900/20'
                }`}
                id={`product-tab-btn-${prod.id}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`rounded-sm p-2 ${isActive ? 'bg-zinc-100 dark:bg-zinc-800/80' : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800'}`}>
                    {getProductIcon(prod.id)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
                      {prod.title}
                    </h3>
                    <span className={`inline-block mt-1.5 rounded-sm px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${
                      prod.status === 'Production Ready'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10'
                        : prod.status === 'Active Development'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10'
                        : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10'
                    }`}>
                      {prod.status}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Detailed Dashboard Viewer */}
        <div className="lg:col-span-8" id="product-viewer">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="rounded-sm border border-zinc-200 bg-white/70 p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/10 backdrop-blur-md"
              id={`product-detail-panel-${activeProduct}`}
            >
              <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    Product Highlight
                  </span>
                  <h3 className="font-sans text-2xl font-black tracking-tighter uppercase text-zinc-900 dark:text-[#F5F5F5]">
                    {activeProductData.title}
                  </h3>
                </div>
                <div className="inline-flex items-center space-x-2 rounded-sm border border-zinc-200 bg-zinc-50/50 px-3 py-1 dark:border-zinc-800 dark:bg-[#050505]/40">
                  <span className={`h-2.5 w-2.5 rounded-full ${
                    activeProductData.status === 'Production Ready' ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-500'
                  }`} />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                    {activeProductData.status}
                  </span>
                </div>
              </div>

              {/* Tagline & Description */}
              <div className="my-6 space-y-3">
                <p className="text-base font-bold uppercase tracking-tight text-indigo-600 dark:text-indigo-400">
                  &ldquo;{activeProductData.tagline}&rdquo;
                </p>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-light">
                  {activeProductData.description}
                </p>
              </div>

              {/* Product Performance Mockups & High Fidelity Visualizations */}
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {activeProductData.metrics?.map((metric, idx) => (
                  <div key={idx} className="rounded-sm border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-[#050505]/30">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{metric.label}</span>
                    <p className="mt-1 font-mono text-2xl font-black tracking-tight text-zinc-900 dark:text-[#F5F5F5]">{metric.value}</p>
                  </div>
                ))}
              </div>

              {/* Interconnected Feature List */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500 mb-4">
                  Core Technologies & Features
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" id="features-list">
                  {activeProductData.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" />
                      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom High-Fidelity App Module Preview */}
              <div className="mt-10 rounded-sm border border-dashed border-zinc-300 bg-zinc-50/10 p-6 dark:border-zinc-800 dark:bg-[#050505]/10">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4 flex items-center space-x-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Module Simulator Preview</span>
                </h4>

                {activeProduct === 'career-intelligence' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white p-3 rounded-sm border border-zinc-200 shadow-xs dark:bg-[#050505] dark:border-zinc-800">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-sm bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center font-mono text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase">CV</div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">resume_mujahid_adam.pdf</p>
                          <p className="text-[9px] text-zinc-400">Processed 100% • 3,212 Tokens</p>
                        </div>
                      </div>
                      <span className="rounded-sm bg-emerald-500/10 px-2 py-1 font-mono text-[9px] font-bold text-emerald-500 uppercase border border-emerald-500/15">Employability: 87/100</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-200">Recommended Action Plan:</p>
                      <div className="space-y-1.5 pl-2 border-l-2 border-indigo-500">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400"><strong>Day 1-2</strong>: Optimize index queries in PostgreSQL to match modern Senior Backend vacancies.</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400"><strong>Day 3-5</strong>: Deploy localized multi-agent orchestrator with sub-8B parameters.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeProduct === 'job-market-pipeline' && (
                  <div className="space-y-4 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-sm border border-zinc-200 shadow-xs dark:bg-[#050505] dark:border-zinc-800">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">TOP CONCURRENT SKILL</span>
                        <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-1 uppercase">Docker & K8s</p>
                        <span className="text-[9px] font-bold text-emerald-500">+14% Growth MoM</span>
                      </div>
                      <div className="bg-white p-3 rounded-sm border border-zinc-200 shadow-xs dark:bg-[#050505] dark:border-zinc-800">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">MEDIAN SALARY ANCHOR</span>
                        <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-1">$45,000 / Yr</p>
                        <span className="text-[9px] text-zinc-450">Based on regional indexes</span>
                      </div>
                    </div>
                    <div className="text-[10px] border border-zinc-200 rounded-sm p-2.5 bg-zinc-50/50 dark:bg-[#050505] dark:border-zinc-800 font-mono text-zinc-400 dark:text-zinc-500">
                      &gt; streaming job telemetry logs: [COMPLETED] matched skill id &quot;react-native&quot; inside vacancy &quot;Fintech Mobile Dev - Lagos&quot;
                    </div>
                  </div>
                )}

                {activeProduct === 'flood-intelligence' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-2 dark:border-zinc-800">
                      <div className="flex items-center space-x-2">
                        <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-850 dark:text-zinc-200">Precipitation Inundation Predictor</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Tributary Node: ID_G_09</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                      <div className="bg-amber-500/5 p-2.5 border border-amber-500/10 rounded-sm">
                        <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">River Level</span>
                        <span className="font-bold font-mono text-amber-600 dark:text-amber-400">4.82 Meters</span>
                      </div>
                      <div className="bg-zinc-100/30 p-2.5 border border-zinc-200/60 dark:bg-zinc-900/30 dark:border-zinc-800 rounded-sm">
                        <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Precipitation</span>
                        <span className="font-bold font-mono text-zinc-800 dark:text-[#F5F5F5]">82mm / 24h</span>
                      </div>
                      <div className="bg-red-500/5 p-2.5 border border-red-500/10 rounded-sm">
                        <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Flood Risk</span>
                        <span className="font-bold font-mono text-red-500">CRITICAL</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-relaxed font-light italic">
                      Automated community warning system is ready to broadcast regional cell-tower alerts in English and Hausa if level crosses 5.0m threshold.
                    </p>
                  </div>
                )}

                {activeProduct === 'business-ai' && (
                  <div className="space-y-3 font-sans text-xs">
                    <p className="text-zinc-500 dark:text-zinc-400 uppercase tracking-tight text-[9px] font-bold">Select business agent workflow template to mock:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-sm bg-indigo-50 text-indigo-700 px-2.5 py-1.5 dark:bg-indigo-950/30 dark:text-indigo-400 font-mono text-[9px] font-bold uppercase tracking-wider border border-indigo-500/10 cursor-pointer hover:opacity-80">Invoice Classifier</span>
                      <span className="rounded-sm bg-zinc-100 text-zinc-700 px-2.5 py-1.5 dark:bg-zinc-900/40 dark:text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:opacity-80">Customer Support Router</span>
                      <span className="rounded-sm bg-zinc-100 text-zinc-700 px-2.5 py-1.5 dark:bg-zinc-900/40 dark:text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:opacity-80">Legal Document Parser</span>
                    </div>
                    <div className="mt-3 bg-zinc-900 text-zinc-100 dark:bg-[#050505] border border-zinc-800 rounded-sm p-3 font-mono text-[10px] space-y-1">
                      <p className="text-zinc-500 font-bold">&gt; Initializing Custom Vector Search (Pinecone)...</p>
                      <p className="text-indigo-400">&gt; Query: &quot;Identify unpaid service invoices from Q1&quot;</p>
                      <p className="text-emerald-400">&gt; Identified 12 records • Generated automated Slack warning alerts.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
