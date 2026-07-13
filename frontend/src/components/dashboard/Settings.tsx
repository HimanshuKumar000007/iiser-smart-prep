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

function SettingToggle({ label, enabled, onChange }: { label: string, enabled: boolean, onChange?: () => void }) {
  const [isOn, setIsOn] = useState(enabled);
  
  return (
    <div className="flex items-center justify-between py-3 group">
      <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{label}</span>
      <button 
        onClick={() => {
          setIsOn(!isOn);
          onChange?.();
        }}
        className={cn(
          "w-11 h-6 rounded-full transition-colors relative",
          isOn ? "bg-cyan-500" : "bg-white/10"
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

  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = localStorage.getItem('dashboard_theme') || 'dark_premium';
    // Apply theme on initial render
    document.documentElement.setAttribute('data-theme', saved);
    return saved;
  });
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
  const handleThemeChange = (theme: string) => {
    setActiveTheme(theme);
    localStorage.setItem('dashboard_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
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
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Settings</h1>
          <p className="text-sm text-white/50">Customize your preparation experience.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* LEFT COLUMN: Main Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          


          {/* SECTION 1: PROFILE & ACCOUNT */}
          <section className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
              <User className="w-5 h-5 text-white/40" /> Profile & Account
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
                      <div className="w-full h-full rounded-full bg-[#0A0C16] flex items-center justify-center border-4 border-[#0A0C16]">
                        <span className="text-2xl font-bold text-white">{initials}</span>
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-1">
                       <h3 className="text-xl font-bold text-white">{name}</h3>
                       <p className="text-sm text-white/50">{email}</p>
                       <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white/5 text-white/70 border border-white/10">IISER IAT 2027</span>
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
                 <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/10">
                   Edit Profile
                 </button>
                  <button 
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 text-white/60 hover:text-white font-medium text-sm transition-colors"
                  >
                    Change Password
                  </button>
              </div>
            </div>
          </section>

          {/* SECTION 2: EXAM TARGETS */}
          <section className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-[#0A0C16] border border-indigo-500/20 space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
              <Target className="w-5 h-5 text-indigo-400" /> Exam Goals
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-3">Current Target Exam</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button className="p-3 rounded-xl bg-indigo-500 border border-indigo-500/50 text-white font-bold text-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]">IISER IAT</button>
                  <button className="p-3 rounded-xl bg-[#05060F] border border-white/10 text-white/70 hover:text-white font-medium text-sm hover:border-white/20 transition-all">NEST</button>
                  <button className="p-3 rounded-xl bg-[#05060F] border border-white/10 text-white/70 hover:text-white font-medium text-sm hover:border-white/20 transition-all">IISER IAT + NEST</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Target Institute</label>
                    <select className="w-full bg-[#05060F] border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-indigo-500/50 appearance-none">
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
                    <label className="block text-sm font-medium text-white/70 mb-2">Target Year</label>
                    <select className="w-full bg-[#05060F] border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-indigo-500/50 appearance-none">
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
          <section className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
              <BookOpen className="w-5 h-5 text-emerald-400" /> Study Preferences
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-3">Current Level</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm">
                    🌱 Beginner
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#05060F] border border-white/10 text-white/70 hover:text-white font-medium text-sm hover:border-white/20 transition-all">
                    🌿 Intermediate
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#05060F] border border-white/10 text-white/70 hover:text-white font-medium text-sm hover:border-white/20 transition-all">
                    🏆 Advanced
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">Preferred Subjects</label>
                    <div className="space-y-2">
                       {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map(sub => (
                         <label key={sub} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                           <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", ['Physics','Chemistry'].includes(sub) ? "bg-cyan-500 border-cyan-500" : "border-white/20 group-hover:border-white/40")}>
                             {['Physics','Chemistry'].includes(sub) && <div className="w-2 h-2 bg-black rounded-sm" />}
                           </div>
                           <span className="text-sm font-medium text-white/80">{sub}</span>
                         </label>
                       ))}
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">Weak Subjects (Focus Areas)</label>
                    <div className="space-y-2">
                       {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map(sub => (
                         <label key={sub} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                           <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", ['Mathematics', 'Biology'].includes(sub) ? "bg-rose-500 border-rose-500" : "border-white/20 group-hover:border-white/40")}>
                             {['Mathematics', 'Biology'].includes(sub) && <div className="w-2 h-2 bg-black rounded-sm" />}
                           </div>
                           <span className="text-sm font-medium text-white/80">{sub}</span>
                         </label>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: DAILY GOALS */}
          <section className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
              <Calendar className="w-5 h-5 text-amber-400" /> Daily Goals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                 <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Lessons / Day</p>
                 <div className="flex items-center justify-between">
                    <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20">-</button>
                    <span className="text-2xl font-bold text-white">2</span>
                    <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20">+</button>
                 </div>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                 <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Study Time</p>
                 <div className="flex items-center justify-between">
                    <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20">-</button>
                    <span className="text-2xl font-bold text-white flex items-baseline gap-1">2<span className="text-xs text-white/40">h</span></span>
                    <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20">+</button>
                 </div>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                 <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Mocks / Wk</p>
                 <div className="flex items-center justify-between">
                    <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20">-</button>
                    <span className="text-2xl font-bold text-white">1</span>
                    <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20">+</button>
                 </div>
               </div>
            </div>
          </section>

          {/* SECTION 5: NOTIFICATIONS */}
          <section className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4 mb-2">
              <Bell className="w-5 h-5 text-rose-400" /> Notifications
            </h2>
            <div className="divide-y divide-white/5">
              <SettingToggle label="Daily Study Reminder" enabled={true} />
              <SettingToggle label="Revision Reminder" enabled={true} />
              <SettingToggle label="Mock Test Reminder" enabled={true} />
              <SettingToggle label="Weekly Progress Report" enabled={false} />
              <SettingToggle label="Exam Countdown Alerts" enabled={true} />
            </div>
          </section>

          {/* SECTION 6: AI PERSONALIZATION */}
          <section className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/5 to-[#0A0C16] border border-purple-500/20 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4 mb-2">
              <Bot className="w-5 h-5 text-purple-400" /> AI Preferences
            </h2>
            <div className="divide-y divide-white/5">
              <SettingToggle label="Enable Smart Recommendations" enabled={true} />
              <SettingToggle label="Enable Weak Area Detection" enabled={true} />
              <SettingToggle label="Enable Daily Study Plans" enabled={true} />
              <SettingToggle label="Enable AI Revision Queue" enabled={true} />
              <SettingToggle label="Enable Personalized Insights" enabled={true} />
            </div>
          </section>

          {/* SECTION 7: APPEARANCE */}
          <section className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
              <Palette className="w-5 h-5 text-fuchsia-400" /> Appearance
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-3">Themes</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                 <button 
                  onClick={() => handleThemeChange('dark_premium')}
                  className={cn("p-4 rounded-xl border-2 flex flex-col items-center gap-2 group transition-all", activeTheme === 'dark_premium' ? "border-cyan-500 bg-[#0A0C16] text-white" : "border-transparent hover:border-white/10 bg-[#05060F] text-white/50 hover:text-white")}
                 >
                   <div className="w-8 h-8 rounded-full bg-[#0A0C16] border border-white/20" />
                   <span className={cn("text-xs", activeTheme === 'dark_premium' ? "font-bold" : "font-medium")}>Dark Premium</span>
                 </button>
                 <button 
                  onClick={() => handleThemeChange('midnight')}
                  className={cn("p-4 rounded-xl border-2 flex flex-col items-center gap-2 group transition-all", activeTheme === 'midnight' ? "border-cyan-500 bg-[#0A0C16] text-white" : "border-transparent hover:border-white/10 bg-[#05060F] text-white/50 hover:text-white")}
                 >
                   <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10" />
                   <span className={cn("text-xs", activeTheme === 'midnight' ? "font-bold" : "font-medium")}>Midnight</span>
                 </button>
                 <button 
                  onClick={() => handleThemeChange('ocean_cyan')}
                  className={cn("p-4 rounded-xl border-2 flex flex-col items-center gap-2 group transition-all", activeTheme === 'ocean_cyan' ? "border-cyan-500 bg-[#0A0C16] text-white" : "border-transparent hover:border-white/10 bg-[#05060F] text-white/50 hover:text-white")}
                 >
                   <div className="w-8 h-8 rounded-full bg-[#0A192F] border border-white/10" />
                   <span className={cn("text-xs", activeTheme === 'ocean_cyan' ? "font-bold" : "font-medium")}>Ocean Cyan</span>
                 </button>
                 <button 
                  onClick={() => handleThemeChange('light_homepage')}
                  className={cn("p-4 rounded-xl border-2 flex flex-col items-center gap-2 group transition-all", activeTheme === 'light_homepage' ? "border-cyan-500 bg-[#0A0C16] text-white" : "border-transparent hover:border-white/10 bg-[#05060F] text-white/50 hover:text-white")}
                 >
                   <div className="w-8 h-8 rounded-full bg-[#eef4fb] border border-slate-300" />
                   <span className={cn("text-xs", activeTheme === 'light_homepage' ? "font-bold" : "font-medium")}>Homepage Classic</span>
                 </button>
                 <button 
                  onClick={() => handleThemeChange('system')}
                  className={cn("p-4 rounded-xl border-2 flex flex-col items-center gap-2 group transition-all", activeTheme === 'system' ? "border-cyan-500 bg-[#0A0C16] text-white" : "border-transparent hover:border-white/10 bg-[#05060F] text-white/50 hover:text-white")}
                 >
                   <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-900 to-white/20 border border-white/10" />
                   <span className={cn("text-xs", activeTheme === 'system' ? "font-bold" : "font-medium")}>System</span>
                 </button>
              </div>
            </div>

            <div className="divide-y divide-white/5 pt-2">
              <SettingToggle label="Animations & Transitions" enabled={true} />
              <SettingToggle label="Reduced Motion" enabled={false} />
              <SettingToggle label="Compact Mode" enabled={false} />
            </div>
          </section>

          {/* SECTION 8: DATA & PROGRESS */}
          <section className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
              <Database className="w-5 h-5 text-blue-400" /> Study Data
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               <div className="p-4 rounded-2xl bg-white/5 text-center">
                 <p className="text-2xl font-bold text-white mb-1">1,248</p>
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Questions</p>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 text-center">
                 <p className="text-2xl font-bold text-white mb-1">14</p>
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Mocks</p>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 text-center">
                 <p className="text-2xl font-bold text-white mb-1">42</p>
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Lessons</p>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 text-center">
                 <p className="text-2xl font-bold text-white mb-1">530</p>
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">PYQs</p>
               </div>
            </div>
            <div className="flex gap-4">
               <button className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-colors">
                 Export Progress
               </button>
               <button className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-colors">
                 Download Report
               </button>
            </div>
          </section>

          {/* SECTION 9: SUBSCRIPTION */}
          <section className="p-6 rounded-3xl bg-gradient-to-br from-[#0A0C16] to-[#0A0C16] border border-white/5 space-y-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4 relative z-10">
              <Diamond className="w-5 h-5 text-indigo-400" /> Premium Plan
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
               <div>
                  <h3 className="text-lg font-bold text-white mb-1">SmartPrep Pro</h3>
                  <p className="text-sm text-white/50">Active until Dec 2027</p>
                  <ul className="text-xs text-white/60 space-y-1 mt-3">
                    <li>✓ Unlimited AI Smart Lessons</li>
                    <li>✓ Deep Performance Analytics</li>
                    <li>✓ Predicted All India Rank</li>
                  </ul>
               </div>
               <button className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] whitespace-nowrap w-full sm:w-auto text-center">
                 Manage Subscription
               </button>
            </div>
          </section>

          {/* SECTION 10: PRIVACY & SECURITY */}
          <section className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4 mb-2">
              <Shield className="w-5 h-5 text-emerald-500" /> Security
            </h2>
            <div className="divide-y divide-white/5">
              <SettingToggle label="Two Factor Authentication" enabled={false} />
              <button className="w-full flex items-center justify-between py-4 group">
                 <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">Login History</span>
                 <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
              </button>
              <button className="w-full flex items-center justify-between py-4 group">
                 <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">Active Sessions</span>
                 <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left py-4 group flex items-center justify-between hover:text-white transition-colors"
              >
                 <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">Logout From All Devices</span>
                 <LogOut className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
              </button>
            </div>
          </section>

          {/* SECTION 11: DANGER ZONE */}
          <section className="p-6 rounded-3xl bg-rose-500/5 border border-rose-500/10 space-y-4">
            <h2 className="text-base font-bold text-rose-400 flex items-center gap-2 border-b border-rose-500/10 pb-4 mb-4">
              <AlertTriangle className="w-5 h-5" /> Account Actions
            </h2>
            <div className="space-y-4">
               <button className="w-full px-5 py-3 rounded-xl bg-transparent hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/20 text-white/80 hover:text-white text-sm font-medium transition-colors text-left flex justify-between items-center group">
                 Reset Recommendations
                 <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
               </button>
               <button className="w-full px-5 py-3 rounded-xl bg-transparent hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/20 text-white/80 hover:text-white text-sm font-medium transition-colors text-left flex justify-between items-center group">
                 Reset Study Data
                 <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
               </button>
               <button 
                 onClick={handleLogout}
                 className="w-full px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors text-left flex justify-between items-center group"
               >
                 Log Out
                 <LogOut className="w-4 h-4 text-white/60 group-hover:translate-x-0.5 transition-transform" />
               </button>
               <button className="w-full px-5 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-bold text-sm transition-colors text-left flex justify-between items-center">
                 Delete Account
                 <AlertTriangle className="w-4 h-4" />
               </button>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: Sidebar Quick Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 sticky top-24">
            <h3 className="text-sm font-bold text-white mb-6">Quick Overview</h3>
            
            <div className="space-y-6">
               <div>
                 <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Current Exam</p>
                 <p className="text-sm font-medium text-white">IISER IAT</p>
               </div>
               <div>
                 <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Target Institute</p>
                 <p className="text-sm font-medium text-white">IISER Pune</p>
               </div>
               <div>
                 <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Days Remaining</p>
                 <p className="text-2xl font-display font-bold text-cyan-400">127</p>
               </div>
               <div>
                 <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Current Level</p>
                 <p className="text-sm font-medium text-emerald-400 flex items-center gap-1.5">
                   🌱 Beginner
                 </p>
               </div>
               <div className="pt-4 border-t border-white/5">
                 <button className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
                   Quick Edit
                 </button>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
               <button className="w-full flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                 <HelpCircle className="w-4 h-4" /> FAQ & Support
               </button>
               <button className="w-full flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                 <AlertTriangle className="w-4 h-4" /> Report Bug
               </button>
            </div>
          </div>
        </div>

      {/* 🔐 CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#0A0C16] border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)] relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute right-0 top-0 w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              🔐 Change Password
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4 relative z-10">
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-1.5">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-[#05060F] border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-indigo-500/50"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-1.5">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#05060F] border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-indigo-500/50"
                  placeholder="Enter new password (min. 6 chars)"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#05060F] border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-indigo-500/50"
                  placeholder="Confirm new password"
                />
              </div>

              {passwordError && (
                <p className="text-sm font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
                  {passwordError}
                </p>
              )}

              {passwordSuccess && (
                <p className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
                  {passwordSuccess}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingPassword}
                  className="flex-1 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-colors shadow-[0_0_15px_rgba(99,102,241,0.2)] disabled:opacity-50"
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
