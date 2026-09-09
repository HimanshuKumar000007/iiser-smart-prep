import { useState, useEffect, useRef, memo } from 'react';
import { 
  Sparkles, 
  Send, 
  ArrowLeft, 
  Trash2, 
  Copy, 
  Check, 
  Plus,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  Brain,
  ArrowUp,
  ArrowRight,
  ChevronDown,
  Zap,
  BookOpen,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Target
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { DashboardData } from '../../hooks/useDashboardData';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type SubjectFocus = 'ALL' | 'PHYSICS' | 'CHEMISTRY' | 'MATHEMATICS' | 'BIOLOGY';

interface QuickStarter {
  icon: typeof Atom;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  glowColor: string;
  iconBg: string;
  iconColor: string;
  starterText: string;
  subject: SubjectFocus;
}

const QUICK_STARTERS: QuickStarter[] = [
  {
    icon: Atom,
    tag: "PHYSICS • DERIVATIONS",
    tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    glowColor: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]",
    iconBg: "bg-cyan-500/15 border border-cyan-500/30",
    iconColor: "text-cyan-400",
    title: "Solve a Physics numerical with derivations",
    subtitle: "Lenz's Law, EM Induction, Rotational dynamics with step-by-step calculus",
    starterText: "Solve this Physics numerical with step-by-step derivations: ",
    subject: 'PHYSICS'
  },
  {
    icon: FlaskConical,
    tag: "CHEMISTRY • MECHANISMS",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    glowColor: "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.18)]",
    iconBg: "bg-amber-500/15 border border-amber-500/30",
    iconColor: "text-amber-400",
    title: "Explain organic or inorganic mechanisms",
    subtitle: "SN1 vs SN2, carbocation stability, stereochemistry inversion & IAT traps",
    starterText: "Explain the reaction mechanism step-by-step for: ",
    subject: 'CHEMISTRY'
  },
  {
    icon: Calculator,
    tag: "MATHEMATICS • 3D & CALCULUS",
    tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    glowColor: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]",
    iconBg: "bg-purple-500/15 border border-purple-500/30",
    iconColor: "text-purple-400",
    title: "Derive 3D geometry or integration formulas",
    subtitle: "Shortest distance between skew lines, vector planes & tricky definite integrals",
    starterText: "Derive the mathematical formula step-by-step for: ",
    subject: 'MATHEMATICS'
  },
  {
    icon: Dna,
    tag: "BIOLOGY • GENETICS & ENERGETICS",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    glowColor: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]",
    iconBg: "bg-emerald-500/15 border border-emerald-500/30",
    iconColor: "text-emerald-400",
    title: "Genetics & bioenergetics problem solving",
    subtitle: "Hardy-Weinberg equilibrium (p, q vs p², 2pq), Krebs cycle & ATP yields",
    starterText: "Explain and solve this genetics / bioenergetics problem: ",
    subject: 'BIOLOGY'
  }
];

const SUBJECT_OPTIONS = [
  { key: 'ALL' as SubjectFocus, label: 'All PCMB', shortLabel: 'All PCMB', icon: Sparkles, color: 'text-cyan-400' },
  { key: 'PHYSICS' as SubjectFocus, label: 'Physics', shortLabel: 'Physics', icon: Atom, color: 'text-indigo-400' },
  { key: 'CHEMISTRY' as SubjectFocus, label: 'Chemistry', shortLabel: 'Chem', icon: FlaskConical, color: 'text-cyan-400' },
  { key: 'MATHEMATICS' as SubjectFocus, label: 'Mathematics', shortLabel: 'Math', icon: Calculator, color: 'text-amber-400' },
  { key: 'BIOLOGY' as SubjectFocus, label: 'Biology', shortLabel: 'Bio', icon: Dna, color: 'text-emerald-400' },
];

// ── Safe math cleaning utility ───────────────────────────────────────
function cleanMath(raw: string): string {
  if (!raw) return '';
  let m = raw.trim();

  // Strip accidental outer math delimiters if nested
  m = m.replace(/^(\\\[|\\\(|\$\$|\$)+/, '');
  m = m.replace(/(\\\]|\\\)|\$\$|\$)+$/, '');
  m = m.trim();

  // Fix common LLM LaTeX glitches:
  // 1. Replace "\\ \\ " or "\\ \\" with just "\\" (stray backslash between line breaks)
  m = m.replace(/\\\\\s*\\\s+/g, '\\\\ ');

  // 2. Remove any dangling trailing backslash (odd number of trailing backslashes)
  while (/(^|[^\\])(\\\\)*\\$/.test(m)) {
    m = m.slice(0, -1).trim();
  }
  return m;
}

// ── Content preprocessor for robust Markdown & LaTeX rendering ───────
function preprocessContent(content: string): string {
  if (!content) return '';
  let s = content;

  // 1. Normalize multi-escaped delimiters:
  // e.g. "\\[" -> "\[", "\\]" -> "\]", "\\(" -> "\(", "\\)" -> "\)"
  s = s.replace(/\\+(\[|\]|\(|\))/g, '\\$1');

  // 2. Remove isolated stray backslash lines (e.g. lines that are just "\" or "\\ ")
  s = s.replace(/(^|\n)[ \t]*\\+[ \t]*(\n|$)/g, '$1$2');

  // 3. For raw matrix / equation environments not already inside \[ or $$, wrap them in display math
  if (!s.includes('\\[') && !s.includes('$$')) {
    s = s.replace(/(\\begin\{(?:vmatrix|pmatrix|bmatrix|matrix|align|equation)\*?\}[\s\S]*?\\end\{(?:vmatrix|pmatrix|bmatrix|matrix|align|equation)\*?\}(?:\s*=[^$\n]+)?)/g, '\n\n\\[\n$1\n\\]\n\n');
  }

  return s;
}

