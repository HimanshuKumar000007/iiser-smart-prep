import React from 'react';
import { MessageSquare, Users, ShieldAlert, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

interface DiscordProps {
  onNavigate?: (view: string) => void;
}

export function Discord({ onNavigate }: DiscordProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const stats = [
    { label: "Community Members", value: "5,420+", icon: Users, color: "text-indigo-500 bg-indigo-500/10" },
    { label: "Students Online Now", value: "386+", icon: Sparkles, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Subject Doubts Solved", value: "12,000+", icon: MessageSquare, color: "text-cyan-500 bg-cyan-500/10" }
  ];

  const channels = [
    { name: "#announcements", desc: "Official updates on IAT exam notifications, syllabus changes, and key dates." },
    { name: "#doubt-solving", desc: "Get stuck on a physics or math problem? Post it here for instant help." },
    { name: "#study-groups", desc: "Form study clubs with peer aspirants targeting the exact same IISER campuses." },
    { name: "#resources", desc: "Access free formula sheets, hand-written notes, and recommended reference guides." }
  ];

  return (
    <div className="max-w-5xl mx-auto w-full space-y-6 mt-2 lg:mt-4 pb-24">
      {/* 1. Header Hero Banner */}
      <div className={cn(
        "relative overflow-hidden p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6",
        isLight
          ? "bg-white/80 border-slate-200/80 shadow-[0_8px_32px_rgba(15,23,42,0.06)]"
          : "bg-gradient-to-br from-[#0B0D1B] via-[#0D0F22] to-[#12142E] border-white/10"
      )}>
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#5865F2]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="space-y-2 z-10 relative">
          <button
            onClick={() => onNavigate?.('dashboard')}
            className="flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-600 transition-colors font-medium mb-3 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </button>
          <h1 className={cn(
            "text-2xl sm:text-3xl font-extrabold tracking-tight",
            isLight ? "text-slate-900" : "text-white"
          )}>
            SmartPrep Discord Community
          </h1>
          <p className={cn("text-xs sm:text-sm max-w-xl", isLight ? "text-slate-500" : "text-white/60")}>
            Join thousands of IISER aspirants, compare mock test scores, clear your doubts, and prep together with top rankers.
          </p>
        </div>

        <div className="flex items-center justify-center p-4 rounded-2xl bg-[#5865F2]/15 border border-[#5865F2]/25 z-10">
          <svg className="w-10 h-10 text-[#5865F2]" viewBox="0 0 127.14 96.36" fill="currentColor">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.95,54.65,1,77.53a105.54,105.54,0,0,0,32,16.29,79.5,79.5,0,0,0,6.85-11.14A68.58,68.58,0,0,1,28.32,77c1,0.72,2,1.47,3,2.2a75,75,0,0,0,64.63,0c1-.73,2-1.48,3-2.2a68.7,68.7,0,0,1-11.53,5.63,79.84,79.84,0,0,0,6.85,11.14,105.37,105.37,0,0,0,32-16.29C129.66,48.5,123.39,25.75,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
          </svg>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className={cn(
              "p-5 rounded-3xl border flex items-center gap-4 transition-all duration-300",
              isLight
                ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
                : "bg-[#0A0B16] border-white/5 hover:border-white/10"
            )}
          >
            <div className={cn("p-3 rounded-2xl", s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className={cn("text-xs font-bold block", isLight ? "text-slate-400" : "text-white/40")}>
                {s.label}
              </span>
              <span className={cn("text-lg font-black tracking-tight", isLight ? "text-slate-800" : "text-white")}>
                {s.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column (Roadmap & Channels list) */}
        <div className="lg:col-span-7 space-y-6">
          <div className={cn(
            "rounded-3xl border p-5 sm:p-7 transition-all duration-300",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0B16] border-white/5"
          )}>
            <h3 className={cn("text-sm font-extrabold tracking-tight mb-5", isLight ? "text-slate-800" : "text-white")}>
              💬 Explore Community Channels
            </h3>
            
            <div className="space-y-4">
              {channels.map((chan, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-4 rounded-2xl border transition-all duration-200 flex flex-col gap-1",
                    isLight
                      ? "bg-slate-50 border-slate-100 hover:border-slate-200/80"
                      : "bg-[#05060F]/60 border-white/[0.03] hover:border-white/[0.06]"
                  )}
                >
                  <span className="text-xs font-extrabold text-[#5865F2] tracking-wide">
                    {chan.name}
                  </span>
                  <p className={cn("text-[11px] leading-relaxed", isLight ? "text-slate-500" : "text-white/50")}>
                    {chan.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column (CTA Box & Guidelines) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Join Call to Action Box */}
          <div className={cn(
            "rounded-3xl border p-6 text-center space-y-6 relative overflow-hidden transition-all duration-300",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-gradient-to-b from-[#0A0B16] to-[#0d0f28] border-white/5"
          )}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#5865F2]/10 rounded-full blur-[40px] pointer-events-none" />
            
            <div className="space-y-2">
              <h3 className={cn("text-base font-extrabold tracking-tight", isLight ? "text-slate-800" : "text-white")}>
                Ready to Join the Fun?
              </h3>
              <p className={cn("text-[11px] leading-relaxed max-w-xs mx-auto", isLight ? "text-slate-500" : "text-white/50")}>
                Click below to launch the Discord server invite. Set up your role as an IISER aspirant to access study materials.
              </p>
            </div>

            <div className="py-2 flex justify-center">
              <svg className="w-14 h-14 text-[#5865F2]" viewBox="0 0 127.14 96.36" fill="currentColor">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.95,54.65,1,77.53a105.54,105.54,0,0,0,32,16.29,79.5,79.5,0,0,0,6.85-11.14A68.58,68.58,0,0,1,28.32,77c1,0.72,2,1.47,3,2.2a75,75,0,0,0,64.63,0c1-.73,2-1.48,3-2.2a68.7,68.7,0,0,1-11.53,5.63,79.84,79.84,0,0,0,6.85,11.14,105.37,105.37,0,0,0,32-16.29C129.66,48.5,123.39,25.75,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
              </svg>
            </div>

            <a
              href="https://discord.gg/smartprep"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#5865F2]/20 hover:scale-[1.01]"
            >
              Launch Discord Server
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Code of Conduct / Guidelines */}
          <div className={cn(
            "rounded-3xl border p-5 transition-all duration-300 flex items-start gap-4",
            isLight
              ? "bg-slate-50 border-slate-200/60 shadow-[0_8px_30px_rgba(15,23,42,0.01)]"
              : "bg-[#060814] border-white/5"
          )}>
            <div className="p-2.5 rounded-xl bg-[#5865F2]/10 text-[#5865F2]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className={cn("text-xs font-bold", isLight ? "text-slate-800" : "text-white")}>
                Community Guidelines
              </h4>
              <p className={cn("text-[10px] leading-relaxed", isLight ? "text-slate-500" : "text-white/50")}>
                No spam, promotions, or toxic behavior. Keep all posts academic and related to IISER SmartPrep lessons or doubt solving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
