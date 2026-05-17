import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User, Sparkles, Wand2, Loader2, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import { simulateChatResponse } from '../../lib/aiHelpers';
import { Question } from '../../types';

interface AIChatbotProps {
  onGenerateQuestions: (questions: Question[]) => void;
}

export default function AIChatbot({ onGenerateQuestions }: AIChatbotProps) {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', content: string }[]>([
    { role: 'ai', content: "Hello! I'm your SmartPulse Assistant. Tell me what kind of form you need, and I'll build it with behavioral intelligence." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string) => {
    const finalInput = text || input;
    if (!finalInput.trim()) return;

    const userMessage = finalInput;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    if (!text) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = simulateChatResponse(userMessage);
      setMessages(prev => [...prev, { role: 'ai', content: response.message }]);
      if (response.questions) {
        onGenerateQuestions(response.questions);
      }
      setIsTyping(false);
    }, 1500);
  };

  const SUGGESTIONS = [
    "Create a hackathon registration form",
    "Create a student feedback form",
    "Create a job application form",
    "Generate 10 questions for startup pitch event"
  ];

  return (
    <div className="w-full flex flex-col h-full bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden">
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-blue-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Bot className="text-blue-400 w-5 h-5" />
          </div>
          <div>
            <span className="block text-sm font-black uppercase tracking-widest text-white leading-none mb-1">Pulse AI Assistant</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 tracking-tighter">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
        {messages.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={cn(
              "flex gap-3 max-w-[90%]",
              m.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/10 shadow-lg",
              m.role === 'ai' ? "bg-slate-800 text-blue-400" : "bg-blue-600 text-white"
            )}>
              {m.role === 'ai' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm",
              m.role === 'ai' 
                ? "bg-white/5 border border-white/10 text-slate-200" 
                : "bg-blue-600 text-white"
            )}>
              {m.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-3 text-slate-500">
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-[13px] italic text-slate-400">
              Analyzing intent and generating smart sequence...
            </div>
          </div>
        )}
      </div>

      <div className="p-5 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2 mb-1 w-full">
            <MessageSquare className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Quick Start Suggestions</span>
          </div>
          {SUGGESTIONS.map((hint, i) => (
            <button 
              key={i}
              onClick={() => handleSend(hint)}
              disabled={isTyping}
              className="px-3 py-2 rounded-xl border border-white/5 bg-white/[0.02] text-[10px] font-bold text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left max-w-full truncate disabled:opacity-50"
            >
              {hint}
            </button>
          ))}
        </div>

        <div className="flex gap-2 bg-white/5 border border-white/10 rounded-[1.5rem] p-1 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your command..."
            className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none text-white placeholder:text-slate-600"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 bg-blue-600 rounded-[1.2rem] flex items-center justify-center text-white hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-600/20 disabled:opacity-50 disabled:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