// ── Safe KaTeX math token renderer ───────────────────────────────────
const MathToken = memo(function MathToken({ math, display = false }: { math: string; display?: boolean }) {
  const cleaned = cleanMath(math);
  if (!cleaned) return null;

  try {
    const html = katex.renderToString(cleaned, {
      displayMode: display,
      throwOnError: false,
      trust: true,
      strict: false,
    });
    return (
      <span
        dangerouslySetInnerHTML={{ __html: html }}
        className={cn(
          "font-serif text-cyan-200 selection:bg-cyan-500/30",
          display 
            ? "block my-3 py-2.5 px-4 rounded-xl bg-cyan-950/25 border border-cyan-500/20 overflow-x-auto text-center shadow-inner" 
            : "inline-block px-1 font-medium"
        )}
      />
    );
  } catch {
    return (
      <span className="font-mono text-cyan-300 text-xs px-1 bg-cyan-950/40 rounded">
        {cleaned}
      </span>
    );
  }
});

// ── Code block with Copy button ──────────────────────────────────────
function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-white/10 bg-[#080b18] shadow-lg">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-white/[0.04] border-b border-white/[0.08] text-[11px] font-mono text-white/60">
        <span>{lang || 'code'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy code'}</span>
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto text-xs font-mono text-cyan-200/90 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Markdown Table renderer ──────────────────────────────────────────
function TableBlock({ rows }: { rows: string[] }) {
  if (rows.length === 0) return null;

  const isDivider = (r: string) => /^\|[\s\-:|]+\|$/.test(r.trim());
  const dataRows = rows.filter(r => !isDivider(r));
  if (dataRows.length === 0) return null;

  const headerCells = dataRows[0].split('|').map(c => c.trim()).filter(Boolean);
  const bodyRows = dataRows.slice(1).map(r => r.split('|').map(c => c.trim()).filter(Boolean));

  return (
    <div className="my-3 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
      <table className="w-full text-xs text-left border-collapse">
        {headerCells.length > 0 && (
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.05]">
              {headerCells.map((h, i) => (
                <th key={i} className="py-2.5 px-3 font-semibold text-white">
                  {renderInline(h, `th-${i}`)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-white/5">
          {bodyRows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="py-2 px-3 text-white/80">
                  {renderInline(cell, `td-${rIdx}-${cIdx}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Recursive inline parser for Math & Markdown ──────────────────────
function renderInline(text: string, keyPrefix = ''): React.ReactNode[] {
  if (!text) return [];

  // Matches display math, inline math \(...\) or $...$, bold **...**, inline code `...`, italic *...*
  const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$[^\$\n]+?\$|\*\*[^*]+?\*\*|`[^`\n]+?`|\*[^*]+?\*)/g;
  const parts = text.split(regex);

  return parts.filter(Boolean).map((part, idx) => {
    const key = `${keyPrefix}-${idx}`;

    // Display math
    if ((part.startsWith('$$') && part.endsWith('$$')) || (part.startsWith('\\[') && part.endsWith('\\]'))) {
      const math = cleanMath(part.slice(2, -2));
      return <MathToken key={key} math={math} display={true} />;
    }

    // Inline math: \(...\) or $...$
    if (part.startsWith('\\(') && part.endsWith('\\)')) {
      const math = cleanMath(part.slice(2, -2));
      return <MathToken key={key} math={math} display={false} />;
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      const math = cleanMath(part.slice(1, -1));
      return <MathToken key={key} math={math} display={false} />;
    }

    // Bold
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return (
        <strong key={key} className="font-bold text-white">
          {renderInline(inner, `${key}-b`)}
        </strong>
      );
    }

    // Inline code
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={key} className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-mono text-[0.88em] border border-white/5">
          {part.slice(1, -1)}
        </code>
      );
    }

    // Italic
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={key} className="italic text-white/90">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Plain text
    return <span key={key}>{part}</span>;
  });
}

// ── Multi-type Markdown & Math Content Formatter ─────────────────────
export const FormattedAnswer = memo(function FormattedAnswer({ content }: { content: string }) {
  if (!content) return null;

  const sanitizedContent = preprocessContent(content);

  // Split into code blocks, multiline display math, and normal lines
  const blockRegex = /(```[\s\S]*?```|\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\])/g;
  const rawBlocks = sanitizedContent.split(blockRegex);

  const elements: React.ReactNode[] = [];
  let blockCounter = 0;

  rawBlocks.forEach((block) => {
    if (!block) return;

    // A. Code Block
    if (block.startsWith('```') && block.endsWith('```')) {
      const lines = block.slice(3, -3).split('\n');
      const lang = lines[0].trim();
      const code = (lang ? lines.slice(1) : lines).join('\n').trim();
      elements.push(<CodeBlock key={`cb-${blockCounter++}`} code={code} lang={lang} />);
      return;
    }

    // B. Display Math
    if ((block.startsWith('$$') && block.endsWith('$$')) || (block.startsWith('\\[') && block.endsWith('\\]'))) {
      const math = cleanMath(block.slice(2, -2));
      elements.push(<MathToken key={`dm-${blockCounter++}`} math={math} display={true} />);
      return;
    }

    // C. Line-by-line block evaluation
    const lines = block.split('\n');
    let inTable = false;
    let tableRows: string[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Collect Table Rows
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        inTable = true;
        tableRows.push(trimmed);
        return;
      } else if (inTable) {
        elements.push(<TableBlock key={`tb-${blockCounter++}`} rows={[...tableRows]} />);
        inTable = false;
        tableRows = [];
      }

      if (!trimmed) {
        elements.push(<div key={`sp-${blockCounter++}`} className="h-1.5" />);
        return;
      }

      // Horizontal Divider: ---, ***, ___
      if (/^(\-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
        elements.push(<div key={`div-${blockCounter++}`} className="my-3.5 border-t border-white/10" />);
        return;
      }

      // Headings
      if (trimmed.startsWith('#### ')) {
        elements.push(
          <h5 key={`h4-${blockCounter++}`} className="text-xs sm:text-sm font-semibold text-cyan-300/90 mt-3 mb-1">
            {renderInline(trimmed.slice(5), `h4-${blockCounter}`)}
          </h5>
        );
        return;
      }
      if (trimmed.startsWith('### ')) {
        elements.push(
          <h4 key={`h3-${blockCounter++}`} className="text-sm sm:text-base font-bold text-white mt-4 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            {renderInline(trimmed.slice(4), `h3-${blockCounter}`)}
          </h4>
        );
        return;
      }
      if (trimmed.startsWith('## ')) {
        elements.push(
          <h3 key={`h2-${blockCounter++}`} className="text-base sm:text-lg font-bold text-white mt-4.5 mb-2 text-cyan-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            {renderInline(trimmed.slice(3), `h2-${blockCounter}`)}
          </h3>
        );
        return;
      }
      if (trimmed.startsWith('# ')) {
        elements.push(
          <h2 key={`h1-${blockCounter++}`} className="text-lg sm:text-xl font-bold text-white mt-5 mb-2.5 text-cyan-100">
            {renderInline(trimmed.slice(2), `h1-${blockCounter}`)}
          </h2>
        );
        return;
      }

      // MCQ Option formatting: (A), (B), (C), (D) or A), B), C), D)
      const optionMatch = trimmed.match(/^(\([A-D]\)|[A-D]\))\s*(.*)/i);
      if (optionMatch) {
        const letter = optionMatch[1].replace(/[\(\)]/g, '').toUpperCase();
        elements.push(
          <div 
            key={`opt-${blockCounter++}`}
            className="flex items-start gap-3 p-2.5 my-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all group"
          >
            <span className="w-6 h-6 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
              {letter}
            </span>
            <div className="flex-1 text-sm text-white/90 leading-relaxed pt-0.5">
              {renderInline(optionMatch[2], `opt-t-${blockCounter}`)}
            </div>
          </div>
        );
        return;
      }

      // Standout Answer Box: **Answer:** (B) or Answer: (B)
      const answerMatch = trimmed.match(/^(\*\*Answer:\*\*|Answer:)\s*(.*)/i);
      if (answerMatch) {
        elements.push(
          <div 
            key={`ans-${blockCounter++}`}
            className="my-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-sm font-semibold text-white">
              <span className="text-emerald-300 font-bold mr-1.5">Answer:</span>
              {renderInline(answerMatch[2].trim(), `ans-t-${blockCounter}`)}
            </div>
          </div>
        );
        return;
      }

      // Standout Question / Options / Explanation headers
      if (/^\*\*(Question|Options|Explanation):\*\*/i.test(trimmed)) {
        elements.push(
          <div key={`sec-${blockCounter++}`} className="font-bold text-xs sm:text-sm text-cyan-300 uppercase tracking-wider mt-3 mb-1">
            {renderInline(trimmed, `sec-t-${blockCounter}`)}
          </div>
        );
        return;
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        elements.push(
          <div key={`bq-${blockCounter++}`} className="my-2 pl-3 py-1 border-l-2 border-cyan-400/60 bg-cyan-500/[0.04] rounded-r-lg text-xs sm:text-sm text-cyan-100 italic">
            {renderInline(trimmed.slice(2), `bq-t-${blockCounter}`)}
          </div>
        );
        return;
      }

      // Bullet list item: •, -, *
      if (/^(\-|\*|•)\s+/.test(trimmed)) {
        elements.push(
          <div key={`bl-${blockCounter++}`} className="flex items-start gap-2.5 pl-2 my-1 text-sm sm:text-[15px] leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/90 mt-2 shrink-0 select-none shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
            <span className="flex-1 text-white/90">
              {renderInline(trimmed.replace(/^(\-|\*|•)\s+/, ''), `bl-t-${blockCounter}`)}
            </span>
          </div>
        );
        return;
      }

      // Numbered list item: 1. , 2. 
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        elements.push(
          <div key={`nl-${blockCounter++}`} className="flex items-start gap-2.5 pl-2 my-1 text-sm sm:text-[15px] leading-relaxed">
            <span className="w-5 h-5 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 select-none">
              {numMatch[1]}
            </span>
            <span className="flex-1 text-white/90">
              {renderInline(numMatch[2], `nl-t-${blockCounter}`)}
            </span>
          </div>
        );
        return;
      }

      // Normal paragraph
      if (trimmed === '\\' || trimmed === '\\\\' || trimmed === '\\\\\\') {
        return;
      }
      elements.push(
        <p key={`p-${blockCounter++}`} className="my-1 text-sm sm:text-[15px] leading-relaxed text-white/90">
          {renderInline(line, `p-t-${blockCounter}`)}
        </p>
      );
    });

    if (inTable && tableRows.length > 0) {
      elements.push(<TableBlock key={`tb-${blockCounter++}`} rows={[...tableRows]} />);
    }
  });

  return (
    <div className="space-y-1 text-sm sm:text-[15px] leading-relaxed font-sans select-text">
      {elements}
    </div>
  );
});

export function AiTutorHub({ 
  onNavigate,
  dashboardData 
}: { 
  onNavigate?: (view: string) => void;
  dashboardData?: DashboardData | null;
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = sessionStorage.getItem('smartprep_active_chat');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [deepThink, setDeepThink] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState<SubjectFocus>('ALL');
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasAutoExecutedRef = useRef<boolean>(false);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    try {
      sessionStorage.setItem('smartprep_active_chat', JSON.stringify(messages));
    } catch {}
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleStarterClick = (item: QuickStarter) => {
    setInputVal(item.starterText);
    if (item.subject) {
      setSubjectFilter(item.subject);
    }
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const len = item.starterText.length;
        inputRef.current.setSelectionRange(len, len);
      }
    }, 50);
  };

  const executeStreamForMessages = async (baseMsgs: Message[]) => {
    if (isLoading || baseMsgs.length === 0) return;
    setIsLoading(true);

    // If the last message is already an assistant placeholder with empty content, use it;
    // otherwise append a new assistant placeholder for streaming.
    const lastIsAssistant = baseMsgs[baseMsgs.length - 1].role === 'assistant';
    const msgsWithPlaceholder: Message[] = lastIsAssistant
      ? baseMsgs
      : [...baseMsgs, { role: 'assistant', content: '' }];

    setMessages(msgsWithPlaceholder);

    // Filter out trailing empty assistant placeholder for the request payload
    const payloadMsgs = msgsWithPlaceholder.filter((m, idx) => 
      !(m.role === 'assistant' && idx === msgsWithPlaceholder.length - 1 && !m.content)
    );

    const messagesPayload = payloadMsgs.map((m, idx) => {
      if (m.role === 'user' && idx === payloadMsgs.length - 1 && subjectFilter !== 'ALL') {
        return {
          role: m.role,
          content: `[Subject: ${subjectFilter}] ${m.content}`
        };
      }
      return { role: m.role, content: m.content };
    });

    // Dynamically calculate days left until 7 June 2027
    const calculateDaysUntilExam = () => {
      const EXAM_DATE = new Date('2027-06-07T00:00:00');
      const today = new Date();
      const diffTime = EXAM_DATE.getTime() - today.getTime();
      return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    };

    const userContext = dashboardData ? {
      studentName: dashboardData.displayName || "Student",
      overallAccuracy: Math.round(dashboardData.accuracy || 0),
      totalAttempts: dashboardData.total_attempts || 0,
      streakDays: dashboardData.streak_days || 0,
      overallReadiness: Math.round(dashboardData.overallReadiness || 0),
      level: dashboardData.level || "Intermediate",
      subjectPerformance: dashboardData.subjectMap || {},
      weakAreas: dashboardData.weakAreas?.map(w => `${w.chapter || w.subject} (${Math.round(w.accuracy)}% accuracy)`),
      completedLessons: dashboardData.completed_lessons || [],
      daysLeft: calculateDaysUntilExam()
    } : undefined;

    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL ?? 'https://api.iisersmartprep.space';
      const res = await fetch(`${apiUrl}/api/ai-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: messagesPayload,
          userContext 
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Error ${res.status}`);
      }

      if (!res.body) throw new Error('No stream available');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let streamed = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;
          if (trimmed.startsWith('data: ')) {
            try {
              const data = JSON.parse(trimmed.slice(6));
              const delta = data.choices?.[0]?.delta?.content || '';
              if (delta) {
                streamed += delta;
                setMessages(prev => {
                  const arr = [...prev];
                  arr[arr.length - 1] = { role: 'assistant', content: streamed };
                  return arr;
                });
              }
            } catch {}
          }
        }
      }
    } catch (err: any) {
      setMessages(prev => {
        const arr = [...prev];
        arr[arr.length - 1] = {
          role: 'assistant',
          content: `⚠️ **Error**: ${err.message || 'Unable to connect to AI tutor. Please check your connection and retry.'}`
        };
        return arr;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (customQuery?: string) => {
    const q = (customQuery || inputVal).trim();
    if (!q || isLoading) return;

    const newMsgs: Message[] = [...messages, { role: 'user', content: q }];
    setInputVal('');
    executeStreamForMessages(newMsgs);
  };

  // Auto-execute pending prompt or unfinished user query on mount
  useEffect(() => {
    if (hasAutoExecutedRef.current) return;
    hasAutoExecutedRef.current = true;

    // Check 1: Explicit pending prompt passed via sessionStorage
    try {
      const pendingPrompt = sessionStorage.getItem('smartprep_pending_prompt');
      if (pendingPrompt && pendingPrompt.trim()) {
        sessionStorage.removeItem('smartprep_pending_prompt');
        const query = pendingPrompt.trim();
        // If messages already ends with this exact unanswered user message, stream directly for messages
        if (messages.length > 0 && messages[messages.length - 1].role === 'user' && messages[messages.length - 1].content === query) {
          executeStreamForMessages(messages);
        } else {
          executeStreamForMessages([...messages, { role: 'user', content: query }]);
        }
        return;
      }
    } catch {}

    // Check 2: If the restored messages array ends with an unanswered user message
    // (e.g. user navigated from "My Path", or page refreshed while prompt was awaiting reply)
    if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
      executeStreamForMessages(messages);
    }
  }, []);

  const handleClearChat = () => {
    setMessages([]);
    try {
      sessionStorage.removeItem('smartprep_active_chat');
    } catch {}
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const activeSubjectOption = SUBJECT_OPTIONS.find(s => s.key === subjectFilter) || SUBJECT_OPTIONS[0];
  const ActiveSubjectIcon = activeSubjectOption.icon;

  return (
    <div className={cn(
      "w-full h-full flex flex-col relative overflow-hidden select-none transition-colors duration-200",
      isLight ? "bg-[#f8fafc] text-slate-900" : "bg-[#060814] text-white"
    )}>
      
      {/* ── AMBIENT CYBER-SPACE GLOWS (Matching SmartPrep App Atmosphere) ── */}
      {!isLight && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-indigo-600/12 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute top-24 right-[-100px] w-[450px] h-[350px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-10 left-[-100px] w-[500px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />
        </>
      )}

      {/* ── TOP APP HEADER (Desktop Only — Mobile is handled seamlessly by App.tsx) ── */}
      <header className={cn(
        "hidden lg:flex h-16 px-6 items-center justify-between relative z-30 shrink-0 border-b transition-colors",
        isLight ? "bg-white/80 border-slate-200/80 backdrop-blur-md" : "bg-[#080b1a]/85 border-white/[0.07] backdrop-blur-xl"
      )}>
        {/* Left: Back to Dashboard & Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate?.('dashboard')}
            className={cn(
              "px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border",
              isLight 
                ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200" 
                : "bg-white/[0.04] border-white/10 hover:border-cyan-500/40 text-white/70 hover:text-white"
            )}
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          {/* AI Tutor Title & Badge */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white hidden sm:inline">
                SmartPrep AI Tutor
              </span>
              <span className="border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[9px] font-bold px-1.5 py-0.5 rounded">
                IAT 2027
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Status & Performance Synced Indicator */}
        <div className="hidden md:flex items-center gap-2.5">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full text-xs shadow-sm border",
            isLight 
              ? "bg-slate-100/90 border-slate-200 text-slate-700" 
              : "bg-[#0e1330]/80 border-indigo-500/20 text-white/80"
          )}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className={cn("text-[11px] font-semibold", isLight ? "text-emerald-700" : "text-emerald-300")}>Live AI Active</span>
            <span className={isLight ? "text-slate-300" : "text-white/20"}>•</span>
            <span className={cn("text-[10px] font-mono", isLight ? "text-purple-700" : "text-purple-300")}>NVIDIA NIM</span>
          </div>

          {dashboardData && (
            <div 
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all",
                isLight 
                  ? "bg-cyan-50 border-cyan-200 text-cyan-800 shadow-sm" 
                  : "bg-cyan-950/40 border-cyan-500/30 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
              )}
              title={`Real-time stats synced with AI tutor: ${Math.round(dashboardData.accuracy || 0)}% overall accuracy across ${dashboardData.total_attempts || 0} questions attempted.`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className={isLight ? "text-slate-600 font-normal" : "text-white/60 font-normal"}>Stats Synced:</span>
              <span className={cn("font-bold", isLight ? "text-cyan-900" : "text-white")}>{Math.round(dashboardData.accuracy || 0)}% Acc</span>
              <span className={isLight ? "text-slate-300" : "text-white/20"}>•</span>
              <span className="font-bold text-cyan-400">{dashboardData.total_attempts || 0} Qs</span>
              {dashboardData.weakAreas?.[0] && (
                <>
                  <span className={isLight ? "text-slate-300" : "text-white/20 hidden xl:inline"}>•</span>
                  <span className="text-amber-400 font-medium hidden xl:inline">Focus: {dashboardData.weakAreas[0].subject}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border",
                isLight 
                  ? "bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-slate-200" 
                  : "bg-white/[0.04] border-white/10 hover:border-rose-500/30 text-white/60 hover:text-rose-400"
              )}
              title="Start a new chat"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>New Session</span>
            </button>
          )}
        </div>
      </header>

      {/* ── WORKSPACE CONTAINER (Scrollable on phone with bottom padding for MobileNav) ── */}
      <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar relative z-10">

        {/* ── 1. EMPTY / WELCOME STATE ── */}
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-start sm:justify-center px-3.5 sm:px-4 max-w-3xl mx-auto w-full pt-3 sm:pt-6 pb-28 sm:pb-8">
            
            {/* Jewel Icon & Title */}
            <div className="text-center mb-4 sm:mb-7 space-y-2 sm:space-y-3">
              <div className="inline-flex items-center justify-center relative mb-0.5 sm:mb-1">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-white/20">
                  <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#0b0e24] border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-md">
                  <Atom className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>

              <h1 className="text-xl sm:text-4xl font-bold tracking-tight text-white">
                Where should we begin?
              </h1>
              <p className="text-[11.5px] sm:text-sm text-white/60 max-w-xs sm:max-w-md mx-auto leading-relaxed">
                Step-by-step numerical derivations, mechanisms & concept clarity tailored for the <span className="text-cyan-400 font-semibold">IISER Aptitude Test</span>.
              </p>
            </div>

            {/* Premium Glowing Capsule Input Bar */}
            <div className="w-full relative mb-3 sm:mb-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className={cn(
                  "relative flex items-center rounded-full border transition-all duration-300 shadow-2xl pl-2.5 sm:pl-3 pr-2 py-1.5 sm:py-2.5",
                  isLight 
                    ? "bg-white border-slate-300 focus-within:border-cyan-500 focus-within:shadow-[0_4px_24px_rgba(6,182,212,0.2)]" 
                    : "bg-[#0d122b]/90 border-indigo-500/30 hover:border-indigo-500/50 focus-within:border-cyan-400 focus-within:bg-[#101638] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.15)] focus-within:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_35px_rgba(6,182,212,0.3)]"
                )}
              >
                {/* Left: Subject Focus Selector Pill */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSubjectMenu(!showSubjectMenu)}
                    className={cn(
                      "px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer mr-1.5 sm:mr-2 shrink-0 border",
                      isLight
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
                        : "bg-white/[0.07] border-white/10 hover:border-cyan-500/40 text-white/80 hover:text-white"
                    )}
                    title="Filter by subject"
                  >
                    <ActiveSubjectIcon className={cn("w-3.5 h-3.5", activeSubjectOption.color)} />
                    <span className="hidden sm:inline">{activeSubjectOption.shortLabel}</span>
                    <ChevronDown className="w-3 h-3 text-white/40" />
                  </button>

                  {/* Dropdown Menu */}
                  {showSubjectMenu && (
                    <div className="absolute left-0 top-10 sm:top-11 w-48 rounded-2xl bg-[#0e1330] border border-indigo-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.7)] p-1.5 z-50 space-y-1 backdrop-blur-xl">
                      <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-white/40 uppercase">
                        Select Subject Focus
                      </div>
                      {SUBJECT_OPTIONS.map((sub) => {
                        const Icon = sub.icon;
                        const isSelected = subjectFilter === sub.key;
                        return (
                          <button
                            key={sub.key}
                            type="button"
                            onClick={() => {
                              setSubjectFilter(sub.key);
                              setShowSubjectMenu(false);
                            }}
                            className={cn(
                              "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all cursor-pointer",
                              isSelected 
                                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 shadow-sm" 
                                : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                            )}
                          >
                            <Icon className={cn("w-4 h-4", sub.color)} />
                            <span>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Input Text Box */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={
                    subjectFilter === 'ALL'
                      ? "Ask any PCMB doubt or problem..."
                      : `Ask any ${subjectFilter.toLowerCase()} question...`
                  }
                  className={cn(
                    "w-full bg-transparent outline-none text-xs sm:text-sm text-white placeholder-white/40 min-w-0",
                    isLight ? "text-slate-900 placeholder-slate-400" : "text-white placeholder-white/40"
                  )}
                />

                {/* Right Controls: Think toggle + Send Button */}
                <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setDeepThink(!deepThink)}
                    className={cn(
                      "flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border",
                      deepThink 
                        ? "bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]" 
                        : "text-white/40 hover:text-white border-transparent hover:bg-white/5"
                    )}
                    title="Deep Step-by-Step Reasoning Mode"
                  >
                    <Brain className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Think</span>
                  </button>

                  <button
                    type="submit"
                    disabled={!inputVal.trim() || isLoading}
                    className={cn(
                      "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0",
                      inputVal.trim() && !isLoading
                        ? "bg-[#00b8db] hover:bg-[#00caef] text-slate-950 font-bold shadow-[0_0_18px_rgba(0,184,219,0.45)] hover:scale-105 active:scale-95"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    )}
                    title="Send Query (Enter)"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Subject Focus Chips (Mobile friendly) */}
            <div className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 mb-3.5 sm:mb-5">
              {SUBJECT_OPTIONS.map((sub) => {
                const Icon = sub.icon;
                const isSelected = subjectFilter === sub.key;
                return (
                  <button
                    key={sub.key}
                    type="button"
                    onClick={() => setSubjectFilter(sub.key)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border",
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)] font-bold"
                        : "bg-white/[0.04] text-white/60 border-white/5 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Icon className={cn("w-3 h-3", isSelected ? "text-cyan-400" : sub.color)} />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ── Dynamic Student-Specific Diagnostic Prompts (Based on real performance) ── */}
            {dashboardData && (
              <div className="w-full mb-3.5 sm:mb-4 p-3 sm:p-3.5 rounded-2xl bg-indigo-500/[0.07] border border-indigo-500/20 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">AI Prep Insights</span>
                  </span>
                  <span className={cn("text-[10px] font-mono shrink-0", isLight ? "text-slate-500" : "text-white/60")}>
                    {Math.round(dashboardData.accuracy || 0)}% Acc • {dashboardData.total_attempts || 0} Qs
                  </span>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setInputVal("Analyze my current test preparation and overall accuracy across subjects. What are my top 3 risks for IISER IAT 2027 and how should I fix them?");
                      inputRef.current?.focus();
                    }}
                    className={cn(
                      "text-[11px] px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 font-medium flex-1 sm:flex-initial justify-center sm:justify-start whitespace-nowrap",
                      isLight 
                        ? "bg-white hover:bg-cyan-50 border-slate-200 text-slate-700 hover:text-cyan-700 hover:border-cyan-300 shadow-sm" 
                        : "bg-white/[0.04] hover:bg-cyan-500/10 border-white/10 text-white/85 hover:text-cyan-300 hover:border-cyan-500/30"
                    )}
                  >
                    <Zap className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>Analyze Prep & Risks</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInputVal("Give me a personalized daily study plan for today to boost my IAT readiness score and maintain my streak.");
                      inputRef.current?.focus();
                    }}
                    className={cn(
                      "text-[11px] px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 font-medium flex-1 sm:flex-initial justify-center sm:justify-start whitespace-nowrap",
                      isLight 
                        ? "bg-white hover:bg-purple-50 border-slate-200 text-slate-700 hover:text-purple-700 shadow-sm" 
                        : "bg-white/[0.04] hover:bg-purple-500/10 border-white/10 text-white/85 hover:text-purple-300 hover:border-purple-500/30"
                    )}
                  >
                    <BookOpen className="w-3 h-3 text-purple-400 shrink-0" />
                    <span>Daily Study Plan</span>
                  </button>

                  {dashboardData.weakAreas?.[0] && (
                    <button
                      type="button"
                      onClick={() => {
                        const weak = dashboardData.weakAreas[0];
                        setInputVal(`Generate a 3-question high-yield IAT diagnostic quiz on my weakest area: "${weak.chapter || weak.subject}" (${Math.round(weak.accuracy)}% accuracy) with step-by-step derivations and traps.`);
                        inputRef.current?.focus();
                      }}
                      className={cn(
                        "text-[11px] px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 font-medium w-full sm:w-auto justify-center sm:justify-start whitespace-nowrap",
                        isLight 
                          ? "bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900 shadow-sm" 
                          : "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300"
                      )}
                    >
                      <Target className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>Quiz: {dashboardData.weakAreas[0].subject}</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ── 4 HIGH-YIELD CARDS (2x2 Grid Matching SmartPrep App Card Aesthetics) ── */}
            <div className="w-full space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase text-white/50 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  High-Yield IAT Study Starters
                </span>
                <span className="text-[10px] text-white/40 font-mono hidden sm:inline">
                  Click to prefill • Type specific problem • Press Enter
                </span>
                <span className="text-[10px] text-cyan-400/80 font-medium sm:hidden">
                  Tap to ask
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full">
                {QUICK_STARTERS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleStarterClick(item)}
                      className={cn(
                        "p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group text-left relative overflow-hidden",
                        isLight
                          ? "bg-white border-slate-200 hover:border-cyan-400 shadow-sm hover:shadow-md"
                          : "bg-[#0c1024]/80 border-white/[0.08] hover:bg-[#101533] shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
                        item.glowColor
                      )}
                    >
                      {/* Top Row: Icon + Tag + Arrow */}
                      <div className="flex items-center justify-between w-full mb-2 sm:mb-2.5">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 shadow-sm", item.iconBg, item.iconColor)}>
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <span className={cn("text-[8.5px] sm:text-[9.5px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full border", item.tagColor)}>
                            {item.tag}
                          </span>
                        </div>

                        <div className="w-6 h-6 rounded-full bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 group-hover:translate-x-0.5 transition-all">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h4 className={cn(
                          "text-xs sm:text-sm font-semibold transition-colors leading-snug",
                          isLight ? "text-slate-900 group-hover:text-cyan-700" : "text-white group-hover:text-cyan-200"
                        )}>
                          {item.title}
                        </h4>
                        <p className={cn(
                          "text-[10.5px] sm:text-[11px] mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed",
                          isLight ? "text-slate-500" : "text-white/50"
                        )}>
                          {item.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          /* ── 2. ACTIVE CONVERSATION STATE (Super-Premium Stream) ── */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-6 custom-scrollbar">
              <div className="max-w-3xl mx-auto w-full space-y-4 sm:space-y-6">
                
                {/* Mobile-only session header bar */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10 lg:hidden">
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-[11px]">Active Session</span>
                    <span className="text-white/30">•</span>
                    <span className="text-[10px] font-mono text-purple-300">NVIDIA NIM</span>
                  </div>
                  <button
                    onClick={handleClearChat}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer bg-white/5 hover:bg-rose-500/10 text-white/70 hover:text-rose-400 border border-white/10"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>New Chat</span>
                  </button>
                </div>

                {messages.map((msg, idx) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "flex gap-3.5",
                        isUser ? "justify-end" : "justify-start"
                      )}
                    >
                      {/* Assistant Avatar */}
                      {!isUser && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-white/15">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      )}

                      {/* Content Box */}
                      <div className={cn(
                        "flex flex-col",
                        isUser ? "items-end max-w-[85%]" : "flex-1 max-w-[92%]"
                      )}>
                        {isUser ? (
                          <div className={cn(
                            "px-4 py-3 rounded-2xl rounded-tr-xs text-sm font-medium leading-relaxed border shadow-md",
                            isLight 
                              ? "bg-indigo-600 text-white border-indigo-500" 
                              : "bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white border-indigo-400/30 shadow-[0_4px_20px_rgba(99,102,241,0.25)]"
                          )}>
                            {msg.content}
                          </div>
                        ) : (
                          <div className={cn(
                            "w-full rounded-2xl border p-4 sm:p-5 transition-all",
                            isLight 
                              ? "bg-white border-slate-200 text-slate-900 shadow-sm" 
                              : "bg-[#0d122b]/85 border-indigo-500/20 text-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                          )}>
                            {/* Assistant Header Info inside card */}
                            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-white">SmartPrep AI Tutor</span>
                                <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded">
                                  NVIDIA Llama 3.2
                                </span>
                              </div>

                              {msg.content && !isLoading && (
                                <button
                                  onClick={() => handleCopy(msg.content, idx)}
                                  className="flex items-center gap-1 text-[11px] text-white/50 hover:text-white transition-colors cursor-pointer"
                                  title="Copy response"
                                >
                                  {copiedIdx === idx ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      <span className="text-emerald-400">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              )}
                            </div>

                            {/* Response content */}
                            {msg.content ? (
                              <FormattedAnswer content={msg.content} />
                            ) : (
                              <div className="flex items-center gap-3 text-xs text-cyan-300 py-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                                <span className="font-mono">Synthesizing step-by-step explanation with NVIDIA AI NIM...</span>
                              </div>
                            )}

                            {/* Minimal follow-up pills */}
                            {msg.content && !isLoading && (
                              <div className="flex flex-wrap items-center gap-2 pt-4 mt-2 border-t border-white/[0.06] text-xs">
                                <button
                                  onClick={() => handleSendMessage("Can you explain this simpler with a real-world analogy?")}
                                  className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 text-white/70 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <span>🔍 Explain simpler with analogy</span>
                                </button>

                                <button
                                  onClick={() => handleSendMessage("Give me 1 challenging practice MCQ on this topic with +4/-1 marking.")}
                                  className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/30 text-white/70 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <span>🎯 Practice MCQ (+4 / -1)</span>
                                </button>

                                <button
                                  onClick={() => handleSendMessage("Summarize the key formulas and high-yield traps for IISER IAT on this topic.")}
                                  className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-amber-500/30 text-white/70 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <span>📐 Key formulas & traps</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* User Avatar */}
                      {isUser && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1 shadow-sm">
                          H
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Pinned Bottom Input Capsule */}
            <div className="px-3 sm:px-4 pb-24 sm:pb-4 pt-2 shrink-0">
              <div className="max-w-3xl mx-auto w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className={cn(
                    "relative flex items-center rounded-full border transition-all duration-300 shadow-2xl pl-2.5 sm:pl-3 pr-2 py-1.5 sm:py-2.5",
                    isLight 
                      ? "bg-white border-slate-300 focus-within:border-cyan-500 focus-within:shadow-[0_4px_24px_rgba(6,182,212,0.2)]" 
                      : "bg-[#0d122b]/95 border-indigo-500/30 hover:border-indigo-500/50 focus-within:border-cyan-400 focus-within:bg-[#101638] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.15)] focus-within:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_35px_rgba(6,182,212,0.3)] backdrop-blur-xl"
                  )}
                >
                  {/* Subject selector */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowSubjectMenu(!showSubjectMenu)}
                      className={cn(
                        "px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer mr-1.5 sm:mr-2 shrink-0 border",
                        isLight
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
                          : "bg-white/[0.07] border-white/10 hover:border-cyan-500/40 text-white/80 hover:text-white"
                      )}
                      title="Filter by subject"
                    >
                      <ActiveSubjectIcon className={cn("w-3.5 h-3.5", activeSubjectOption.color)} />
                      <span className="hidden sm:inline">{activeSubjectOption.shortLabel}</span>
                      <ChevronDown className="w-3 h-3 text-white/40" />
                    </button>

                    {showSubjectMenu && (
                      <div className="absolute left-0 bottom-12 w-48 rounded-2xl bg-[#0e1330] border border-indigo-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.7)] p-1.5 z-50 space-y-1 backdrop-blur-xl">
                        <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-white/40 uppercase">
                          Select Subject Focus
                        </div>
                        {SUBJECT_OPTIONS.map((sub) => {
                          const Icon = sub.icon;
                          const isSelected = subjectFilter === sub.key;
                          return (
                            <button
                              key={sub.key}
                              type="button"
                              onClick={() => {
                                setSubjectFilter(sub.key);
                                setShowSubjectMenu(false);
                              }}
                              className={cn(
                                "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all cursor-pointer",
                                isSelected 
                                  ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 shadow-sm" 
                                  : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                              )}
                            >
                              <Icon className={cn("w-4 h-4", sub.color)} />
                              <span>{sub.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Text Input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder={
                      subjectFilter === 'ALL'
                        ? "Ask follow-up question..."
                        : `Ask any ${subjectFilter.toLowerCase()} follow-up...`
                    }
                    className={cn(
                      "w-full bg-transparent outline-none text-xs sm:text-sm text-white placeholder-white/40 min-w-0",
                      isLight ? "text-slate-900 placeholder-slate-400" : "text-white placeholder-white/40"
                    )}
                  />

                  {/* Right controls */}
                  <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setDeepThink(!deepThink)}
                      className={cn(
                        "flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border",
                        deepThink 
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]" 
                          : "text-white/40 hover:text-white border-transparent hover:bg-white/5"
                      )}
                      title="Deep Step-by-Step Reasoning Mode"
                    >
                      <Brain className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Think</span>
                    </button>

                    <button
                      type="submit"
                      disabled={!inputVal.trim() || isLoading}
                      className={cn(
                        "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0",
                        inputVal.trim() && !isLoading
                          ? "bg-[#00b8db] hover:bg-[#00caef] text-slate-950 font-bold shadow-[0_0_18px_rgba(0,184,219,0.45)] hover:scale-105 active:scale-95"
                          : "bg-white/10 text-white/30 cursor-not-allowed"
                      )}
                      title="Send Query"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                <p className="text-center text-[10px] text-white/40 mt-2">
                  SmartPrep AI Tutor is powered by NVIDIA NIM & Llama 3.2. Verify calculations with NCERT & standard references.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
