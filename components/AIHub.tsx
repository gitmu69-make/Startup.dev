'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Search,
  Brain,
  Cpu,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  CornerDownLeft,
  ChevronRight,
} from 'lucide-react';

interface Source {
  title: string;
  uri: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  modeUsed?: 'lite' | 'general' | 'search' | 'thinking';
  modelUsed?: string;
  sources?: Source[];
  timestamp: string;
}

const TEMPLATE_PROMPTS = [
  {
    title: 'Analyze Edge Multi-Agents',
    prompt: "Compare ADVMLabs' multi-agent framework optimized for sub-10B models in constrained West African environments with standard heavy cloud-based LLM architectures.",
    mode: 'thinking',
    icon: Brain,
    badge: 'Deep Reasoning',
  },
  {
    title: 'Hydrological SAR Science',
    prompt: 'What are the current satellite-SAR (Synthetic Aperture Radar) radar and neural network methods for predicting floods in river basins? Compare with global standards.',
    mode: 'search',
    icon: Search,
    badge: 'Live Search',
  },
  {
    title: 'Generate Local Server Spec',
    prompt: "Draft a technical specification and secure local network deployment guide for ADVMLabs' proposed decentralized server nodes in Accra, Ghana.",
    mode: 'general',
    icon: Sparkles,
    badge: 'Intelligence',
  },
];

