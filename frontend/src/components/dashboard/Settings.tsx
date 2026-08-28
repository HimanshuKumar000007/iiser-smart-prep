import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon,
  User,
  Palette,
  Diamond,
  HelpCircle,
  AlertTriangle,
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { currentUser } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { Footer } from '../layout/Footer';
import { useTheme, Theme } from '../../context/ThemeContext';
import { useEntitlement } from '../../hooks/useEntitlement';

interface SettingsProps {
  onNavigate?: (view: string) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const entitlement = useEntitlement();
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

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [submittingProfile, setSubmittingProfile] = useState(false);

  const handleOpenEditProfile = () => {
    setEditName(profile?.name || '');
    setProfileError('');
    setProfileSuccess('');
    setShowEditProfileModal(true);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    if (!editName || !editName.trim()) {
      setProfileError('Name cannot be empty');
      return;
    }

    if (editName.trim().length > 60) {
      setProfileError('Name must be 60 characters or less');
      return;
    }

    setSubmittingProfile(true);
    try {
      const token = localStorage.getItem('IAT_TOKEN');
      const API_BASE =
        (import.meta as any).env?.VITE_API_URL ??
        ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');
      const res = await fetch(`${API_BASE}/api/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: editName.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setProfileSuccess('Profile updated successfully!');
        const updatedName = data.user?.name || editName.trim();
        setProfile((prev: any) => ({ ...prev, name: updatedName }));
        localStorage.setItem('currentUser', updatedName);
        window.dispatchEvent(new Event('storage'));
        setTimeout(() => setShowEditProfileModal(false), 1200);
      } else {
        setProfileError(data.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      setProfileError('Network error. Please try again.');
    } finally {
      setSubmittingProfile(false);
    }
  };

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
    <div className="max-w-4xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32 lg:pb-0">
      
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

      <div className="space-y-6">
        
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
                const isPro = entitlement.isPro || profile?.plan === 'pro' || profile?.is_pro;
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
                              <Diamond className="w-3 h-3 text-indigo-400 fill-indigo-400/20" /> Premium Member
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
                 <button 
                   onClick={handleOpenEditProfile}
                   className={cn("px-4 py-2 rounded-xl font-medium text-sm transition-colors border cursor-pointer", isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200" : "bg-white/5 hover:bg-white/10 text-white border-white/10")}
                 >
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

          {/* SECTION 2: APPEARANCE */}
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
          </section>

          {/* SECTION 3: SUBSCRIPTION & MEMBERSHIP */}
          {(() => {
            const isPro = entitlement.isPro || profile?.plan === 'pro' || profile?.is_pro;
            const expiryDate = entitlement.expiresAt || profile?.plan_expiry;
            const daysLeft = entitlement.daysRemaining;

            const formatExpiry = (expiresAtStr: string | null) => {
              if (!expiresAtStr) return "Lifetime Access";
              try {
                const d = new Date(expiresAtStr);
                if (isNaN(d.getTime())) return "Active Plan";
                const dateFormatted = d.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                });
                if (daysLeft > 0 && daysLeft <= 9990) {
                  return `Active until ${dateFormatted} (${daysLeft} days remaining)`;
                }
                return `Active until ${dateFormatted}`;
              } catch {
                return "Active Plan";
              }
            };

            const getPlanTitle = (planId: string | null) => {
              const p = (planId || profile?.plan || "").toLowerCase();
              if (p.includes('annual') || p.includes('1_year') || p.includes('year')) return "SmartPrep Pro (Annual Pass)";
              if (p.includes('six') || p.includes('6_month')) return "SmartPrep Pro (6-Month Plan)";
              if (p.includes('month')) return "SmartPrep Pro (1-Month Plan)";
              return "SmartPrep Pro";
            };

            if (isPro) {
              return (
                <section className={cn(
                  "p-6 rounded-3xl border space-y-6 relative overflow-hidden group transition-colors",
                  isLight
                    ? "bg-gradient-to-br from-indigo-50/90 via-white to-cyan-50/40 border-indigo-200/80 shadow-[0_8px_30px_rgba(99,102,241,0.08)]"
                    : "bg-gradient-to-br from-[#0A0C16] to-[#0d1124] border-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.1)]"
                )}>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
                  
                  <div className={cn("flex items-center justify-between border-b pb-4 relative z-10", isLight ? "border-indigo-100" : "border-indigo-500/10")}>
                    <h2 className={cn("text-base font-bold flex items-center gap-2", isLight ? "text-indigo-950" : "text-white")}>
                      <Diamond className="w-5 h-5 text-indigo-400 fill-indigo-400/20" /> Premium Plan
                    </h2>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Pro Member
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2">
                      <h3 className={cn("text-xl font-bold tracking-tight", isLight ? "text-slate-900" : "text-white")}>
                        {getPlanTitle(entitlement.planId)}
                      </h3>
                      <p className={cn("text-sm font-semibold flex items-center gap-1.5", isLight ? "text-indigo-700" : "text-cyan-300")}>
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        {formatExpiry(expiryDate)}
                      </p>
                      <ul className={cn("text-xs space-y-1.5 pt-2", isLight ? "text-slate-600" : "text-white/70")}>
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-500 font-bold">✓</span> Unlimited AI Smart Lessons & Revision Engine
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-500 font-bold">✓</span> All 48+ Chapter-Wise & Full Length Mocks
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-500 font-bold">✓</span> Deep Performance Analytics & Predicted Rank
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
                      <div className={cn("px-5 py-3 rounded-2xl border text-center w-full sm:w-auto", isLight ? "bg-indigo-50/80 border-indigo-100 text-indigo-900" : "bg-white/5 border-white/10 text-white/90")}>
                        <p className="text-[11px] uppercase tracking-wider font-semibold opacity-70">Membership Status</p>
                        <p className="text-sm font-bold text-emerald-500 mt-0.5">Premium Unlocked</p>
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            return (
              <section className={cn(
                "p-6 rounded-3xl border space-y-6 relative overflow-hidden transition-colors",
                isLight
                  ? "bg-gradient-to-br from-slate-50 via-white to-amber-50/30 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
                  : "bg-gradient-to-br from-[#0A0C16] to-[#120f1a] border-white/10"
              )}>
                <div className={cn("flex items-center justify-between border-b pb-4 relative z-10", isLight ? "border-slate-100" : "border-white/5")}>
                  <h2 className={cn("text-base font-bold flex items-center gap-2", isLight ? "text-slate-900" : "text-white")}>
                    <Diamond className="w-5 h-5 text-amber-400" /> Premium Plan
                  </h2>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Free Plan
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2">
                    <h3 className={cn("text-xl font-bold tracking-tight", isLight ? "text-slate-900" : "text-white")}>
                      Upgrade to SmartPrep Pro
                    </h3>
                    <p className={cn("text-sm", isLight ? "text-slate-500" : "text-white/60")}>
                      Unlock all mock tests, AI tutor, deep analytics, and predicted IISER rank.
                    </p>
                    <ul className={cn("text-xs space-y-1.5 pt-2", isLight ? "text-slate-600" : "text-white/60")}>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-500 font-bold">★</span> 48+ Full Syllabus & Chapter-Wise Mock Tests
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-500 font-bold">★</span> Unlimited AI Smart Lessons & Mastery Roadmaps
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-500 font-bold">★</span> Real-time All India Rank Predictor
                      </li>
                    </ul>
                  </div>

                  <button 
                    onClick={() => onNavigate ? onNavigate('subscription') : (window.location.href = '#subscription')}
                    className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] transition-all whitespace-nowrap w-full sm:w-auto text-center cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Diamond className="w-4 h-4" />
                    Upgrade to Pro
                  </button>
                </div>
              </section>
            );
          })()}

          {/* SECTION 4: DANGER ZONE & ACCOUNT ACTIONS */}
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

      {/* 👤 EDIT PROFILE MODAL */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={cn(
            "w-full max-w-md p-6 rounded-3xl border relative overflow-hidden animate-in zoom-in-95 duration-300 transition-colors",
            isLight
              ? "bg-white border-slate-200 shadow-2xl"
              : "bg-[#0A0C16] border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)]"
          )}>
            <div className="absolute right-0 top-0 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />
            <h3 className={cn("text-xl font-bold mb-6 flex items-center gap-2", isLight ? "text-slate-900" : "text-white")}>
              👤 Edit Profile
            </h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4 relative z-10">
              <div>
                <label className={cn("block text-xs font-semibold uppercase tracking-widest mb-1.5", isLight ? "text-slate-500" : "text-white/50")}>Full Name / Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={cn(
                    "w-full rounded-xl p-3 text-sm outline-none transition-colors",
                    isLight
                      ? "bg-slate-50 border border-slate-200 text-slate-900 focus:border-cyan-500"
                      : "bg-[#05060F] border border-white/10 text-white focus:border-cyan-500/50"
                  )}
                  placeholder="Enter your name"
                  maxLength={60}
                  required
                />
              </div>

              <div>
                <label className={cn("block text-xs font-semibold uppercase tracking-widest mb-1.5", isLight ? "text-slate-500" : "text-white/50")}>Email Address</label>
                <input
                  type="email"
                  value={profile?.email || ''}
                  disabled
                  className={cn(
                    "w-full rounded-xl p-3 text-sm outline-none transition-colors cursor-not-allowed opacity-60",
                    isLight
                      ? "bg-slate-100 border border-slate-200 text-slate-600"
                      : "bg-white/5 border border-white/10 text-white/50"
                  )}
                  placeholder="Email"
                />
                <p className={cn("text-[11px] mt-1", isLight ? "text-slate-400" : "text-white/40")}>Email cannot be changed directly.</p>
              </div>

              {profileError && (
                <p className="text-sm font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
                  {profileError}
                </p>
              )}

              {profileSuccess && (
                <p className="text-sm font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
                  {profileSuccess}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
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
                  disabled={submittingProfile}
                  className="flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {submittingProfile ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
