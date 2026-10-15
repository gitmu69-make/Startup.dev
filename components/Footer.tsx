'use client';

import React from 'react';
import { Cpu, Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const handleFooterLinkClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 bg-[#FAFAFA] dark:border-zinc-850 dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-zinc-200 dark:border-zinc-850">
          
          {/* Brand Left Column */}
          <div className="md:col-span-4 space-y-4">
            <button
              onClick={() => handleFooterLinkClick('home')}
              className="flex items-center space-x-2 text-left cursor-pointer"
              id="footer-logo-btn"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-black text-white dark:bg-[#F5F5F5] dark:text-zinc-950">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-sm font-black uppercase tracking-tighter text-zinc-900 dark:text-[#F5F5F5]">
                  ADVMLabs
                </span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Intelligent Systems
                </span>
              </div>
            </button>
            <p className="text-xs leading-relaxed text-zinc-400 dark:text-zinc-500 max-w-xs font-light">
              Designing and deploying robust, event-driven artificial intelligence systems for Africa and beyond.
            </p>
          </div>

          {/* Links Center Column */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Sitemap */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500 mb-3">
                Sitemap
              </h4>
              <ul className="space-y-2 text-[10px]">
                {['Home', 'Products', 'Projects', 'Research', 'Blog', 'AI Hub', 'About', 'Contact'].map((tab) => {
                  const tabId = tab.toLowerCase().replace(' ', '');
                  return (
                    <li key={tab}>
                      <button
                        onClick={() => handleFooterLinkClick(tabId)}
                        className="font-bold uppercase tracking-widest text-zinc-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400 cursor-pointer"
                        id={`footer-link-${tabId}`}
                      >
                        {tab}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Resources / Compliance */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500 mb-3">
                Compliance
              </h4>
              <ul className="space-y-2 text-[10px] text-zinc-450 dark:text-zinc-500">
                <li>
                  <button
                    onClick={() => alert('Our comprehensive global privacy guidelines and data access boundaries are compliant with ISO/IEC 27001 standards.')}
                    className="font-bold uppercase tracking-widest text-zinc-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400 cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert('ADVMLabs operational terms outline standard SLA compliance matrices for enterprise partners.')}
                    className="font-bold uppercase tracking-widest text-zinc-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400 cursor-pointer text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert('Access our security disclosure guidelines to report vulnerabilities securely.')}
                    className="font-bold uppercase tracking-widest text-zinc-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400 cursor-pointer text-left"
                  >
                    Security & Trust
                  </button>
                </li>
              </ul>
            </div>

            {/* Direct Social Channels */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500 mb-3">
                Channels
              </h4>
              <ul className="space-y-2 text-[10px]">
                <li>
                  <a
                    href="https://linkedin.com/in/mujahid-adam"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 font-bold uppercase tracking-widest text-zinc-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400"
                  >
                    <Linkedin className="h-3 w-3" />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/mujahid-adam"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 font-bold uppercase tracking-widest text-zinc-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400"
                  >
                    <Github className="h-3 w-3" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:adambansi051@gmail.com"
                    className="flex items-center space-x-1 font-bold uppercase tracking-widest text-zinc-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400"
                  >
                    <Mail className="h-3 w-3" />
                    <span>Business Email</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright and Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          <p id="copyright-text">
            Copyright &copy; {new Date().getFullYear()} ADVMLabs. All rights reserved.
          </p>
          <p className="font-mono text-[9px] tracking-widest font-bold text-indigo-500">
            ADVM_STATION_ACTIVE // ACCRA_NODE_01
          </p>
        </div>
      </div>
    </footer>
  );
}
