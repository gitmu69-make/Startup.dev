'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import Blog from '@/components/Blog';
import About from '@/components/About';
import Contact from '@/components/Contact';
import AIHub from '@/components/AIHub';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Initialize theme from localStorage on mount to avoid hydration mismatch
  useEffect(() => {
    const savedTheme = localStorage.getItem('advmlabs-theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(savedTheme);
    }
  }, []);

  // Sync HTML class when theme state changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('advmlabs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Helper function to render active section
  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Hero setCurrentTab={setCurrentTab} />;
      case 'products':
        return <Products />;
      case 'projects':
        return <Projects />;
      case 'research':
        return <Research />;
      case 'blog':
        return <Blog />;
      case 'aihub':
        return <AIHub />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 transition-colors duration-300 dark:bg-[#050505] dark:text-[#F5F5F5] flex flex-col justify-between relative overflow-hidden selection:bg-indigo-500/30">
      {/* Ambient Background Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-indigo-600/10 dark:bg-indigo-600/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] bg-blue-600/10 dark:bg-blue-600/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <div>
          {/* Navigation Bar */}
          <Navbar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            theme={theme}
            toggleTheme={toggleTheme}
          />

          {/* Core Main View */}
          <main className="flex-1 animate-fade-in py-6">
            {renderContent()}
          </main>
        </div>

        {/* Footer Navigation */}
        <Footer setCurrentTab={setCurrentTab} />
      </div>
    </div>
  );
}
