import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
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

const TRY_ASKING_PROMPTS = [
  {
    label: "Why does the electric field inside a conductor become zero?",
    subject: 'PHYSICS' as SubjectFocus
  },
  {
    label: "How can I identify the rate-determining step in a reaction?",
    subject: 'CHEMISTRY' as SubjectFocus
  },
  {
    label: "Explain the difference between mitosis and meiosis.",
    subject: 'BIOLOGY' as SubjectFocus
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

interface MessageBubbleProps {
  msg: Message;
  idx: number;
  isLight: boolean;
  isLoading: boolean;
  isLast: boolean;
  copiedIdx: number | null;
  onCopy: (text: string, idx: number) => void;
  onFollowUp: (text: string) => void;
}

const MessageBubble = memo(function MessageBubble({
  msg,
  idx,
  isLight,
  isLoading,
  isLast,
  copiedIdx,
  onCopy,
  onFollowUp
}: MessageBubbleProps) {
  const isUser = msg.role === 'user';
  return (
    <div
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

              {msg.content && (!isLoading || !isLast) && (
                <button
                  type="button"
                  onClick={() => onCopy(msg.content, idx)}
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
            {msg.content && (!isLoading || !isLast) && (
              <div className="flex flex-wrap items-center gap-2 pt-4 mt-2 border-t border-white/[0.06] text-xs">
                <button
                  type="button"
                  onClick={() => onFollowUp("Can you explain this simpler with a real-world analogy?")}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 text-white/70 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>🔍 Explain simpler with analogy</span>
                </button>

                <button
                  type="button"
                  onClick={() => onFollowUp("Give me 1 challenging practice MCQ on this topic with +4/-1 marking.")}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/30 text-white/70 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>🎯 Practice MCQ (+4 / -1)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onFollowUp("Summarize the key formulas and high-yield traps for IISER IAT on this topic.")}
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef<boolean>(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasAutoExecutedRef = useRef<boolean>(false);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`;
  };

  const handleMessagesScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 140;
    isNearBottomRef.current = isAtBottom;
  };

  // Auto-scroll when new message is added or on initial render
  useEffect(() => {
    if (isNearBottomRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages.length]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      let lastRenderTime = 0;

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
                const now = performance.now();
                if (now - lastRenderTime > 60) {
                  lastRenderTime = now;
                  const currentText = streamed;
                  setMessages(prev => {
                    const arr = [...prev];
                    arr[arr.length - 1] = { role: 'assistant', content: currentText };
                    return arr;
                  });
                  if (isNearBottomRef.current && messagesContainerRef.current) {
                    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
                  }
                }
              }
            } catch {}
          }
        }
      }

      // Final flush to guarantee full answer is displayed
      setMessages(prev => {
        const arr = [...prev];
        arr[arr.length - 1] = { role: 'assistant', content: streamed };
        return arr;
      });
      if (isNearBottomRef.current && messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
      try {
        const finalChat = [...msgsWithPlaceholder];
        finalChat[finalChat.length - 1] = { role: 'assistant', content: streamed };
        sessionStorage.setItem('smartprep_active_chat', JSON.stringify(finalChat));
      } catch {}
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

  const handleSendMessage = useCallback(async (customQuery?: string) => {
    const q = (customQuery || inputVal).trim();
    if (!q || isLoading) return;

    const newMsgs: Message[] = [...messages, { role: 'user', content: q }];
    setInputVal('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    isNearBottomRef.current = true;
    try {
      sessionStorage.setItem('smartprep_active_chat', JSON.stringify(newMsgs));
    } catch {}
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 20);
    executeStreamForMessages(newMsgs);
  }, [inputVal, isLoading, messages, subjectFilter, dashboardData]);

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

  const handleCopy = useCallback((text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  }, []);

  // Diagnostic Learning Insights Computation
  const hasLearningData = Boolean(dashboardData && (dashboardData.total_attempts || 0) > 0);

  // Derive strongest subject from recorded performance
  const strongestSubject = dashboardData?.subject_performance
    ?.filter(s => (s.attempts || 0) > 0)
    ?.sort((a, b) => (b.accuracy || 0) - (a.accuracy || 0))[0]?.subject;

  // Derive weakest topic or area
  const weakestAreaItem = dashboardData?.weakAreas?.[0];
  const weakestSubject = dashboardData?.subject_performance
    ?.filter(s => (s.attempts || 0) > 0)
    ?.sort((a, b) => (a.accuracy || 0) - (b.accuracy || 0))[0]?.subject;

  const weakTopic = weakestAreaItem?.chapter || weakestAreaItem?.subject || weakestSubject || null;
  const strongTopic = strongestSubject || null;

  return (
    <div className={cn(
      "w-full h-full flex flex-col relative overflow-hidden select-none transition-colors duration-200",
      isLight ? "bg-[#f8fafc] text-slate-900" : "bg-[#070914] text-[#F8FAFC]"
    )}>
      
      {/* ── AMBIENT CYBER-SPACE GLOWS (Restrained & Scientific) ── */}
      {!isLight && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[260px] bg-[#7657FF]/10 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute top-32 right-[-80px] w-[400px] h-[300px] bg-[#22D3EE]/8 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-10 left-[-80px] w-[450px] h-[300px] bg-[#7657FF]/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />
        </>
      )}

      {/* ── TOP APP NAVIGATION BAR (Desktop Only — Mobile is handled seamlessly by App.tsx) ── */}
      <header className={cn(
        "hidden lg:flex h-16 px-6 items-center justify-between relative z-30 shrink-0 border-b transition-colors",
        isLight 
          ? "bg-white/90 border-slate-200/90 backdrop-blur-md" 
          : "bg-[#070914]/90 border-[rgba(148,163,184,0.14)] backdrop-blur-xl"
      )}>
        {/* Left: Back to Dashboard & Brand Identity */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => onNavigate?.('dashboard')}
            className={cn(
              "px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border",
              isLight 
                ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200" 
                : "bg-[#141C32]/80 border-[rgba(148,163,184,0.14)] hover:border-[#22D3EE]/40 text-[#94A3B8] hover:text-[#F8FAFC]"
            )}
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className={cn("h-4 w-px", isLight ? "bg-slate-200" : "bg-[rgba(148,163,184,0.14)]")} />

          {/* AI Tutor Title & Exam Badge */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#7657FF] to-[#22D3EE] flex items-center justify-center text-white shadow-[0_0_14px_rgba(118,87,255,0.4)]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className={cn("font-bold text-sm tracking-tight", isLight ? "text-slate-900" : "text-[#F8FAFC]")}>
                SmartPrep AI Tutor
              </span>
              <span className="border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE] text-[9px] font-bold px-1.5 py-0.5 rounded w-fit">
                IISER IAT 2027
              </span>
            </div>
          </div>
        </div>

        {/* Right: Genuine Live Status, Model & Action */}
        <div className="flex items-center gap-2">
          <div className={cn(
            "hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs border",
            isLight 
              ? "bg-slate-100 border-slate-200 text-slate-700" 
              : "bg-[#0F1528] border-[rgba(148,163,184,0.14)] text-[#94A3B8]"
          )}>
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] font-semibold text-[#F8FAFC]">Live AI</span>
            <span className="opacity-30">•</span>
            <span className="text-[10px] font-mono text-[#7657FF] font-semibold">NVIDIA NIM • Llama 3.2</span>
          </div>

          {dashboardData && (
            <div 
              className={cn(
                "hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
                isLight 
                  ? "bg-cyan-50 border-cyan-200 text-cyan-800" 
                  : "bg-[#0F1528] border-[rgba(148,163,184,0.14)] text-[#22D3EE]"
              )}
            >
              <span className="opacity-60 text-[11px]">Sync:</span>
              <span className="font-bold text-[11px]">{Math.round(dashboardData.accuracy || 0)}% Acc</span>
              <span className="opacity-30">•</span>
              <span className="font-bold text-[11px]">{dashboardData.total_attempts || 0} Qs</span>
            </div>
          )}

          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className={cn(
                "px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border",
                isLight 
                  ? "bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-slate-200" 
                  : "bg-[#141C32] border-[rgba(148,163,184,0.14)] hover:border-rose-500/30 text-[#94A3B8] hover:text-rose-400"
              )}
              title="Start a new chat"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          )}
        </div>
      </header>

      {/* ── WORKSPACE CONTAINER ── */}
      <div className="flex-1 min-h-0 flex flex-col relative z-10 overflow-hidden">

        {/* ── 1. EMPTY / WELCOME STATE ── */}
        {messages.length === 0 ? (
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar overscroll-contain flex flex-col items-center justify-start px-4 max-w-4xl mx-auto w-full pt-6 sm:pt-10 pb-12">
            
            {/* ── HERO SECTION ── */}
            <div className="text-center mb-6 sm:mb-8 space-y-2">
              <div className="inline-flex items-center justify-center relative mb-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#7657FF] via-indigo-500 to-[#22D3EE] p-[1px] shadow-[0_0_25px_rgba(118,87,255,0.35)]">
                  <div className={cn("w-full h-full rounded-2xl flex items-center justify-center", isLight ? "bg-white" : "bg-[#0F1528]")}>
                    <Sparkles className="w-6 h-6 text-[#22D3EE]" />
                  </div>
                </div>
              </div>

              <h1 className={cn(
                "text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight",
                isLight ? "text-slate-900" : "text-[#F8FAFC]"
              )}>
                Your Personal Science Tutor
              </h1>
              <p className={cn(
                "text-xs sm:text-sm max-w-md sm:max-w-lg mx-auto leading-relaxed",
                isLight ? "text-slate-600" : "text-[#94A3B8]"
              )}>
                Explore concepts, solve difficult problems, and master the science behind every answer.
              </p>
              <p className={cn(
                "text-xs font-semibold tracking-wide",
                isLight ? "text-indigo-600" : "text-[#22D3EE]"
              )}>
                Built for IISER IAT &amp; NEST preparation.
              </p>
            </div>

            {/* ── AI QUESTION COMPOSER CARD ── */}
            <div className="w-full relative mb-3 sm:mb-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className={cn(
                  "relative flex flex-col rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-2xl p-3 sm:p-4 gap-3",
                  isLight 
                    ? "bg-white border-slate-200/90 shadow-[0_4px_24px_rgba(15,23,42,0.06)] focus-within:border-[#7657FF] focus-within:shadow-[0_4px_28px_rgba(118,87,255,0.18)]" 
                    : "bg-[#0F1528] border-[rgba(148,163,184,0.14)] hover:border-[rgba(148,163,184,0.22)] focus-within:border-[#7657FF]/60 focus-within:bg-[#141C32] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_25px_rgba(118,87,255,0.12)] backdrop-blur-xl"
                )}
              >
                {/* Multi-line Autosizing Textarea */}
                <textarea
                  ref={inputRef}
                  rows={2}
                  value={inputVal}
                  onChange={handleTextareaChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask a Physics question, derive a formula, explain a Chemistry mechanism, or paste a problem…"
                  className={cn(
                    "w-full bg-transparent outline-none resize-none text-sm sm:text-base leading-relaxed max-h-[180px] custom-scrollbar px-1",
                    isLight ? "text-slate-900 placeholder:text-slate-400" : "text-[#F8FAFC] placeholder:text-[#94A3B8]/60"
                  )}
                  aria-label="Question composer input"
                />

                {/* Bottom Integrated Toolbar */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[rgba(148,163,184,0.1)] flex-wrap">
                  {/* Left: Segmented Subject Selector & Think Toggle */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {SUBJECT_OPTIONS.map((sub) => {
                      const Icon = sub.icon;
                      const isSelected = subjectFilter === sub.key;
                      return (
                        <button
                          key={sub.key}
                          type="button"
                          onClick={() => setSubjectFilter(sub.key)}
                          className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border select-none",
                            isSelected
                              ? (isLight
                                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                  : "bg-[#7657FF]/25 text-[#F8FAFC] border-[#7657FF]/50 shadow-[0_0_12px_rgba(118,87,255,0.3)] font-bold")
                              : (isLight
                                  ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200"
                                  : "bg-[#141C32]/70 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#141C32] border-[rgba(148,163,184,0.1)]")
                          )}
                          aria-label={`Filter by ${sub.label}`}
                        >
                          <Icon className={cn("w-3 h-3", isSelected ? (isLight ? "text-white" : "text-[#22D3EE]") : sub.color)} />
                          <span>{sub.shortLabel}</span>
                        </button>
                      );
                    })}

                    <div className="h-4 w-px bg-white/10 mx-0.5 hidden sm:block" />

                    {/* Think Mode Reasoning Toggle */}
                    <button
                      type="button"
                      onClick={() => setDeepThink(!deepThink)}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border select-none",
                        deepThink 
                          ? (isLight
                              ? "bg-purple-100 text-purple-700 border-purple-300 shadow-sm"
                              : "bg-[#7657FF]/25 text-[#7657FF] border-[#7657FF]/40 shadow-[0_0_12px_rgba(118,87,255,0.3)]")
                          : (isLight
                              ? "text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-50"
                              : "text-[#94A3B8]/60 hover:text-[#F8FAFC] border-[rgba(148,163,184,0.1)] hover:bg-[#141C32]")
                      )}
                      title="Deep step-by-step reasoning for derivations & complex proofs"
                      aria-pressed={deepThink}
                    >
                      <Brain className={cn("w-3.5 h-3.5", deepThink ? "text-[#7657FF]" : "")} />
                      <span>Think</span>
                    </button>
                  </div>

                  {/* Right: Enter hint & Action Send Button */}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="hidden sm:inline text-[11px] text-[#94A3B8]/50 font-mono">
                      Shift+Enter for newline
                    </span>
                    <button
                      type="submit"
                      disabled={!inputVal.trim() || isLoading}
                      className={cn(
                        "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0",
                        inputVal.trim() && !isLoading
                          ? "bg-gradient-to-tr from-[#7657FF] to-[#22D3EE] hover:opacity-90 text-white font-bold shadow-[0_0_18px_rgba(118,87,255,0.5)] hover:scale-105 active:scale-95"
                          : "bg-white/10 text-white/30 cursor-not-allowed"
                      )}
                      title="Send Prompt (Enter)"
                      aria-label="Send question"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* ── TRY ASKING (First-time user experience) ── */}
            <div className="w-full mb-5">
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className={cn("text-[11px] font-bold tracking-wider uppercase", isLight ? "text-slate-500" : "text-[#94A3B8]")}>
                  Try asking
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {TRY_ASKING_PROMPTS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSubjectFilter(item.subject);
                      handleSendMessage(item.label);
                    }}
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-2 text-left group",
                      isLight
                        ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 shadow-xs"
                        : "bg-[#0F1528] hover:bg-[#141C32] border-[rgba(148,163,184,0.14)] hover:border-[#22D3EE]/50 text-[#94A3B8] hover:text-[#F8FAFC] shadow-sm"
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── YOUR LEARNING INSIGHTS CARD ── */}
            {hasLearningData ? (
              <div className={cn(
                "w-full mb-6 p-4 rounded-2xl border transition-all",
                isLight
                  ? "bg-white border-slate-200/90 shadow-sm"
                  : "bg-[#0F1528] border-[rgba(148,163,184,0.14)] shadow-lg"
              )}>
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#7657FF]/15 border border-[#7657FF]/30 flex items-center justify-center text-[#7657FF]">
                      <Target className="w-4 h-4" />
                    </div>
                    <h3 className={cn("text-xs font-bold uppercase tracking-wider", isLight ? "text-slate-800" : "text-[#F8FAFC]")}>
                      Your Learning Insights
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-[#22D3EE]">
                      Diagnostic Sync
                    </span>
                  </div>

                  {weakTopic && (
                    <button
                      type="button"
                      onClick={() => {
                        const prompt = `Generate a targeted 3-question IAT drill on "${weakTopic}" with step-by-step derivations, traps, and shortcuts.`;
                        handleSendMessage(prompt);
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ml-auto",
                        isLight
                          ? "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200"
                          : "bg-[#7657FF]/15 hover:bg-[#7657FF]/25 text-[#22D3EE] hover:text-white border-[#7657FF]/30 hover:border-[#22D3EE]/40 shadow-sm"
                      )}
                    >
                      <span>Practice Weak Area: {weakTopic}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Metric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className={cn("p-2.5 rounded-xl border", isLight ? "bg-slate-50 border-slate-200" : "bg-[#141C32]/70 border-[rgba(148,163,184,0.1)]")}>
                    <span className={cn("text-[10px] block font-medium", isLight ? "text-slate-500" : "text-[#94A3B8]")}>Questions Attempted</span>
                    <span className={cn("text-base font-bold mt-0.5 block", isLight ? "text-slate-900" : "text-[#F8FAFC]")}>
                      {dashboardData?.total_attempts ?? 0}
                    </span>
                  </div>

                  <div className={cn("p-2.5 rounded-xl border", isLight ? "bg-slate-50 border-slate-200" : "bg-[#141C32]/70 border-[rgba(148,163,184,0.1)]")}>
                    <span className={cn("text-[10px] block font-medium", isLight ? "text-slate-500" : "text-[#94A3B8]")}>Overall Accuracy</span>
                    <span className={cn("text-base font-bold mt-0.5 block text-[#34D399]")}>
                      {Math.round(dashboardData?.accuracy ?? 0)}%
                    </span>
                  </div>

                  <div className={cn("p-2.5 rounded-xl border", isLight ? "bg-slate-50 border-slate-200" : "bg-[#141C32]/70 border-[rgba(148,163,184,0.1)]")}>
                    <span className={cn("text-[10px] block font-medium", isLight ? "text-slate-500" : "text-[#94A3B8]")}>Strongest Topic</span>
                    <span className={cn("text-xs font-semibold mt-1 block truncate", isLight ? "text-slate-900" : "text-[#22D3EE]")}>
                      {strongTopic || "Gathering data"}
                    </span>
                  </div>

                  <div className={cn("p-2.5 rounded-xl border", isLight ? "bg-slate-50 border-slate-200" : "bg-[#141C32]/70 border-[rgba(148,163,184,0.1)]")}>
                    <span className={cn("text-[10px] block font-medium", isLight ? "text-slate-500" : "text-[#94A3B8]")}>Weakest Topic</span>
                    <span className={cn("text-xs font-semibold mt-1 block truncate", isLight ? "text-slate-900" : "text-[#FBBF24]")}>
                      {weakTopic || "None detected"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Empty State for New User without data */
              <div className={cn(
                "w-full mb-6 p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-4 flex-wrap",
                isLight
                  ? "bg-white border-slate-200/90 shadow-sm"
                  : "bg-[#0F1528] border-[rgba(148,163,184,0.14)] shadow-lg"
              )}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#7657FF]/15 border border-[#7657FF]/30 flex items-center justify-center text-[#7657FF] shrink-0">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={cn("text-sm font-bold", isLight ? "text-slate-900" : "text-[#F8FAFC]")}>
                      Your learning journey starts here
                    </h4>
                    <p className={cn("text-xs mt-0.5", isLight ? "text-slate-500" : "text-[#94A3B8]")}>
                      Ask your first question or complete a practice set to build your personalized learning insights.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate?.('smart_lessons')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shrink-0 ml-auto",
                    isLight
                      ? "bg-slate-900 text-white hover:bg-slate-800 border-slate-900"
                      : "bg-gradient-to-r from-[#7657FF] to-[#22D3EE] text-white border-transparent hover:opacity-95 shadow-[0_0_15px_rgba(118,87,255,0.3)]"
                  )}
                >
                  <span>Start Practicing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {/* End of Empty State Content */}
          </div>
        ) : (
          /* ── 2. ACTIVE CONVERSATION STATE (Super-Premium Stream) ── */
          <div className="flex-1 min-h-0 flex flex-col h-full overflow-hidden">
            
            {/* Mobile-only session header bar (Fixed at top, strictly outside scrollable messages) */}
            <div className={cn(
              "flex items-center justify-between px-3.5 sm:px-6 py-2 border-b shrink-0 lg:hidden z-20 transition-colors",
              isLight 
                ? "bg-white/95 border-slate-200/80 text-slate-800 shadow-sm" 
                : "bg-[#060814]/95 border-white/10 text-white shadow-[0_2px_10px_rgba(0,0,0,0.3)] backdrop-blur-md"
            )}>
              <div className="flex items-center gap-1.5 text-xs text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-[11px]">Active Session</span>
                <span className={isLight ? "text-slate-300" : "text-white/30"}>•</span>
                <span className={cn("text-[10px] font-mono", isLight ? "text-purple-700 font-bold" : "text-purple-300 font-semibold")}>NVIDIA NIM</span>
              </div>
              <button
                onClick={handleClearChat}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border",
                  isLight 
                    ? "bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-slate-200" 
                    : "bg-white/5 hover:bg-rose-500/10 text-white/70 hover:text-rose-400 border-white/10"
                )}
                title="Start a fresh chat"
              >
                <Trash2 className="w-3 h-3" />
                <span>New Chat</span>
              </button>
            </div>

            {/* Messages Thread (Strictly the ONLY area that scrolls) */}
            <div 
              ref={messagesContainerRef}
              onScroll={handleMessagesScroll}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 sm:px-6 py-3 sm:py-6 custom-scrollbar"
            >
              <div className="max-w-3xl mx-auto w-full space-y-4 sm:space-y-6">
                {messages.map((msg, idx) => (
                  <MessageBubble
                    key={idx}
                    msg={msg}
                    idx={idx}
                    isLight={isLight}
                    isLoading={isLoading}
                    isLast={idx === messages.length - 1}
                    copiedIdx={copiedIdx}
                    onCopy={handleCopy}
                    onFollowUp={handleSendMessage}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Pinned Bottom Input Capsule (Modern Generative AI Composer Card) */}
            <div className={cn(
              "px-3 sm:px-6 pt-2 pb-3 sm:pb-5 shrink-0 border-t z-20 transition-colors",
              isLight 
                ? "bg-white/95 border-slate-200/80 shadow-[0_-4px_20px_rgba(15,23,42,0.04)]" 
                : "bg-[#070914]/95 border-[rgba(148,163,184,0.14)] backdrop-blur-md shadow-[0_-4px_25px_rgba(0,0,0,0.6)]"
            )}>
              <div className="max-w-3xl mx-auto w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className={cn(
                    "relative flex flex-col rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-xl p-2.5 sm:p-3.5 gap-2",
                    isLight 
                      ? "bg-white border-slate-300 focus-within:border-[#7657FF] focus-within:shadow-[0_4px_24px_rgba(118,87,255,0.18)]" 
                      : "bg-[#0F1528] border-[rgba(148,163,184,0.14)] hover:border-[rgba(148,163,184,0.22)] focus-within:border-[#7657FF]/60 focus-within:bg-[#141C32] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(118,87,255,0.12)] backdrop-blur-xl"
                  )}
                >
                  {/* Multi-line Autosizing Textarea */}
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={inputVal}
                    onChange={handleTextareaChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder={
                      subjectFilter === 'ALL'
                        ? "Ask follow-up doubt, derive formula, or paste problem... (Press Enter to send)"
                        : `Ask ${subjectFilter.toLowerCase()} follow-up... (Press Enter to send)`
                    }
                    className={cn(
                      "w-full bg-transparent outline-none resize-none text-xs sm:text-sm leading-relaxed max-h-[160px] custom-scrollbar px-1",
                      isLight ? "text-slate-900 placeholder:text-slate-400" : "text-[#F8FAFC] placeholder:text-[#94A3B8]/60"
                    )}
                    aria-label="Follow up query input"
                  />

                  {/* Bottom Integrated Toolbar */}
                  <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-[rgba(148,163,184,0.1)] flex-wrap">
                    {/* Left: Integrated Subject Pills & Deep Think */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {SUBJECT_OPTIONS.map((sub) => {
                        const Icon = sub.icon;
                        const isSelected = subjectFilter === sub.key;
                        return (
                          <button
                            key={sub.key}
                            type="button"
                            onClick={() => setSubjectFilter(sub.key)}
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer border select-none",
                              isSelected
                                ? (isLight
                                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                    : "bg-[#7657FF]/25 text-[#F8FAFC] border-[#7657FF]/50 shadow-[0_0_10px_rgba(118,87,255,0.25)] font-bold")
                                : (isLight
                                    ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200"
                                    : "bg-[#141C32]/70 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#141C32] border-[rgba(148,163,184,0.1)]")
                            )}
                          >
                            <Icon className={cn("w-2.5 h-2.5", isSelected ? (isLight ? "text-white" : "text-[#22D3EE]") : sub.color)} />
                            <span>{sub.shortLabel}</span>
                          </button>
                        );
                      })}

                      <div className="h-3 w-px bg-white/10 mx-0.5 hidden sm:block" />

                      {/* Think Toggle */}
                      <button
                        type="button"
                        onClick={() => setDeepThink(!deepThink)}
                        className={cn(
                          "flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer border select-none",
                          deepThink 
                            ? (isLight
                                ? "bg-purple-100 text-purple-700 border-purple-300 shadow-sm"
                                : "bg-[#7657FF]/25 text-[#7657FF] border-[#7657FF]/40 shadow-[0_0_10px_rgba(118,87,255,0.25)]")
                            : (isLight
                                ? "text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-50"
                                : "text-[#94A3B8]/60 hover:text-[#F8FAFC] border-[rgba(148,163,184,0.1)] hover:bg-[#141C32]")
                        )}
                        title="Deep step-by-step reasoning"
                        aria-pressed={deepThink}
                      >
                        <Brain className={cn("w-3 h-3", deepThink ? "text-[#7657FF]" : "")} />
                        <span>Think</span>
                      </button>
                    </div>

                    {/* Right: Send Button */}
                    <div className="flex items-center gap-1.5 ml-auto">
                      <button
                        type="submit"
                        disabled={!inputVal.trim() || isLoading}
                        className={cn(
                          "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0",
                          inputVal.trim() && !isLoading
                            ? "bg-gradient-to-tr from-[#7657FF] to-[#22D3EE] hover:opacity-90 text-white font-bold shadow-[0_0_15px_rgba(118,87,255,0.45)] hover:scale-105 active:scale-95"
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                        )}
                        title="Send Query (Enter)"
                        aria-label="Send follow up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </form>

                <p className="text-center text-[10px] text-[#94A3B8]/50 mt-1.5">
                  SmartPrep AI Tutor powered by NVIDIA NIM &amp; Llama 3.2 • Verify calculations with standard IISER references.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
