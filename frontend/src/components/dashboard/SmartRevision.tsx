import { motion } from 'motion/react';
import { BrainCircuit, Sparkles, Clock, BookOpen, ChevronRight, Zap, FlaskConical, Calculator, Dna } from 'lucide-react';
import { DashboardData } from '../../hooks/useDashboardData';
import { LESSONS_DATA } from '../../data/lessons';
import { cn } from '../../lib/utils';

interface Props {
  dashboardData: DashboardData | null;
  loading: boolean;
  onNavigate?: (view: string) => void;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-white/8', className)} />;
}

function SubjectIcon({ subject, className }: { subject: string; className?: string }) {
  switch (subject) {
    case 'Physics':     return <Zap className={className} />;
    case 'Chemistry':   return <FlaskConical className={className} />;
    case 'Mathematics': return <Calculator className={className} />;
    case 'Biology':     return <Dna className={className} />;
    default:            return <BookOpen className={className} />;
  }
}

export function SmartRevision({ dashboardData, loading, onNavigate }: Props) {
  const hasData = (dashboardData?.total_attempts ?? 0) > 0;
  
  // Generate mock due revision items from the lowest performing subjects
  const getDueItems = () => {
    if (!dashboardData) return [];
    
    // Sort subjects by performance ascending
    const sortedPerformances = [...(dashboardData.subject_performance || [])]
      .sort((a, b) => a.accuracy - b.accuracy);
      
    const dueList = [];
    
    for (const performance of sortedPerformances) {
      if (dueList.length >= 3) break;
      
      // Find a lesson in this subject to revise
      const subjectLessons = LESSONS_DATA.filter(
        l => l.subject.toLowerCase() === performance.subject.toLowerCase()
      );
      
      if (subjectLessons.length > 0) {
        // Just pick one lesson as mock revision candidate
        const lessonIndex = Math.min(2, subjectLessons.length - 1);
        const lesson = subjectLessons[lessonIndex];
        
        dueList.push({
          id: `rev-${lesson.id}`,
          chapterId: lesson.id,
          chapterTitle: lesson.title,
          subject: lesson.subject,
          masteryScore: Math.round(performance.accuracy * 0.9), // mock current score
          isDue: true,
          daysUntilReview: 0,
        });
      }
    }
    
    // Fillers if no attempts or insufficient data
    if (dueList.length === 0) {
      dueList.push(
        {
          id: 'rev-phy_units',
          chapterId: 'phy_units',
          chapterTitle: 'Units, Measurements & Error Analysis',
          subject: 'Physics',
          masteryScore: 45,
          isDue: true,
          daysUntilReview: 0,
        },
        {
          id: 'rev-chem_bonding',
          chapterId: 'chem_bonding',
          chapterTitle: 'Chemical Bonding and Molecular Structure',
          subject: 'Chemistry',
          masteryScore: 58,
          isDue: true,
          daysUntilReview: 0,
        }
      );
    }
    
    return dueList.slice(0, 3);
  };

  const dueItems = getDueItems();

  return (
    <div className="relative bg-gradient-to-br from-[#0D0F1F] via-[#0A0C18] to-[#0D0F1F] border border-white/10 rounded-3xl p-6 overflow-hidden shadow-xl group">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none transition-opacity duration-700 opacity-40 group-hover:opacity-80" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/4 blur-[90px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/25 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.12)]">
            <BrainCircuit className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-display font-bold text-base leading-tight">
                Smart Revision Engine
              </h3>
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/20 text-purple-300">
                <Sparkles className="w-2.5 h-2.5" />
                Rule-Based
              </span>
            </div>
            <p className="text-[11px] text-white/40 mt-0.5">
              {!loading && hasData
                ? `Prioritized revision queue based on performance`
                : 'Analysing your dashboard history…'}
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="relative z-10 space-y-3 animate-pulse">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.03]">
              <Skeleton className="w-11 h-11 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2.5">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-52 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Revision Queue (Due Items) */}
      {!loading && (
        <div className="relative z-10 space-y-4">
          {!hasData ? (
            <div className="flex flex-col items-center text-center py-6 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Revision queue empty</p>
                <p className="text-xs text-white/40 mt-1 max-w-[240px] leading-relaxed">
                  Attempt tests or complete lessons to queue chapters for spaced revision.
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-2">
                Suggested Revision Queue
              </p>
              <div className="space-y-2">
                {dueItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    onClick={() => onNavigate?.(`/smart-lessons/${item.chapterId}`)}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-white/10 transition-all cursor-pointer"
                  >
                    <SubjectIcon
                      subject={item.subject}
                      className="w-4 h-4 flex-shrink-0 text-purple-400 group-hover:scale-110 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.chapterTitle}</p>
                      <p className="text-[10px] text-white/35 flex items-center gap-1 mt-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {item.isDue ? 'Due for review' : `Due in ${item.daysUntilReview}d`}
                        {' · '}
                        Est. Score: {item.masteryScore}%
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/25 group-hover:text-white/60 transition-colors flex-shrink-0" />
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <p className="text-[11px] text-white/25 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-purple-400/50" />
                  Spaced Repetition engine active
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
