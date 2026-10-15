'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Layers, Compass, BrainCircuit, Activity, Heart, Shield, Award } from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
}

export default function Hero({ setCurrentTab }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // High-performance canvas neural animation that adapts to theme and screen size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 550);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];

    // Initialize nodes
    const particleCount = Math.min(Math.floor(width / 18), 50);
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Determine colors based on active class (theme)
      const isDark = document.documentElement.classList.contains('dark');
      const lineColor = isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.12)';
      const nodeColor = isDark ? 'rgba(129, 140, 248, 0.6)' : 'rgba(79, 70, 229, 0.6)';

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = (1 - dist / 100) * 1.2;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Move nodes
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 550;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const coreExpertise = [
    { icon: BrainCircuit, title: 'Artificial Intelligence', desc: 'Neural networks tailored to specific workflow domains.' },
    { icon: Layers, title: 'Machine Learning', desc: 'Predictive modeling utilizing deep, supervised architectures.' },
    { icon: Compass, title: 'Agentic AI', desc: 'Autonomous execution loops designed to accomplish complex workflows.' },
    { icon: Activity, title: 'Data Engineering', desc: 'Distributed pipelines capable of parsing massive web intelligence.' },
    { icon: Globe, title: 'Software Engineering', desc: 'Production-ready cloud applications engineered to scale.' },
    { icon: Shield, title: 'Responsible Research', desc: 'Robust safety frameworks ensuring ethically aligned intelligence.' },
  ];

  return (
    <div id="home-view" className="relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] overflow-hidden bg-radial-[circle_at_top,_var(--tw-gradient-stops)] from-indigo-500/10 via-transparent to-transparent dark:from-indigo-500/5" />

      {/* Hero Core Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24" id="hero-core">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Hero Left Content */}
          <div className="space-y-6 lg:col-span-7">
            {/* Startup Status Accent */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-900/50 backdrop-blur-sm shadow-xs" id="hero-badge">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Building Intelligence for Africa
              </span>
            </div>

            <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-[85px] xl:text-[105px] leading-[0.9] font-black tracking-tighter uppercase text-zinc-900 dark:text-[#F5F5F5]" id="hero-title">
              AI THAT <span className="text-indigo-500 dark:text-indigo-400">SOLVES</span> <br />
              REAL PROBLEMS.
            </h1>

            <p className="max-w-xl text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed" id="hero-desc">
              ADVMLabs develops intelligent, production-ready software for career intelligence, climate resilience, and scalable automation across the global South.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4 pt-2" id="hero-cta-buttons">
              <button
                onClick={() => setCurrentTab('products')}
                className="inline-flex h-12 items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white px-8 text-xs font-bold uppercase tracking-wider transition-all rounded-sm cursor-pointer shadow-md"
                id="hero-products-btn"
              >
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentTab('projects')}
                className="inline-flex h-12 items-center justify-center border border-zinc-300 dark:border-zinc-800 bg-transparent hover:bg-zinc-200/50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white px-8 text-xs font-bold uppercase tracking-wider transition-all rounded-sm cursor-pointer"
                id="hero-projects-btn"
              >
                Our Mission
              </button>
            </div>
          </div>

          {/* Hero Right Visual Canvas */}
          <div className="relative flex items-center justify-center lg:col-span-5" id="hero-canvas-container">
            <div className="relative h-[450px] w-full max-w-[420px] rounded-sm border border-zinc-200/60 bg-white/50 p-4 shadow-2xl backdrop-blur-md dark:border-zinc-800/40 dark:bg-zinc-900/10">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full rounded-sm opacity-80"
              />
              <div className="relative flex h-full flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-indigo-500 uppercase">
                    ADVM_CORE_v1.2
                  </span>
                  <span className="rounded-sm bg-indigo-500/10 px-2 py-0.5 font-mono text-[9px] font-bold text-indigo-500">
                    ONLINE
                  </span>
                </div>

                <div className="space-y-4 rounded-sm border border-zinc-200 bg-white/90 p-5 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-[#050505]/95">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-300">
                      Active Telemetry Stream
                    </span>
                  </div>
                  <div className="space-y-2 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                    <p className="flex justify-between">
                      <span>&gt; Ingesting climate data...</span>
                      <span className="text-indigo-500 font-bold">98.4%</span>
                    </p>
                    <p className="flex justify-between">
                      <span>&gt; Resolving labor metrics...</span>
                      <span className="text-emerald-500 font-bold">Success</span>
                    </p>
                    <p className="flex justify-between">
                      <span>&gt; Processing neural weights...</span>
                      <span className="text-violet-500 font-bold">2.1s</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Incorporated beautifully inside Home as specified */}
      <section className="border-t border-zinc-200 bg-zinc-50/20 py-20 dark:border-zinc-900 dark:bg-[#050505]/40" id="about-advmlabs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              The Enterprise Framework
            </h2>
            <p className="font-sans text-3xl font-black tracking-tighter uppercase text-zinc-900 sm:text-4xl dark:text-[#F5F5F5]">
              Intelligence Built for Real-World Impact
            </p>
            <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
              ADVMLabs builds custom, highly performant artificial intelligence systems for governments, businesses, academic researchers, and development organizations. We specialize in turning complex geospatial, labor, and workflow datasets into decisive structural advantages.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="core-expertise-grid">
            {coreExpertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative rounded-sm border border-zinc-200 bg-white/60 p-8 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/10 dark:hover:border-indigo-500/50"
                  id={`expertise-card-${index}`}
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-[#F5F5F5]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Core Values Section */}
          <div className="mt-24 border-t border-zinc-200 pt-16 dark:border-zinc-900" id="core-values">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Foundational Principles
              </span>
              <h3 className="mt-1 text-2xl font-black tracking-tighter uppercase text-zinc-900 dark:text-[#F5F5F5]">
                Our Core Values
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-5" id="values-grid">
              {[
                { title: 'Innovation', desc: 'Pushing the theoretical limits of machine intelligence.', icon: BrainCircuit },
                { title: 'Trust', desc: 'Delivering secure, verifiable, and transparent systems.', icon: Award },
                { title: 'Accessibility', desc: 'Optimizing models to run cost-effectively anywhere.', icon: Globe },
                { title: 'Research', desc: 'Publishing data-driven solutions for the public good.', icon: Compass },
                { title: 'Real-world Impact', desc: 'Measuring success by careers and ecosystems improved.', icon: Layers }
              ].map((val, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-3" id={`value-card-${idx}`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                    <val.icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-[#F5F5F5]">{val.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
