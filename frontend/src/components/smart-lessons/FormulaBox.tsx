import React from 'react';
import { Copy, Check, FunctionSquare } from 'lucide-react';

interface Props {
  formulas: string[];
}

export function FormulaBox({ formulas }: Props) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!formulas || formulas.length === 0) return null;

  return (
    <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <FunctionSquare className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-wider">Formula Sheet</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
            🔥 Frequently Tested
          </span>
        </div>

        {/* Formula grid — single column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {formulas.map((formula, index) => (
            <button
              key={index}
              type="button"
              onClick={() => copyToClipboard(formula, index)}
              className="group flex items-center justify-between gap-3 p-4 bg-white/[0.02] hover:bg-white/[0.05] active:bg-white/[0.07] border border-white/5 hover:border-cyan-500/30 rounded-2xl cursor-pointer transition-all duration-200 text-left w-full"
            >
              <code className="formula-code flex-1">
                {formula}
              </code>
              
              <span className="text-white/30 group-hover:text-white/70 transition-colors shrink-0">
                {copiedIndex === index ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </span>
            </button>
          ))}
        </div>

        <p className="text-[10px] text-white/25 text-center">Tap any formula to copy</p>
      </div>
    </div>
  );
}
