'use client';

import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-react';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Artificial Intelligence', 'Climate Technology', 'Career Development'];

  // Filter and search blog posts
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="blog-view">
      <AnimatePresence mode="wait">
        {!readingPost ? (
          /* LIST VIEW */
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            id="blog-list-view"
          >
            {/* Title & Introduction */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Insights & Updates
              </span>
              <h2 className="font-sans text-3xl font-black tracking-tighter uppercase text-zinc-900 sm:text-4xl dark:text-[#F5F5F5]">
                The ADVMLabs Engineering Blog
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                Technical articles, project debriefs, and strategic perspectives written by our engineering team. We share our processes openly.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="blog-filters">
              {/* Category selector */}
              <div className="flex flex-wrap gap-1.5" id="blog-category-selector">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-sm px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border border-zinc-950 dark:border-white'
                        : 'bg-zinc-50 border border-zinc-200 text-zinc-500 hover:bg-zinc-100 dark:bg-zinc-900/40 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900/20'
                    }`}
                    id={`blog-cat-btn-${cat.toLowerCase().replace(' ', '-')}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative max-w-sm w-full md:w-80" id="blog-search-container">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-sm border border-zinc-200 bg-white py-2 pl-9 pr-4 text-[10px] font-bold uppercase tracking-widest shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-zinc-800 dark:bg-[#050505] dark:text-[#F5F5F5] dark:focus:border-indigo-400"
                  id="blog-search-input"
                />
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" id="blog-grid">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col justify-between rounded-sm border border-zinc-200 bg-white/70 p-6 shadow-xs hover:shadow-lg transition-all dark:border-zinc-850 dark:bg-zinc-900/10"
                  id={`blog-card-${post.id}`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[9px] font-mono font-bold text-zinc-400 dark:text-zinc-500">
                      <span className="text-indigo-500 uppercase tracking-widest">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mt-4 font-sans text-lg font-black tracking-tight uppercase text-zinc-900 dark:text-[#F5F5F5] hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer" onClick={() => setReadingPost(post)}>
                      {post.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                      {post.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-850">
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="h-6 w-6 rounded-sm bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-400 text-[10px]">
                        MA
                      </div>
                      <div>
                        <p className="font-bold uppercase tracking-wider text-zinc-900 dark:text-[#F5F5F5] text-[10px]">{post.author.name}</p>
                        <p className="text-[9px] font-mono text-zinc-400">{post.publishedAt}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setReadingPost(post)}
                      className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
                      id={`read-article-btn-${post.id}`}
                    >
                      Read Article
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        ) : (
          /* READ VIEW */
          <motion.div
            key="read"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="max-w-3xl mx-auto rounded-sm border border-zinc-200 bg-white/80 p-6 sm:p-10 shadow-xl dark:border-zinc-850 dark:bg-[#050505]/40 backdrop-blur-md"
            id="blog-reading-view"
          >
            {/* Navigation back */}
            <button
              onClick={() => setReadingPost(null)}
              className="inline-flex h-9 items-center justify-center rounded-sm border border-zinc-200 bg-white px-3.5 text-[10px] font-bold uppercase tracking-widest text-zinc-700 shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 mb-8 cursor-pointer"
              id="back-to-blog-btn"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </button>

            {/* Article Metadata */}
            <div className="space-y-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-sm dark:bg-indigo-950/40 border border-indigo-500/10">
                {readingPost.category}
              </span>
              <h1 className="font-sans text-3xl font-black tracking-tighter uppercase text-zinc-900 sm:text-4xl dark:text-[#F5F5F5]">
                {readingPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400 pt-2">
                <span className="flex items-center space-x-1.5">
                  <User className="h-4 w-4 text-neutral-400" />
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{readingPost.author.name} ({readingPost.author.role})</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="h-4 w-4 text-neutral-400" />
                  <span>{readingPost.publishedAt}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="h-4 w-4 text-neutral-400" />
                  <span>{readingPost.readTime}</span>
                </span>
              </div>
            </div>

            {/* Article Content - Styled with Tailwind Typography */}
            <div className="mt-8 prose prose-neutral max-w-none dark:prose-invert prose-xs leading-relaxed text-zinc-650 dark:text-zinc-300" id="article-content">
              {readingPost.content.split('\n\n').map((para, index) => {
                if (para.startsWith('###')) {
                  return <h3 key={index} className="text-xl font-black tracking-tight uppercase text-zinc-900 dark:text-[#F5F5F5] mt-6 mb-3">{para.replace('###', '').trim()}</h3>;
                }
                if (para.startsWith('####')) {
                  return <h4 key={index} className="text-base font-black tracking-tight uppercase text-zinc-900 dark:text-[#F5F5F5] mt-4 mb-2">{para.replace('####', '').trim()}</h4>;
                }
                if (para.startsWith('*') || para.startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc pl-5 my-3 space-y-1">
                      {para.split('\n').map((item, i) => (
                        <li key={i} className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                          {item.replace(/^[\s*-]+/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (para.startsWith('1.') || para.match(/^\d+\./)) {
                  return (
                    <ol key={index} className="list-decimal pl-5 my-3 space-y-1">
                      {para.split('\n').map((item, i) => (
                        <li key={i} className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                          {item.replace(/^\s*\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return <p key={index} className="text-xs leading-relaxed mb-4 text-zinc-500 dark:text-zinc-450 font-light">{para}</p>;
              })}
            </div>

            {/* Share and Footer */}
            <div className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
              <span className="text-xs text-zinc-450 font-medium">ADVMLabs Editorial Board</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Article link copied to clipboard!');
                }}
                className="inline-flex h-8 items-center justify-center rounded-sm border border-zinc-200 bg-white px-3.5 text-[10px] font-bold uppercase tracking-widest text-zinc-700 shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                id="share-article-btn"
              >
                <Share2 className="mr-1.5 h-3.5 w-3.5" />
                Share Link
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
