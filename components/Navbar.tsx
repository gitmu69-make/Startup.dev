'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Cpu } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, theme, toggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'blog', label: 'Blog' },
    { id: 'aihub', label: 'AI Hub' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-[#FAFAFA]/75 backdrop-blur-md transition-colors dark:border-zinc-900/60 dark:bg-[#050505]/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2 text-left group"
          id="nav-logo-btn"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-blue-400 rounded-sm flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
            <div className="w-3 h-3 bg-[#FAFAFA] dark:bg-[#050505] rounded-full"></div>
          </div>
          <div className="flex flex-col pl-1">
            <span className="text-xl font-black tracking-tighter uppercase text-zinc-900 dark:text-[#F5F5F5]">
              ADVMLabs
            </span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 leading-none">
              Intelligent Systems
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative rounded-sm px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                currentTab === item.id
                  ? 'text-zinc-950 dark:text-[#F5F5F5]'
                  : 'text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-[#F5F5F5]'
              }`}
              id={`nav-item-${item.id}`}
            >
              <span className="relative z-10">{item.label}</span>
              {currentTab === item.id && (
                <motion.span
                  layoutId="activeNavBackground"
                  className="absolute inset-0 rounded-sm bg-zinc-200/40 dark:bg-zinc-900/40 border border-zinc-300/40 dark:border-zinc-800/40"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-zinc-200 bg-white text-zinc-700 shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-neutral-800"
            id="theme-toggle-btn"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Sun className="h-4 w-4 text-amber-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Moon className="h-4 w-4 text-indigo-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Contact CTA Button (Desktop) */}
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-sm bg-zinc-950 px-5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-indigo-600 dark:bg-white dark:text-black dark:hover:bg-indigo-50"
            id="nav-contact-cta"
          >
            Inquire Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-zinc-200 bg-white text-zinc-700 shadow-xs transition-all hover:bg-zinc-50 md:hidden dark:border-zinc-800 dark:bg-[#050505] dark:text-zinc-300 dark:hover:bg-zinc-900"
            id="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-zinc-200 bg-[#FAFAFA] md:hidden dark:border-zinc-900 dark:bg-[#050505]"
            id="mobile-drawer"
          >
            <div className="space-y-1 px-4 py-3 pb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full rounded-sm px-3 py-2.5 text-left text-xs font-bold uppercase tracking-widest transition-colors ${
                    currentTab === item.id
                      ? 'bg-zinc-200/50 text-zinc-950 dark:bg-zinc-900/50 dark:text-[#F5F5F5]'
                      : 'text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-[#F5F5F5]'
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="flex w-full items-center justify-center rounded-sm bg-zinc-950 py-2.5 text-center text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-indigo-600 dark:bg-white dark:text-black dark:hover:bg-indigo-50"
                  id="mobile-nav-contact-cta"
                >
                  Inquire Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
