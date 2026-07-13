import { Lightbulb, BrainCircuit, Zap, Trophy, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  onNavigate?: (view: string) => void;
}

const quickAccessItems = [
  {
    id: 'doubt',
    title: 'Ask a Doubt',
    subtitle: 'Instant AI Help',
    icon: Lightbulb,
    badge: null,
    badgeColor: '',
    gradient: 'from-amber-500/20 to-orange-500/5',
    iconColor: 'text-amber-400',
    borderColor: 'hover:border-amber-500/50',
    glowColor: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
  },
  {
    id: 'mindmaps',
    title: 'Mind Maps',
    subtitle: 'Visual Revision',
    icon: BrainCircuit,
    badge: 'COMING SOON',
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    gradient: 'from-emerald-500/20 to-teal-500/5',
    iconColor: 'text-emerald-400',
    borderColor: 'hover:border-emerald-500/50',
    glowColor: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  },
  {
    id: 'quickmock',
    title: 'Quick Mock',
    subtitle: '10 Qs • 15 Min',
    icon: Zap,
    badge: 'POPULAR',
    badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    gradient: 'from-purple-500/20 to-fuchsia-500/5',
    iconColor: 'text-purple-400',
    borderColor: 'hover:border-purple-500/50',
    glowColor: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  },
  {
    id: 'fullmock',
    title: 'Full Mock',
    subtitle: 'IISER IAT',
    icon: Trophy,
    badge: 'IMPORTANT',
    badgeColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    gradient: 'from-rose-500/20 to-red-500/5',
    iconColor: 'text-rose-400',
    borderColor: 'hover:border-rose-500/50',
    glowColor: 'hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]',
  },
];

export function QuickAccess({ onNavigate }: Props) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const handleClick = (id: string) => {
    if (id === 'doubt') {
      window.location.href = '/ai_tutor.html';
    } else if (id === 'quickmock' || id === 'fullmock') {
      onNavigate?.('mock_tests');
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-4">
        <h3 className="text-white/90 font-display font-semibold text-lg tracking-tight mb-1">STUDY TOOLS</h3>
        <p className="text-white/40 text-xs">Revision, Practice & Exam Simulation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {quickAccessItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              "group relative flex items-center gap-3 border rounded-[20px] p-3.5 md:p-4 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 w-full text-left cursor-pointer",
              isLight
                ? 'bg-white/65 backdrop-blur-sm border-white/80 shadow-[0_3px_16px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_6px_24px_rgba(15,23,42,0.10)]'
                : 'bg-[#0A0C16] border-white/5',
              item.borderColor,
              item.glowColor
            )}
          >
            {/* Background Gradient */}
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[-1]", item.gradient)} />
            
            <div className={cn("w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner", item.iconColor)}>
              <item.icon className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-sm font-display font-bold text-white whitespace-nowrap">{item.title}</h4>
                {item.badge && (
                  <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded border tracking-wider uppercase flex-shrink-0", item.badgeColor)}>
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] md:text-xs text-white/50 truncate">
                {item.subtitle}
              </p>
            </div>

            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white transform group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100 absolute right-4 hidden md:block" />
          </button>
        ))}
      </div>
    </div>
  );
}
