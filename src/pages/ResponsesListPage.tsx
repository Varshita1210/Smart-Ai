import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, User, Mail, Clock, ChevronRight, 
  Trash2, FileText, Download, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useForms } from '../context/FormContext';
import { FormResponse } from '../types';

export default function ResponsesListPage() {
  const { responses } = useForms();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResponse, setSelectedResponse] = useState<FormResponse | null>(null);

  const filteredResponses = responses.filter(r => 
    r.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-screen bg-slate-950">
      <header className="p-8 border-b border-white/10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Responses</h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Live Feed • {responses.length} Total</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden p-8 gap-8">
        {/* List */}
        <div className="w-96 flex flex-col gap-4 overflow-hidden">
          <div className="glass-dark p-2 rounded-2xl flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-500 ml-2" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search people..."
              className="bg-transparent border-none focus:outline-none text-sm w-full py-2 text-white placeholder:text-slate-600"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
            {filteredResponses.map((r) => (
              <button 
                key={r.id}
                onClick={() => setSelectedResponse(r)}
                className={cn(
                  "w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group",
                  selectedResponse?.id === r.id 
                    ? "bg-blue-600/10 border-blue-500/50 shadow-xl shadow-blue-500/5 scale-[1.02]" 
                    : "bg-white/5 border-white/5 hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border font-bold text-sm transition-transform group-hover:scale-110",
                    r.isSpam ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-blue-500/10 border-blue-400/20 text-blue-400"
                  )}>
                    {r.userName.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{r.userName}</p>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter truncate">{r.userEmail}</p>
                  </div>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform",
                  selectedResponse?.id === r.id ? "translate-x-1 text-blue-400" : "text-slate-700 group-hover:text-slate-300"
                )} />
              </button>
            ))}
          </div>
        </div>

        {/* View */}
        <div className="flex-1 glass-card overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            {selectedResponse ? (
              <motion.div 
                key={selectedResponse.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-blue-500/30">
                      {selectedResponse.userName.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-4xl font-black tracking-tighter text-white mb-1">{selectedResponse.userName}</h2>
                      <div className="flex items-center gap-6 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> {selectedResponse.userEmail}</span>
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {selectedResponse.completionTime}s</span>
                        <span className="flex items-center gap-2">
                           {selectedResponse.isSpam ? <AlertCircle className="w-4 h-4 text-red-500" /> : <CheckCircle className="w-4 h-4 text-emerald-500" />}
                           {selectedResponse.isSpam ? 'SPAM FLAGGED' : 'VERIFIED'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all border border-red-500/20"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 space-y-4">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Sentiment</p>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-black text-white capitalize">{selectedResponse.analysis.sentiment}</span>
                        <div className="w-8 h-1.5 bg-green-500 rounded-full" />
                      </div>
                   </div>
                   <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 space-y-4">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Integrity Score</p>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-black text-white">{selectedResponse.analysis.confidence}%</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${selectedResponse.analysis.confidence}%` }} />
                        </div>
                      </div>
                   </div>
                   <div className="p-6 rounded-3xl bg-purple-500/5 border border-purple-500/10 space-y-4">
                      <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Engagement</p>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-black text-white">{selectedResponse.analysis.engagementScore}</span>
                        <Zap className="w-6 h-6 text-amber-400 fill-current" />
                      </div>
                   </div>
                </div>

                <div>
                   <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">Questionnaire Responses</h3>
                   <div className="space-y-8">
                     {Object.entries(selectedResponse.answers).map(([id, val]) => (
                        <div key={id} className="relative pl-8 border-l-2 border-white/5 group hover:border-blue-500/50 transition-colors">
                           <div className="absolute -left-[5px] top-0 w-[8px] h-[8px] rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" />
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">QID: {id}</p>
                           <p className="text-lg font-bold text-white leading-relaxed">{String(val)}</p>
                        </div>
                     ))}
                   </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-20 opacity-40">
                <FileText className="w-20 h-20 text-slate-800 mb-6" />
                <h3 className="text-xl font-black text-slate-600 mb-2">Selection Required</h3>
                <p className="text-slate-700 text-sm max-w-xs font-bold uppercase tracking-tight">Choose a response from the left panel to inspect full behavioral intelligence profile.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