export default function AIHub() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'lite' | 'general' | 'search' | 'thinking'>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thinkingStep, setThinkingStep] = useState<string>('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinkingStep]);

  // Handle template prompt selection
  const handleSelectTemplate = (promptText: string, promptMode: 'lite' | 'general' | 'search' | 'thinking') => {
    setInput(promptText);
    setMode(promptMode);
  };

  // Simulated Thinking/Searching progression feedback
  useEffect(() => {
    if (!isSubmitting) {
      return;
    }

    let interval: NodeJS.Timeout;
    const steps =
      mode === 'thinking'
        ? [
            'Initializing ADVM reasoning engine (gemini-3.1-pro-preview)...',
            'Structuring target multi-layer constraint graph...',
            'Evaluating local compute factors & bandwidth limitations in West Africa...',
            'Injecting ADVMLabs research archives & founder publication telemetry...',
            'Synthesizing deep reasoning vectors for technical clarity...',
            'Drafting final objective response...',
          ]
        : mode === 'search'
        ? [
            'Initializing search grounding protocol (gemini-3.5-flash)...',
            'Broadcasting search vectors to Google Search indexes...',
            'Ingesting high-accuracy real-time articles & scientific papers...',
            'Extracting reliable web grounding sources...',
            'Synthesizing grounded context with ADVMLabs operational standards...',
            'Formatting citations & final answer...',
          ]
        : [
            'Activating general intelligence module...',
            'Parsing prompt parameters...',
            'Mapping semantic ADVMLabs business ontology...',
            'Generating final answer...',
          ];

    let currentStepIdx = 0;

    interval = setInterval(() => {
      currentStepIdx++;
      if (currentStepIdx < steps.length) {
        setThinkingStep(steps[currentStepIdx]);
      } else {
        clearInterval(interval);
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isSubmitting, mode]);

  // Send message to Server API
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isSubmitting) return;

    const userPrompt = input;
    setInput('');
    setErrorMessage(null);
    setIsSubmitting(true);
    
    const initialStep =
      mode === 'thinking'
        ? 'Initializing ADVM reasoning engine (gemini-3.1-pro-preview)...'
        : mode === 'search'
        ? 'Initializing search grounding protocol (gemini-3.5-flash)...'
        : 'Activating general intelligence module...';
    setThinkingStep(initialStep);

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: userPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userPrompt,
          mode,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.text,
        modeUsed: mode,
        modelUsed: data.modelUsed,
        sources: data.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to generate response. Please try again.');
    } finally {
      setIsSubmitting(false);
      setThinkingStep('');
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleResetChat = () => {
    if (confirm('Are you sure you want to reset your conversation history?')) {
      setMessages([]);
      setErrorMessage(null);
    }
  };

  // Elegant client-side markdown-like parsing to support paragraphs, lists, bold text, and code blocks
  const parseMarkdown = (content: string) => {
    if (!content) return null;

    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let codeLanguage = '';

    return lines.map((line, idx) => {
      // Code block detection
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.trim().substring(3) || 'javascript';
          codeContent = [];
          return null;
        } else {
          inCodeBlock = false;
          const fullCode = codeContent.join('\n');
          return (
            <div key={`code-${idx}`} className="my-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-[#0A0A0A] overflow-hidden font-mono text-[11px] text-zinc-300">
              <div className="flex items-center justify-between px-4 py-2 bg-[#121212] border-b border-zinc-200/20 dark:border-zinc-800/60">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{codeLanguage}</span>
                <button
                  onClick={() => copyToClipboard(`code-${idx}`, fullCode)}
                  className="flex items-center space-x-1.5 text-[9px] font-bold uppercase tracking-widest text-zinc-400 hover:text-indigo-400 cursor-pointer transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy Code</span>
                </button>
              </div>
              <pre className="p-4 overflow-x-auto leading-relaxed">
                <code>{fullCode}</code>
              </pre>
            </div>
          );
        }
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return null;
      }

      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-sans text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-[#F5F5F5] mt-6 mb-2">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h5 key={idx} className="font-sans text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mt-4 mb-1">
            {line.replace('#### ', '')}
          </h5>
        );
      }

      // Bullet Lists
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const itemText = line.trim().substring(2);
        return (
          <div key={idx} className="flex items-start space-x-2 pl-3 my-1.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
            <ChevronRight className="h-3 w-3 text-indigo-500 mt-1 shrink-0" />
            <span>{formatBoldText(itemText)}</span>
          </div>
        );
      }

      // Paragraph
      if (line.trim() === '') {
        return <div key={idx} className="h-3" />;
      }

      return (
        <p key={idx} className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-light my-2">
          {formatBoldText(line)}
        </p>
      );
    });
  };

  // Bold text mapping **bold** to React element
  const formatBoldText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold text-zinc-900 dark:text-[#F5F5F5]">{part}</strong> : part));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="ai-hub-container">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          ADVM_STATION_INTELLIGENCE // HUB_01
        </span>
        <h2 className="font-sans text-3xl font-black tracking-tighter uppercase text-zinc-900 sm:text-4xl dark:text-[#F5F5F5]">
          ADVMLabs Neural Intelligence
        </h2>
        <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          Interact with ADVMLabs&apos; localized telemetry, research corpora, and business workflows. Experience three distinct levels of advanced machine reasoning.
        </p>
      </div>

      {/* Grid Configuration Control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="ai-hub-workspace">
        
        {/* Left Side: Control Board */}
        <div className="lg:col-span-4 space-y-6" id="ai-hub-control-panel">
          
          {/* Mode Select Card */}
          <div className="rounded-sm border border-zinc-200 bg-white/70 p-6 shadow-xs dark:border-zinc-850 dark:bg-zinc-900/10 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-[#F5F5F5]">
                Reasoning Mode
              </h3>
              <span className="font-mono text-[9px] font-bold text-indigo-500 uppercase tracking-widest">
                SELECT_PROTOCOL
              </span>
            </div>

            <div className="space-y-3">
              {/* General Intelligence */}
              <button
                onClick={() => setMode('general')}
                className={`w-full flex items-start space-x-3 p-3.5 rounded-sm border text-left cursor-pointer transition-all ${
                  mode === 'general'
                    ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/5'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className={`p-2 rounded-sm shrink-0 ${mode === 'general' ? 'bg-indigo-500 text-white' : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-400'}`}>
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-zinc-900 dark:text-[#F5F5F5]">
                    Gemini Intelligence
                  </h4>
                  <p className="text-[9px] font-medium text-zinc-500 leading-tight mt-0.5">
                    General reasoning, document design, and product telemetry queries.
                  </p>
                </div>
              </button>

              {/* Search Grounding */}
              <button
                onClick={() => setMode('search')}
                className={`w-full flex items-start space-x-3 p-3.5 rounded-sm border text-left cursor-pointer transition-all ${
                  mode === 'search'
                    ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/5'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className={`p-2 rounded-sm shrink-0 ${mode === 'search' ? 'bg-indigo-500 text-white' : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-400'}`}>
                  <Search className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-zinc-900 dark:text-[#F5F5F5]">
                    Google Search Grounding
                  </h4>
                  <p className="text-[9px] font-medium text-zinc-500 leading-tight mt-0.5">
                    Connect queries to real-time Google search indices for verified facts.
                  </p>
                </div>
              </button>

              {/* High Thinking Mode */}
              <button
                onClick={() => setMode('thinking')}
                className={`w-full flex items-start space-x-3 p-3.5 rounded-sm border text-left cursor-pointer transition-all ${
                  mode === 'thinking'
                    ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/5'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className={`p-2 rounded-sm shrink-0 ${mode === 'thinking' ? 'bg-indigo-500 text-white' : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-400'}`}>
                  <Brain className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-zinc-900 dark:text-[#F5F5F5]">
                    High Thinking Mode
                  </h4>
                  <p className="text-[9px] font-medium text-zinc-500 leading-tight mt-0.5">
                    Deep structural analysis and logical mapping for complex systems.
                  </p>
                </div>
              </button>

              {/* Fast / Lite Mode */}
              <button
                onClick={() => setMode('lite')}
                className={`w-full flex items-start space-x-3 p-3.5 rounded-sm border text-left cursor-pointer transition-all ${
                  mode === 'lite'
                    ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/5'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className={`p-2 rounded-sm shrink-0 ${mode === 'lite' ? 'bg-indigo-500 text-white' : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-400'}`}>
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-zinc-900 dark:text-[#F5F5F5]">
                    Lite Mode
                  </h4>
                  <p className="text-[9px] font-medium text-zinc-500 leading-tight mt-0.5">
                    Fast, low-latency processing of simple tasks and quick corrections.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Quick-Prompt Recommendation Board */}
          <div className="rounded-sm border border-zinc-200 bg-white/70 p-6 shadow-xs dark:border-zinc-850 dark:bg-zinc-900/10 backdrop-blur-sm space-y-4">
            <h3 className="font-sans text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-[#F5F5F5]">
              Core Sprints & Templates
            </h3>
            <div className="space-y-3">
              {TEMPLATE_PROMPTS.map((t, idx) => {
                const IconComp = t.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectTemplate(t.prompt, t.mode as any)}
                    className="w-full text-left p-3 rounded-sm border border-zinc-150 bg-zinc-50/50 hover:bg-zinc-100/50 dark:border-zinc-800 dark:bg-zinc-950/20 dark:hover:bg-zinc-900/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-500 px-1.5 py-0.5 rounded-sm">
                        {t.badge}
                      </span>
                      <IconComp className="h-3 w-3 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <h4 className="text-[10px] font-bold text-zinc-800 dark:text-[#F5F5F5] group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                      {t.title}
                    </h4>
                    <p className="text-[9px] text-zinc-500 leading-relaxed font-light line-clamp-2 mt-0.5">
                      {t.prompt}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive AI Console */}
        <div className="lg:col-span-8 space-y-4" id="ai-hub-console">
          <div className="rounded-sm border border-zinc-200 bg-white/70 shadow-lg dark:border-zinc-850 dark:bg-zinc-900/10 backdrop-blur-sm flex flex-col h-[640px] relative overflow-hidden">
            
            {/* Header Status Bar */}
            <div className="px-6 py-3 border-b border-zinc-200 dark:border-zinc-850 bg-zinc-50/40 dark:bg-zinc-950/20 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  NODE // ACTIVE_SECURE_ROUTE
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-indigo-500">
                  {mode === 'general' && 'GEMINI-3.5-FLASH'}
                  {mode === 'search' && 'GROUNDED-3.5-FLASH'}
                  {mode === 'thinking' && 'DEEP-REASONING-3.1-PRO'}
                  {mode === 'lite' && 'FAST-LITE-3.1'}
                </span>
                {messages.length > 0 && (
                  <button
                    onClick={handleResetChat}
                    title="Clear history"
                    className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-4">
                  <div className="h-12 w-12 rounded-sm bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-[#F5F5F5]">
                      ADVM Intelligent Connection Initiated
                    </h3>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mt-1">
                      ACCRA_NODE_01 // READY_FOR_INQUIRY
                    </p>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed font-light">
                    Select a quick-sprint template from the side panel or enter any hardware, software, hydrological, or general automation query to begin compilation.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col space-y-1.5 ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-zinc-400">
                          {m.role === 'user' ? 'USER_PROMPT' : 'ADVM_INTELLIGENCE_ANALYST'}
                        </span>
                        <span className="font-mono text-[8px] text-zinc-500">{m.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-[85%] rounded-sm border p-4 shadow-xs relative group ${
                          m.role === 'user'
                            ? 'bg-zinc-50 border-zinc-200 text-zinc-900 dark:bg-zinc-950/40 dark:border-zinc-800 dark:text-[#F5F5F5]'
                            : 'bg-white border-zinc-150 text-zinc-800 dark:bg-[#030303]/60 dark:border-zinc-850 dark:text-zinc-200 border-l-2 border-l-indigo-500'
                        }`}
                      >
                        {/* Copy button for Assistant replies */}
                        {m.role === 'assistant' && (
                          <button
                            onClick={() => copyToClipboard(m.id, m.text)}
                            className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 p-1 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-all cursor-pointer"
                            title="Copy reply text"
                          >
                            {copiedMessageId === m.id ? (
                              <Check className="h-3 w-3 text-emerald-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        )}

                        {m.role === 'user' ? (
                          <p className="text-xs font-medium leading-relaxed">{m.text}</p>
                        ) : (
                          <div className="space-y-2">
                            {parseMarkdown(m.text)}
                            
                            {/* Metadata Footer */}
                            {m.modelUsed && (
                              <div className="mt-4 pt-3 border-t border-zinc-200/20 dark:border-zinc-800/60 flex flex-wrap gap-2 items-center justify-between text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                                <span>Model: {m.modelUsed}</span>
                                <span>Mode: {m.modeUsed}</span>
                              </div>
                            )}

                            {/* Grounding Citations */}
                            {m.sources && m.sources.length > 0 && (
                              <div className="mt-4 pt-3 border-t border-zinc-200/20 dark:border-zinc-800/60">
                                <h5 className="font-sans text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2">
                                  Grounding Sources Verified:
                                </h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {m.sources.map((src, sIdx) => (
                                    <a
                                      key={sIdx}
                                      href={src.uri}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-between p-2 rounded-sm bg-zinc-50 border border-zinc-150 hover:bg-zinc-100 hover:border-indigo-500 dark:bg-zinc-950/40 dark:border-zinc-800 dark:hover:bg-zinc-900 transition-all text-[9px]"
                                    >
                                      <span className="font-sans font-medium text-zinc-600 dark:text-zinc-400 truncate max-w-[85%]">
                                        {src.title}
                                      </span>
                                      <ExternalLink className="h-2.5 w-2.5 text-indigo-500 shrink-0 ml-1" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Active Loading & Processing States */}
                  {isSubmitting && (
                    <div className="flex flex-col space-y-1.5 items-start">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-zinc-400">
                          COMPILING_RESPONSE
                        </span>
                        <span className="flex h-1.5 w-1.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                        </span>
                      </div>
                      
                      <div className="max-w-[85%] rounded-sm border border-zinc-150 bg-zinc-50 p-4 shadow-xs dark:border-zinc-850 dark:bg-zinc-950/40 border-l-2 border-l-indigo-500 space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-3 w-3 border border-t-indigo-500 border-zinc-300 dark:border-zinc-800" />
                          <span className="font-mono text-[10px] tracking-wide text-zinc-600 dark:text-zinc-400 animate-pulse">
                            {thinkingStep || 'Running neural engine query...'}
                          </span>
                        </div>
                        
                        {mode === 'thinking' && (
                          <div className="space-y-1">
                            <div className="h-1 w-44 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                              <div className="absolute top-0 left-0 h-full w-1/3 bg-indigo-500 rounded-full animate-[shimmer_1.5s_infinite]" style={{ animationDuration: '2s' }} />
                            </div>
                            <span className="font-mono text-[8px] text-indigo-400 uppercase tracking-widest animate-pulse font-bold block">
                              HIGH THINKING MODE ACTIVE (Deep logic expansion)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Errors */}
                  {errorMessage && (
                    <div className="flex flex-col space-y-1.5 items-start">
                      <div className="flex items-center space-x-2 font-mono text-[8px] font-bold text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        <span>INTELLIGENCE_NODE_FAULT</span>
                      </div>
                      <div className="rounded-sm border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-600 dark:text-red-400 font-medium">
                        {errorMessage}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-200 dark:border-zinc-850 bg-zinc-50/40 dark:bg-zinc-950/20">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isSubmitting}
                  placeholder={
                    mode === 'thinking'
                      ? 'Ask a complex engineering or logic query (High Thinking mode is on)...'
                      : mode === 'search'
                      ? 'Type something to search the web (Search Grounding is on)...'
                      : 'Type a prompt for ADVMLabs Intelligence...'
                  }
                  className="w-full rounded-sm border border-zinc-200 bg-white py-3 pl-4 pr-14 text-xs shadow-xs focus:border-indigo-500 focus:outline-hidden dark:border-zinc-800 dark:bg-[#050505] dark:text-[#F5F5F5] font-light"
                />
                
                <div className="absolute right-3 flex items-center space-x-1.5">
                  <button
                    type="submit"
                    disabled={isSubmitting || !input.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-sm bg-zinc-950 text-white hover:bg-indigo-600 transition-all disabled:opacity-30 disabled:hover:bg-zinc-950 dark:bg-[#F5F5F5] dark:text-zinc-950 dark:hover:bg-indigo-50 cursor-pointer"
                    id="ai-hub-submit-btn"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2.5 px-1 font-mono text-[8px] text-zinc-400 dark:text-zinc-500">
                <span>Enter queries about products, climate forecasting, or code structures.</span>
                <span className="flex items-center">
                  Press Enter to submit <CornerDownLeft className="h-2 w-2 ml-1" />
                </span>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
}
