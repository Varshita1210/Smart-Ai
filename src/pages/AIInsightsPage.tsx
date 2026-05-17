import React from 'react';
import { motion } from 'motion/react';
import { 
  BrainCircuit, Sparkles, TrendingUp, TrendingDown, Users, 
  MessageSquare, Heart, Lightbulb, Target, Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_GROUP_ANALYSIS } from '../dummyData/mockResponses';
import { PersonalityPieChart } from '../components/charts/ResponsiveCharts';

export default function AIInsightsPage() {
  const insights = [
    { title: 'Audience Vibe', val: 'Highly Strategic', icon: Target, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Top Interest', val: 'Systems Architecture', icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { title: 'Engagement Peak', val: '2:45 PM', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { title: 'Bottleneck', val: 'Question 4', icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-slate-950 scrollbar-hide">
      <header className="mb-12 flex items-center justify-between">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <BrainCircuit className="text-indigo-400 w-6 h-6" />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter">AI Behavioral Insights</h1>
           </div>
           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Generating deep-intelligence reports across 154 participants</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
           <Sparkles className="w-4 h-4" /> Regenerate Analysis
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {insights.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card flex flex-col justify-between group overflow-hidden relative"
          >
            <div className={cn("absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-30", item.bg)} />
            <div className="flex justify-between items-start mb-6">
               <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.bg)}>
                 <item.icon className={cn("w-5 h-5", item.color)} />
               </div>
               <span className="text-[10px] font-black text-emerald-400 tracking-tighter">LIVE GEN</span>
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">{item.title}</p>
               <p className="text-xl font-bold font-display text-white">{item.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 glass-card">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-black text-white flex items-center gap-3">
                 <TrendingUp className="text-blue-400 w-5 h-5" /> Behavioral Sentiment Trends
              </h2>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sentiment Score</span></div>
              </div>
           </div>
           <div className="h-[300px] w-full flex items-end gap-2 border-b border-white/5 pb-2">
              {MOCK_GROUP_ANALYSIS.participationTrends.map((t, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                   <div className="w-full bg-blue-600/20 rounded-t-lg transition-all hover:bg-blue-600/40 relative group" style={{ height: `${t.count * 3}px` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{t.count}</div>
                   </div>
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest rotate-45 mt-2">{t.date}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="glass-card">
           <h2 className="text-xl font-black text-white mb-8">Personality Spectrum</h2>
           <PersonalityPieChart data={Object.entries(MOCK_GROUP_ANALYSIS.personalityDistribution).map(([name, value]) => ({ name, value }))} />
           <div className="space-y-3 mt-6">
              {Object.entries(MOCK_GROUP_ANALYSIS.personalityDistribution).map(([name, val], i) => (
                <div key={i} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                   <span className="text-slate-500 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'][i] }} />
                      {name}
                   </span>
                   <span className="text-white">{val}%</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="glass-card bg-indigo-900/10 border-indigo-500/20">
         <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="text-amber-400 w-6 h-6" />
            <h2 className="text-2xl font-black text-white tracking-tight">Intelligence Recommendations</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_GROUP_ANALYSIS.aiInsights.map((insight, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 font-black text-xs text-white translate-y-1">
                    {i+1}
                 </div>
                 <p className="text-sm text-slate-300 font-medium leading-relaxed italic">"{insight}"</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
