import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon,
  User,
  Target,
  BookOpen,
  Calendar,
  Bell,
  Palette,
  Bot,
  Shield,
  Database,
  Diamond,
  HelpCircle,
  AlertTriangle,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { currentUser } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { Footer } from '../layout/Footer';
import { useTheme, Theme } from '../../context/ThemeContext';

function SettingToggle({ label, enabled, onChange, isLight }: { label: string, enabled: boolean, onChange?: () => void, isLight?: boolean }) {
  const [isOn, setIsOn] = useState(enabled);
  
  return (
    <div className="flex items-center justify-between py-3 group">
      <span className={cn(
        "text-sm font-medium transition-colors",
        isLight ? "text-slate-700 group-hover:text-slate-900" : "text-white/80 group-hover:text-white"
      )}>{label}</span>
      <button 
        onClick={() => {
          setIsOn(!isOn);
          onChange?.();
        }}
        className={cn(
          "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
          isOn ? "bg-cyan-500" : isLight ? "bg-slate-200" : "bg-white/10"
        )}
      >
         <div className={cn(
           "w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-sm",
           isOn ? "translate-x-6" : "translate-x-1"
         )} />
      </button>
    </div>
  );
}

export function Settings() {
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('IAT_TOKEN');
      if (!token) return;
      setLoadingProfile(true);
      try {
        const API_BASE =
          (import.meta as any).env?.VITE_API_URL ??
          ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');
        const res = await fetch(`${API_BASE}/api/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Failed to fetch profile in Settings:", err);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [submittingPassword, setSubmittingPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    setSubmittingPassword(true);
    try {
      const token = localStorage.getItem('IAT_TOKEN');
      const API_BASE =
        (import.meta as any).env?.VITE_API_URL ??
        ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');
      const res = await fetch(`${API_BASE}/api/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setShowPasswordModal(false), 1500);
      } else {
        setPasswordError(data.error || 'Failed to change password');
      }
    } catch (err) {
      console.error(err);
      setPasswordError('Network error. Please try again.');
    } finally {
      setSubmittingPassword(false);
    }
  };
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as Theme);
  };

  const handleLogout = () => {
    localStorage.removeItem('IAT_TOKEN');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('dashboard_current_view');
    window.location.href = '../index.html';
  };

  return (
    <div className="max-w-6xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32 lg:pb-0">
      
      {/* HEADER SECTION */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <SettingsIcon className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className={cn("text-2xl font-display font-bold tracking-tight", isLight ? "text-slate-900" : "text-white")}>Settings</h1>
          <p className={cn("text-sm", isLight ? "text-slate-500" : "text-white/50")}>Customize your preparation experience.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* LEFT COLUMN: Main Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* SECTION 1: PROFILE & ACCOUNT */}
          <section className={cn(
            "p-6 rounded-3xl border space-y-6 transition-colors",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0C16] border-white/5"
          )}>
            <h2 className={cn("text-base font-bold flex items-center gap-2 border-b pb-4", isLight ? "text-slate-900 border-slate-100" : "text-white border-white/5")}>
              <User className={cn("w-5 h-5", isLight ? "text-slate-400" : "text-white/40")} /> Profile & Account
            </h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {(() => {
                const name = profile?.name || "Student";
                const email = profile?.email || "student@iisersmartprep.space";
                const isPro = profile?.plan === 'pro' || profile?.is_pro;
                const getInitials = (nameStr: string) => {
                  if (!nameStr) return "S";
                  const parts = nameStr.trim().split(/\s+/);
                  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
                  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
                };
                const initials = getInitials(name);
                return (
                  <>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 p-1 animate-in zoom-in duration-500">
                      <div className={cn("w-full h-full rounded-full flex items-center justify-center border-4", isLight ? "bg-white border-white" : "bg-[#0A0C16] border-[#0A0C16]")}>
                        <span className={cn("text-2xl font-bold", isLight ? "text-slate-900" : "text-white")}>{initials}</span>
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-1">
                       <h3 className={cn("text-xl font-bold", isLight ? "text-slate-900" : "text-white")}>{name}</h3>
                       <p className={cn("text-sm", isLight ? "text-slate-500" : "text-white/50")}>{email}</p>
                       <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                          <span className={cn("text-xs font-bold px-2.5 py-1 rounded-md border", isLight ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-white/5 text-white/70 border-white/10")}>IISER IAT 2027</span>
                          {isPro ? (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                              <Diamond className="w-3 h-3 text-indigo-400" /> Premium Member
                            </span>
                          ) : (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              Free Plan
                            </span>
                          )}
                       </div>
                    </div>
                  </>
                );
              })()}
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                 <button className={cn("px-4 py-2 rounded-xl font-medium text-sm transition-colors border cursor-pointer", isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200" : "bg-white/5 hover:bg-white/10 text-white border-white/10")}>
                   Edit Profile
                 </button>
                  <button 
                    onClick={() => setShowPasswordModal(true)}
                    className={cn("px-4 py-2 rounded-xl font-medium text-sm transition-colors cursor-pointer", isLight ? "hover:bg-slate-100 text-slate-600 hover:text-slate-900" : "hover:bg-white/5 text-white/60 hover:text-white")}
                  >
                    Change Password
                  </button>
              </div>
            </div>
          </section>

          {/* SECTION 2: EXAM TARGETS */}
          <section className={cn(
            "p-6 rounded-3xl border space-y-6 transition-colors",
            isLight
              ? "bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/40 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-gradient-to-br from-indigo-500/5 to-[#0A0C16] border-indigo-500/20"
          )}>
            <h2 className={cn("text-base font-bold flex items-center gap-2 border-b pb-4", isLight ? "text-slate-900 border-slate-100" : "text-white border-white/5")}>
              <Target className="w-5 h-5 text-indigo-400" /> Exam Goals
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className={cn("block text-sm font-medium mb-3", isLight ? "text-slate-600" : "text-white/70")}>Current Target Exam</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button className="p-3 rounded-xl bg-indigo-500 border border-indigo-500/50 text-white font-bold text-sm shadow-[0_0_15px_rgba(99,102,241,0.2)] cursor-pointer">IISER IAT</button>
                  <button className={cn("p-3 rounded-xl border font-medium text-sm transition-all cursor-pointer", isLight ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300" : "bg-[#05060F] border-white/10 text-white/70 hover:text-white hover:border-white/20")}>NEST</button>
                  <button className={cn("p-3 rounded-xl border font-medium text-sm transition-all cursor-pointer", isLight ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300" : "bg-[#05060F] border-white/10 text-white/70 hover:text-white hover:border-white/20")}>IISER IAT + NEST</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                    <label className={cn("block text-sm font-medium mb-2", isLight ? "text-slate-600" : "text-white/70")}>Target Institute</label>
                    <select className={cn("w-full border rounded-xl p-3 text-sm outline-none appearance-none transition-colors", isLight ? "bg-white border-slate-200 text-slate-800 focus:border-indigo-500" : "bg-[#05060F] border-white/10 text-white focus:border-indigo-500/50")}>
                       <option>IISER Pune</option>
                       <option>IISER Kolkata</option>
                       <option>IISER Mohali</option>
                       <option>IISER Bhopal</option>
                       <option>IISER Thiruvananthapuram</option>
                       <option>IISER Tirupati</option>
                       <option>IISER Berhampur</option>
                       <option>NISER Bhubaneswar</option>
                       <option>UM-DAE CEBS</option>
                    </select>
                 </div>
                 <div>
                    <label className={cn("block text-sm font-medium mb-2", isLight ? "text-slate-600" : "text-white/70")}>Target Year</label>
                    <select className={cn("w-full border rounded-xl p-3 text-sm outline-none appearance-none transition-colors", isLight ? "bg-white border-slate-200 text-slate-800 focus:border-indigo-500" : "bg-[#05060F] border-white/10 text-white focus:border-indigo-500/50")}>
                       <option>2025</option>
                       <option>2026</option>
                       <option>2027</option>
                       <option>2028</option>
                    </select>
                 </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: STUDY PREFERENCES */}
          <section className={cn(
            "p-6 rounded-3xl border space-y-6 transition-colors",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0C16] border-white/5"
          )}>
            <h2 className={cn("text-base font-bold flex items-center gap-2 border-b pb-4", isLight ? "text-slate-900 border-slate-100" : "text-white border-white/5")}>
              <BookOpen className="w-5 h-5 text-emerald-400" /> Study Preferences
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className={cn("block text-sm font-medium mb-3", isLight ? "text-slate-600" : "text-white/70")}>Current Level</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-bold text-sm cursor-pointer">
                    🌱 Beginner
                  </button>
                  <button className={cn("flex items-center justify-center gap-2 p-3 rounded-xl border font-medium text-sm transition-all cursor-pointer", isLight ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300" : "bg-[#05060F] border-white/10 text-white/70 hover:text-white hover:border-white/20")}>
                    🌿 Intermediate
                  </button>
                  <button className={cn("flex items-center justify-center gap-2 p-3 rounded-xl border font-medium text-sm transition-all cursor-pointer", isLight ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300" : "bg-[#05060F] border-white/10 text-white/70 hover:text-white hover:border-white/20")}>
                    🏆 Advanced
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                    <label className={cn("block text-sm font-medium mb-3", isLight ? "text-slate-600" : "text-white/70")}>Preferred Subjects</label>
                    <div className="space-y-2">
                       {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map(sub => (
                         <label key={sub} className={cn("flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors group", isLight ? "hover:bg-slate-100/70" : "hover:bg-white/5")}>
                           <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", ['Physics','Chemistry'].includes(sub) ? "bg-cyan-500 border-cyan-500" : isLight ? "border-slate-300 group-hover:border-slate-400" : "border-white/20 group-hover:border-white/40")}>
                             {['Physics','Chemistry'].includes(sub) && <div className="w-2 h-2 bg-black rounded-sm" />}
                           </div>
                           <span className={cn("text-sm font-medium", isLight ? "text-slate-700" : "text-white/80")}>{sub}</span>
                         </label>
                       ))}
                    </div>
                 </div>
                 <div>
                    <label className={cn("block text-sm font-medium mb-3", isLight ? "text-slate-600" : "text-white/70")}>Weak Subjects (Focus Areas)</label>
                    <div className="space-y-2">
                       {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map(sub => (
                         <label key={sub} className={cn("flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors group", isLight ? "hover:bg-slate-100/70" : "hover:bg-white/5")}>
                           <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", ['Mathematics', 'Biology'].includes(sub) ? "bg-rose-500 border-rose-500" : isLight ? "border-slate-300 group-hover:border-slate-400" : "border-white/20 group-hover:border-white/40")}>
                             {['Mathematics', 'Biology'].includes(sub) && <div className="w-2 h-2 bg-black rounded-sm" />}
                           </div>
                           <span className={cn("text-sm font-medium", isLight ? "text-slate-700" : "text-white/80")}>{sub}</span>
                         </label>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: DAILY GOALS */}
          <section className={cn(
            "p-6 rounded-3xl border space-y-6 transition-colors",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0C16] border-white/5"
          )}>
            <h2 className={cn("text-base font-bold flex items-center gap-2 border-b pb-4", isLight ? "text-slate-900 border-slate-100" : "text-white border-white/5")}>
              <Calendar className="w-5 h-5 text-amber-400" /> Daily Goals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
               <div className={cn("p-4 rounded-2xl border transition-colors", isLight ? "bg-slate-50 border-slate-200/70" : "bg-white/5 border-white/5")}>
                 <p className={cn("text-xs font-bold uppercase tracking-widest mb-4", isLight ? "text-slate-400" : "text-white/40")}>Lessons / Day</p>
                 <div className="flex items-center justify-between">
                    <button className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors cursor-pointer", isLight ? "bg-slate-200/70 text-slate-700 hover:bg-slate-200" : "bg-white/10 text-white/60 hover:text-white hover:bg-white/20")}>-</button>
                    <span className={cn("text-2xl font-bold", isLight ? "text-slate-900" : "text-white")}>2</span>
                    <button className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors cursor-pointer", isLight ? "bg-slate-200/70 text-slate-700 hover:bg-slate-200" : "bg-white/10 text-white/60 hover:text-white hover:bg-white/20")}>+</button>
                 </div>
               </div>
               <div className={cn("p-4 rounded-2xl border transition-colors", isLight ? "bg-slate-50 border-slate-200/70" : "bg-white/5 border-white/5")}>
                 <p className={cn("text-xs font-bold uppercase tracking-widest mb-4", isLight ? "text-slate-400" : "text-white/40")}>Study Time</p>
                 <div className="flex items-center justify-between">
                    <button className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors cursor-pointer", isLight ? "bg-slate-200/70 text-slate-700 hover:bg-slate-200" : "bg-white/10 text-white/60 hover:text-white hover:bg-white/20")}>-</button>
                    <span className={cn("text-2xl font-bold flex items-baseline gap-1", isLight ? "text-slate-900" : "text-white")}>2<span className={cn("text-xs", isLight ? "text-slate-400" : "text-white/40")}>h</span></span>
                    <button className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors cursor-pointer", isLight ? "bg-slate-200/70 text-slate-700 hover:bg-slate-200" : "bg-white/10 text-white/60 hover:text-white hover:bg-white/20")}>+</button>
                 </div>
               </div>
               <div className={cn("p-4 rounded-2xl border transition-colors", isLight ? "bg-slate-50 border-slate-200/70" : "bg-white/5 border-white/5")}>
                 <p className={cn("text-xs font-bold uppercase tracking-widest mb-4", isLight ? "text-slate-400" : "text-white/40")}>Mocks / Wk</p>
                 <div className="flex items-center justify-between">
                    <button className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors cursor-pointer", isLight ? "bg-slate-200/70 text-slate-700 hover:bg-slate-200" : "bg-white/10 text-white/60 hover:text-white hover:bg-white/20")}>-</button>
                    <span className={cn("text-2xl font-bold", isLight ? "text-slate-900" : "text-white")}>1</span>
                    <button className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors cursor-pointer", isLight ? "bg-slate-200/70 text-slate-700 hover:bg-slate-200" : "bg-white/10 text-white/60 hover:text-white hover:bg-white/20")}>+</button>
                 </div>
               </div>
            </div>
          </section>

          {/* SECTION 5: NOTIFICATIONS */}
          <section className={cn(
            "p-6 rounded-3xl border space-y-4 transition-colors",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0C16] border-white/5"
          )}>
            <h2 className={cn("text-base font-bold flex items-center gap-2 border-b pb-4 mb-2", isLight ? "text-slate-900 border-slate-100" : "text-white border-white/5")}>
              <Bell className="w-5 h-5 text-rose-400" /> Notifications
            </h2>
            <div className={cn("divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
              <SettingToggle label="Daily Study Reminder" enabled={true} isLight={isLight} />
              <SettingToggle label="Revision Reminder" enabled={true} isLight={isLight} />
              <SettingToggle label="Mock Test Reminder" enabled={true} isLight={isLight} />
              <SettingToggle label="Weekly Progress Report" enabled={false} isLight={isLight} />
              <SettingToggle label="Exam Countdown Alerts" enabled={true} isLight={isLight} />
            </div>
          </section>

          {/* SECTION 6: AI PERSONALIZATION */}
          <section className={cn(
            "p-6 rounded-3xl border space-y-4 transition-colors",
            isLight
              ? "bg-gradient-to-br from-purple-50/80 via-white to-purple-50/40 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-gradient-to-br from-purple-500/5 to-[#0A0C16] border-purple-500/20"
          )}>
            <h2 className={cn("text-base font-bold flex items-center gap-2 border-b pb-4 mb-2", isLight ? "text-slate-900 border-slate-100" : "text-white border-white/5")}>
              <Bot className="w-5 h-5 text-purple-400" /> AI Preferences
            </h2>
            <div className={cn("divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
              <SettingToggle label="Enable Smart Recommendations" enabled={true} isLight={isLight} />
              <SettingToggle label="Enable Weak Area Detection" enabled={true} isLight={isLight} />
              <SettingToggle label="Enable Daily Study Plans" enabled={true} isLight={isLight} />
              <SettingToggle label="Enable AI Revision Queue" enabled={true} isLight={isLight} />
              <SettingToggle label="Enable Personalized Insights" enabled={true} isLight={isLight} />
            </div>
          </section>

          {/* SECTION 7: APPEARANCE */}
          <section className={cn(
            "p-6 rounded-3xl border space-y-6 transition-colors",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0C16] border-white/5"
          )}>
            <h2 className={cn("text-base font-bold flex items-center gap-2 border-b pb-4", isLight ? "text-slate-900 border-slate-100" : "text-white border-white/5")}>
              <Palette className="w-5 h-5 text-fuchsia-400" /> Appearance
            </h2>
            
            <div>
              <label className={cn("block text-sm font-medium mb-3", isLight ? "text-slate-600" : "text-white/70")}>Themes</label>
              <div className="grid grid-cols-2 max-w-md gap-3">
                 <button 
                  onClick={() => handleThemeChange('dark')}
                  className={cn("p-4 rounded-xl border-2 flex flex-col items-center gap-2 group transition-all cursor-pointer", theme === 'dark' ? "border-cyan-500 bg-slate-900 text-white" : isLight ? "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900" : "border-transparent hover:border-white/10 bg-slate-950 text-white/50 hover:text-white")}
                 >
                   <div className="w-8 h-8 rounded-full bg-[#060814] border border-white/20" />
                   <span className={cn("text-xs", theme === 'dark' ? "font-bold text-white" : isLight ? "font-medium text-slate-600" : "font-medium text-white/50")}>Dark Premium</span>
                 </button>
                 <button 
                  onClick={() => handleThemeChange('light')}
                  className={cn("p-4 rounded-xl border-2 flex flex-col items-center gap-2 group transition-all cursor-pointer", theme === 'light' ? "border-cyan-500 bg-white text-slate-900 shadow-md" : "border-transparent hover:border-white/10 bg-slate-950 text-white/50 hover:text-white")}
                 >
                   <div className="w-8 h-8 rounded-full bg-[#f1f5f9] border border-slate-300" />
                   <span className={cn("text-xs", theme === 'light' ? "font-bold text-slate-900" : "font-medium text-white/50")}>Light Glass Mode V2</span>
                 </button>
              </div>
            </div>

            <div className={cn("divide-y pt-2", isLight ? "divide-slate-100 border-slate-100" : "divide-white/5 border-white/5")}>
              <SettingToggle label="Animations & Transitions" enabled={true} isLight={isLight} />
              <SettingToggle label="Reduced Motion" enabled={false} isLight={isLight} />
              <SettingToggle label="Compact Mode" enabled={false} isLight={isLight} />
            </div>
          </section>

          {/* SECTION 8: DATA & PROGRESS */}
          <section className={cn(
            "p-6 rounded-3xl border space-y-6 transition-colors",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0C16] border-white/5"
          )}>
            <h2 className={cn("text-base font-bold flex items-center gap-2 border-b pb-4", isLight ? "text-slate-900 border-slate-100" : "text-white border-white/5")}>
              <Database className="w-5 h-5 text-blue-400" /> Study Data
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               <div className={cn("p-4 rounded-2xl text-center border transition-colors", isLight ? "bg-slate-50 border-slate-200/70" : "bg-white/5 border-white/5")}>
                 <p className={cn("text-2xl font-bold mb-1", isLight ? "text-slate-900" : "text-white")}>1,248</p>
                 <p className={cn("text-[10px] font-bold uppercase tracking-widest", isLight ? "text-slate-400" : "text-white/40")}>Questions</p>
               </div>
               <div className={cn("p-4 rounded-2xl text-center border transition-colors", isLight ? "bg-slate-50 border-slate-200/70" : "bg-white/5 border-white/5")}>
                 <p className={cn("text-2xl font-bold mb-1", isLight ? "text-slate-900" : "text-white")}>14</p>
                 <p className={cn("text-[10px] font-bold uppercase tracking-widest", isLight ? "text-slate-400" : "text-white/40")}>Mocks</p>
               </div>
               <div className={cn("p-4 rounded-2xl text-center border transition-colors", isLight ? "bg-slate-50 border-slate-200/70" : "bg-white/5 border-white/5")}>
                 <p className={cn("text-2xl font-bold mb-1", isLight ? "text-slate-900" : "text-white")}>42</p>
                 <p className={cn("text-[10px] font-bold uppercase tracking-widest", isLight ? "text-slate-400" : "text-white/40")}>Lessons</p>
               </div>
               <div className={cn("p-4 rounded-2xl text-center border transition-colors", isLight ? "bg-slate-50 border-slate-200/70" : "bg-white/5 border-white/5")}>
                 <p className={cn("text-2xl font-bold mb-1", isLight ? "text-slate-900" : "text-white")}>530</p>
                 <p className={cn("text-[10px] font-bold uppercase tracking-widest", isLight ? "text-slate-400" : "text-white/40")}>PYQs</p>
               </div>
            </div>
            <div className="flex gap-4">
               <button className={cn("px-5 py-2.5 rounded-xl border font-medium text-sm transition-colors cursor-pointer", isLight ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800" : "bg-white/5 hover:bg-white/10 border-white/10 text-white")}>
                 Export Progress
               </button>
               <button className={cn("px-5 py-2.5 rounded-xl border font-medium text-sm transition-colors cursor-pointer", isLight ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800" : "bg-white/5 hover:bg-white/10 border-white/10 text-white")}>
                 Download Report
               </button>
            </div>
          </section>

          {/* SECTION 9: SUBSCRIPTION */}
          <section className={cn(
            "p-6 rounded-3xl border space-y-6 relative overflow-hidden group transition-colors",
            isLight
              ? "bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/40 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-gradient-to-br from-[#0A0C16] to-[#0A0C16] border-white/5"
          )}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
            <h2 className={cn("text-base font-bold flex items-center gap-2 border-b pb-4 relative z-10", isLight ? "text-slate-900 border-slate-100" : "text-white border-white/5")}>
              <Diamond className="w-5 h-5 text-indigo-400" /> Premium Plan
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
               <div>
                  <h3 className={cn("text-lg font-bold mb-1", isLight ? "text-slate-900" : "text-white")}>SmartPrep Pro</h3>
                  <p className={cn("text-sm", isLight ? "text-slate-500" : "text-white/50")}>Active until Dec 2027</p>
                  <ul className={cn("text-xs space-y-1 mt-3", isLight ? "text-slate-600" : "text-white/60")}>
                    <li>✓ Unlimited AI Smart Lessons</li>
                    <li>✓ Deep Performance Analytics</li>
                    <li>✓ Predicted All India Rank</li>
                  </ul>
               </div>
               <button className={cn("px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap w-full sm:w-auto text-center cursor-pointer", isLight ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md" : "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]")}>
                 Manage Subscription
               </button>
            </div>
          </section>

          {/* SECTION 10: PRIVACY & SECURITY */}
          <section className={cn(
            "p-6 rounded-3xl border space-y-4 transition-colors",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0C16] border-white/5"
          )}>
            <h2 className={cn("text-base font-bold flex items-center gap-2 border-b pb-4 mb-2", isLight ? "text-slate-900 border-slate-100" : "text-white border-white/5")}>
              <Shield className="w-5 h-5 text-emerald-500" /> Security
            </h2>
            <div className={cn("divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
              <SettingToggle label="Two Factor Authentication" enabled={false} isLight={isLight} />
              <button className="w-full flex items-center justify-between py-4 group cursor-pointer">
                 <span className={cn("text-sm font-medium transition-colors", isLight ? "text-slate-700 group-hover:text-slate-900" : "text-white/80 group-hover:text-white")}>Login History</span>
                 <ChevronRight className={cn("w-4 h-4 transition-colors", isLight ? "text-slate-400 group-hover:text-slate-600" : "text-white/30 group-hover:text-white/60")} />
              </button>
              <button className="w-full flex items-center justify-between py-4 group cursor-pointer">
                 <span className={cn("text-sm font-medium transition-colors", isLight ? "text-slate-700 group-hover:text-slate-900" : "text-white/80 group-hover:text-white")}>Active Sessions</span>
                 <ChevronRight className={cn("w-4 h-4 transition-colors", isLight ? "text-slate-400 group-hover:text-slate-600" : "text-white/30 group-hover:text-white/60")} />
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left py-4 group flex items-center justify-between transition-colors cursor-pointer"
              >
                 <span className={cn("text-sm font-medium transition-colors", isLight ? "text-slate-600 group-hover:text-slate-900" : "text-white/60 group-hover:text-white")}>Logout From All Devices</span>
                 <LogOut className={cn("w-4 h-4 transition-colors", isLight ? "text-slate-400 group-hover:text-slate-600" : "text-white/30 group-hover:text-white/60")} />
              </button>
            </div>
          </section>

          {/* SECTION 11: DANGER ZONE */}
          <section className={cn(
            "p-6 rounded-3xl border space-y-4 transition-colors",
            isLight
              ? "bg-rose-50/50 border-rose-200/80"
              : "bg-rose-500/5 border-rose-500/10"
          )}>
            <h2 className={cn("text-base font-bold flex items-center gap-2 border-b pb-4 mb-4", isLight ? "text-rose-700 border-rose-200/60" : "text-rose-400 border-rose-500/10")}>
              <AlertTriangle className="w-5 h-5" /> Account Actions
            </h2>
            <div className="space-y-4">
               <button className={cn("w-full px-5 py-3 rounded-xl border text-sm font-medium transition-colors text-left flex justify-between items-center group cursor-pointer", isLight ? "bg-white hover:bg-rose-50/60 border-slate-200 text-slate-700 hover:text-rose-700" : "bg-transparent hover:bg-rose-500/10 border-white/5 hover:border-rose-500/20 text-white/80 hover:text-white")}>
                 Reset Recommendations
                 <ChevronRight className={cn("w-4 h-4 transition-colors", isLight ? "text-slate-400 group-hover:text-slate-600" : "text-white/20 group-hover:text-white/60")} />
               </button>
               <button className={cn("w-full px-5 py-3 rounded-xl border text-sm font-medium transition-colors text-left flex justify-between items-center group cursor-pointer", isLight ? "bg-white hover:bg-rose-50/60 border-slate-200 text-slate-700 hover:text-rose-700" : "bg-transparent hover:bg-rose-500/10 border-white/5 hover:border-rose-500/20 text-white/80 hover:text-white")}>
                 Reset Study Data
                 <ChevronRight className={cn("w-4 h-4 transition-colors", isLight ? "text-slate-400 group-hover:text-slate-600" : "text-white/20 group-hover:text-white/60")} />
               </button>
               <button 
                 onClick={handleLogout}
                 className={cn("w-full px-5 py-3 rounded-xl border font-semibold text-sm transition-colors text-left flex justify-between items-center group cursor-pointer", isLight ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800" : "bg-white/5 hover:bg-white/10 border-white/10 text-white")}
               >
                 Log Out
                 <LogOut className={cn("w-4 h-4 transition-transform group-hover:translate-x-0.5", isLight ? "text-slate-500" : "text-white/60")} />
               </button>
               <button className="w-full px-5 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-500 font-bold text-sm transition-colors text-left flex justify-between items-center cursor-pointer">
                 Delete Account
                 <AlertTriangle className="w-4 h-4" />
               </button>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: Sidebar Quick Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className={cn(
            "p-6 rounded-3xl border sticky top-24 transition-colors",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0C16] border-white/5"
          )}>
            <h3 className={cn("text-sm font-bold mb-6", isLight ? "text-slate-900" : "text-white")}>Quick Overview</h3>
            
            <div className="space-y-6">
               <div>
                 <p className={cn("text-xs uppercase tracking-widest font-bold mb-1", isLight ? "text-slate-400" : "text-white/40")}>Current Exam</p>
                 <p className={cn("text-sm font-medium", isLight ? "text-slate-800" : "text-white")}>IISER IAT</p>
               </div>
               <div>
                 <p className={cn("text-xs uppercase tracking-widest font-bold mb-1", isLight ? "text-slate-400" : "text-white/40")}>Target Institute</p>
                 <p className={cn("text-sm font-medium", isLight ? "text-slate-800" : "text-white")}>IISER Pune</p>
               </div>
               <div>
                 <p className={cn("text-xs uppercase tracking-widest font-bold mb-1", isLight ? "text-slate-400" : "text-white/40")}>Days Remaining</p>
                 <p className="text-2xl font-display font-bold text-cyan-500">127</p>
               </div>
               <div>
                 <p className={cn("text-xs uppercase tracking-widest font-bold mb-1", isLight ? "text-slate-400" : "text-white/40")}>Current Level</p>
                 <p className="text-sm font-medium text-emerald-500 flex items-center gap-1.5">
                   🌱 Beginner
                 </p>
               </div>
               <div className={cn("pt-4 border-t", isLight ? "border-slate-100" : "border-white/5")}>
                 <button className={cn("w-full py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer", isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-800" : "bg-white/5 hover:bg-white/10 text-white")}>
                   Quick Edit
                 </button>
               </div>
            </div>

            <div className={cn("mt-8 pt-6 border-t space-y-3", isLight ? "border-slate-100" : "border-white/5")}>
               <button className={cn("w-full flex items-center gap-3 text-sm transition-colors cursor-pointer", isLight ? "text-slate-600 hover:text-slate-900" : "text-white/60 hover:text-white")}>
                 <HelpCircle className="w-4 h-4" /> FAQ & Support
               </button>
               <button className={cn("w-full flex items-center gap-3 text-sm transition-colors cursor-pointer", isLight ? "text-slate-600 hover:text-slate-900" : "text-white/60 hover:text-white")}>
                 <AlertTriangle className="w-4 h-4" /> Report Bug
               </button>
            </div>
          </div>
        </div>

      {/* 🔐 CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={cn(
            "w-full max-w-md p-6 rounded-3xl border relative overflow-hidden animate-in zoom-in-95 duration-300 transition-colors",
            isLight
              ? "bg-white border-slate-200 shadow-2xl"
              : "bg-[#0A0C16] border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)]"
          )}>
            <div className="absolute right-0 top-0 w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />
            <h3 className={cn("text-xl font-bold mb-6 flex items-center gap-2", isLight ? "text-slate-900" : "text-white")}>
              🔐 Change Password
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4 relative z-10">
              <div>
                <label className={cn("block text-xs font-semibold uppercase tracking-widest mb-1.5", isLight ? "text-slate-500" : "text-white/50")}>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={cn(
                    "w-full rounded-xl p-3 text-sm outline-none transition-colors",
                    isLight
                      ? "bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-500"
                      : "bg-[#05060F] border border-white/10 text-white focus:border-indigo-500/50"
                  )}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className={cn("block text-xs font-semibold uppercase tracking-widest mb-1.5", isLight ? "text-slate-500" : "text-white/50")}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={cn(
                    "w-full rounded-xl p-3 text-sm outline-none transition-colors",
                    isLight
                      ? "bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-500"
                      : "bg-[#05060F] border border-white/10 text-white focus:border-indigo-500/50"
                  )}
                  placeholder="Enter new password (min. 6 chars)"
                />
              </div>
              <div>
                <label className={cn("block text-xs font-semibold uppercase tracking-widest mb-1.5", isLight ? "text-slate-500" : "text-white/50")}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={cn(
                    "w-full rounded-xl p-3 text-sm outline-none transition-colors",
                    isLight
                      ? "bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-500"
                      : "bg-[#05060F] border border-white/10 text-white focus:border-indigo-500/50"
                  )}
                  placeholder="Confirm new password"
                />
              </div>

              {passwordError && (
                <p className="text-sm font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
                  {passwordError}
                </p>
              )}

              {passwordSuccess && (
                <p className="text-sm font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
                  {passwordSuccess}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className={cn(
                    "flex-1 py-3 rounded-xl border font-semibold text-sm transition-colors cursor-pointer",
                    isLight
                      ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingPassword}
                  className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {submittingPassword ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      </div>
      
      <Footer />
    </div>
  );
}
