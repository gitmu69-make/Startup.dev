'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, Mail, MessageSquare, Globe, CheckCircle2, AlertCircle, Linkedin, Github } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database write / email dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 1200);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="contact-view">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Inquiries & Collaboration
        </span>
        <h2 className="font-sans text-3xl font-black tracking-tighter uppercase text-zinc-900 sm:text-4xl dark:text-[#F5F5F5]">
          Let’s Build Something Meaningful
        </h2>
        <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          Whether you represent an international development organization, a civil agency, a private corporation, or a venture fund, we are eager to hear your goals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12" id="contact-grid">
        {/* Contact Form Column (Left) */}
        <div className="lg:col-span-7" id="contact-form-column">
          <div className="rounded-sm border border-zinc-200 bg-white/70 p-6 sm:p-8 shadow-xl dark:border-zinc-850 dark:bg-zinc-900/10 backdrop-blur-sm">
            <h3 className="font-sans text-lg font-black tracking-tight uppercase text-zinc-900 dark:text-[#F5F5F5] mb-6">
              Send an Inquiry
            </h3>

            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-sm bg-emerald-500/10 p-6 text-center border border-emerald-500/20"
                  id="submit-success-box"
                >
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                  <h4 className="mt-4 font-sans text-base font-bold uppercase tracking-tight text-neutral-900 dark:text-[#F5F5F5]">
                    Message Dispatched Successfully
                  </h4>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                    Thank you for contacting ADVMLabs. Our founder Mujahid Adam will review your inquiry and follow up within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-6 inline-flex h-9 items-center justify-center rounded-sm bg-zinc-950 px-4 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-indigo-600 dark:bg-[#F5F5F5] dark:text-zinc-950 dark:hover:bg-indigo-50 cursor-pointer"
                    id="new-inquiry-btn"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  id="contact-form"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Mujahid Adam"
                        className="w-full rounded-sm border border-zinc-200 bg-white py-2 px-3 text-[10px] font-bold uppercase tracking-widest shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-zinc-800 dark:bg-[#050505] dark:text-[#F5F5F5]"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. partner@enterprise.com"
                        className="w-full rounded-sm border border-zinc-200 bg-white py-2 px-3 text-[10px] font-bold uppercase tracking-widest shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-zinc-800 dark:bg-[#050505] dark:text-[#F5F5F5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. ADVMLabs"
                      className="w-full rounded-sm border border-zinc-200 bg-white py-2 px-3 text-[10px] font-bold uppercase tracking-widest shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-zinc-800 dark:bg-[#050505] dark:text-[#F5F5F5]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Provide details about your project or inquiry..."
                      className="w-full rounded-sm border border-zinc-200 bg-white py-2 px-3 text-xs font-medium shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-zinc-800 dark:bg-[#050505] dark:text-[#F5F5F5]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-zinc-950 px-6 text-[10px] font-bold uppercase tracking-widest text-white shadow-xs transition-all hover:bg-indigo-600 disabled:opacity-50 dark:bg-[#F5F5F5] dark:text-zinc-950 dark:hover:bg-indigo-50 cursor-pointer"
                    id="submit-contact-btn"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Transmitting secure packet...</span>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Dispatch Secure Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Info Column (Right) */}
        <div className="lg:col-span-5 space-y-8" id="contact-info-column">
          {/* Direct channels */}
          <div className="rounded-sm border border-zinc-200 bg-white/70 p-6 shadow-xs dark:border-zinc-850 dark:bg-zinc-900/10 space-y-4 backdrop-blur-sm">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Direct Channels
            </h4>

            <div className="space-y-3 text-xs" id="contact-channels">
              <a href="mailto:adambansi051@gmail.com" className="flex items-center space-x-3 text-neutral-600 hover:text-indigo-600 dark:text-neutral-300 dark:hover:text-indigo-400 transition-colors">
                <div className="rounded-sm bg-zinc-50 p-2 dark:bg-zinc-950">
                  <Mail className="h-4 w-4 text-indigo-500" />
                </div>
                <div>
                  <p className="font-bold">Business Email</p>
                  <p className="text-neutral-400">adambansi051@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-300">
                <div className="rounded-sm bg-zinc-50 p-2 dark:bg-zinc-950">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                </div>
                <div>
                  <p className="font-bold">Regional Lab Hub</p>
                  <p className="text-neutral-400">Accra, Ghana & regional nodes</p>
                </div>
              </div>
            </div>
          </div>

          {/* High-Fidelity SVG Interactive Map Node */}
          <div className="rounded-sm border border-zinc-200 bg-white/70 p-6 shadow-xs dark:border-zinc-850 dark:bg-zinc-900/10 flex flex-col justify-between h-64 relative overflow-hidden backdrop-blur-sm" id="maps-placeholder-card">
            <div className="absolute inset-0 z-0 opacity-15 dark:opacity-20 flex items-center justify-center">
              {/* African continent geometric map background */}
              <svg viewBox="0 0 100 100" className="h-full w-full text-indigo-600 fill-current">
                <path d="M40 10 L45 15 L43 25 L50 30 L55 25 L65 32 L70 45 L65 55 L58 70 L50 85 L45 92 L42 85 L44 75 L38 65 L32 55 L28 45 L25 35 L30 25 L35 15 Z" />
              </svg>
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <span className="font-mono text-[9px] text-neutral-400">GEOSPATIAL_LAB_NODES</span>
              <span className="rounded-sm bg-indigo-500/15 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest text-indigo-500">WEST_AFRICA_HQ</span>
            </div>

            {/* Glowing Map Target Indicator */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-2">
              <div className="relative flex h-3 w-3 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
              </div>
              <p className="font-mono text-[10px] text-neutral-900 dark:text-neutral-100 font-bold">Node Accra_GHA_001</p>
              <p className="text-[9px] text-neutral-400 text-center max-w-[200px]">Active Sentinel and IoT gateway synchronization point.</p>
            </div>

            <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-neutral-400">
              <span>LAT: 5.6037° N</span>
              <span>LON: 0.1870° W</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
