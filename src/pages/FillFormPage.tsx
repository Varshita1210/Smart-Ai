import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ThumbsUp,
  Frown,
  Meh,
  Smile,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SAMPLE_FORM } from '../constants';

import { Page } from '../types';

interface FillFormPageProps {
  onNavigate: (page: Page) => void;
}

export default function FillFormPage({ onNavigate }: FillFormPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emotion, setEmotion] = useState<'happy' | 'neutral' | 'confused' | 'frustrated'>('neutral');

  const questions = SAMPLE_FORM.questions;
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

    const handleNext = () => {
    if (currentStep < questions.length - 1) {
      if (currentStep === 1) setEmotion('confused');
      if (currentStep === 3) setEmotion('happy');
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const getEmotionIcon = () => {
    switch (emotion) {
      case 'happy': return <Smile className="text-green-400 w-6 h-6" />;
      case 'confused': return <Meh className="text-amber-400 w-6 h-6" />;
      case 'frustrated': return <Frown className="text-rose-400 w-6 h-6" />;
      default: return <Smile className="text-slate-400 w-6 h-6" />;
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card max-w-md w-full p-12 text-center border-blue-500/20">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="text-blue-500 w-10 h-10" /></div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4">Submission Saved!</h2>
          <p className="text-slate-400 mb-8 font-medium">SmartPulse AI has analyzed your responses for quality metrics.</p>
          <button onClick={() => onNavigate('dashboard')} className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2">
            See Analytics <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-lg px-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Form Progress</span>
            <span className="text-xs font-bold text-blue-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>
        </div>

        <div className="max-w-xl w-full pt-20">
          <AnimatePresence mode="wait">
            <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-tight">{currentQuestion.title}</h2>
                {currentQuestion.description && <p className="text-slate-500 mt-3 font-medium">{currentQuestion.description}</p>}
              </div>

              {currentQuestion.type === 'text' && (
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-blue-500 transition-all text-xl text-white placeholder:text-slate-600"
                  placeholder="Your answer..."
                  rows={3}
                  onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                />
              )}

              {currentQuestion.type === 'rating' && (
                <div className="flex justify-between max-w-sm mx-auto py-4">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} onClick={() => setAnswers({...answers, [currentQuestion.id]: val})} className={cn("w-14 h-14 md:w-16 md:h-16 rounded-2xl border transition-all text-lg font-bold", answers[currentQuestion.id] === val ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10")}>
                      {val}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'yes-no' && (
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setAnswers({...answers, [currentQuestion.id]: true})} className={cn("p-8 rounded-2xl border flex flex-col items-center gap-3 transition-all", answers[currentQuestion.id] === true ? "bg-green-500/20 border-green-500 text-green-400 shadow-lg shadow-green-500/5" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10")}>
                    <ThumbsUp className="w-8 h-8" /> <span className="font-bold">Yes</span>
                  </button>
                  <button onClick={() => setAnswers({...answers, [currentQuestion.id]: false})} className={cn("p-8 rounded-2xl border flex flex-col items-center gap-3 transition-all", answers[currentQuestion.id] === false ? "bg-red-500/20 border-red-500 text-red-400 shadow-lg shadow-red-500/5" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10")}>
                    <Frown className="w-8 h-8" /> <span className="font-bold">No</span>
                  </button>
                </div>
              )}

              <button 
                onClick={handleNext} 
                disabled={isSubmitting}
                className="w-full btn-primary h-16 text-lg flex items-center justify-center gap-3"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <span>{currentStep === questions.length - 1 ? 'Submit Response' : 'Continue'}</span>}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <aside className="hidden lg:flex w-96 border-l border-white/10 bg-slate-950/50 backdrop-blur-xl p-10 flex-col gap-8">
        <div className="flex items-center gap-2 text-blue-400"><AlertCircle className="w-5 h-5" /><h3 className="text-sm font-bold uppercase tracking-widest">Behavior Engine</h3></div>
        
        <div className="glass-card !p-8 border-blue-500/20">
          <div className="flex justify-between items-center mb-6"><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time Sentiment</span><span className="text-[10px] text-blue-400 font-bold animate-pulse">MONITORING</span></div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">{getEmotionIcon()}</div>
            <div><p className="text-2xl font-extrabold capitalize text-white leading-none mb-1">{emotion}</p><p className="text-xs text-slate-500 font-medium tracking-tight">System detected state</p></div>
          </div>
        </div>

        <div className="p-8 glass-card">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Engagement Index</p>
          <div className="text-5xl font-extrabold text-blue-400 tracking-tighter">89<span className="text-lg text-slate-600 ml-1">/100</span></div>
          <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">Optimal Range</p>
        </div>
        
        <div className="mt-auto p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
          <p className="text-[11px] text-blue-300/70 italic leading-relaxed">
            "We are monitoring response patterns to ensure data integrity and prevent submission fatigue."
          </p>
        </div>
      </aside>
    </div>
  );
}
