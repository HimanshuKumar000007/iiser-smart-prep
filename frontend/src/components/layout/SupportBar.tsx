/**
 * SupportBar — replaces the marketing footer.
 * Lives at the bottom of the dashboard page only.
 * Minimal: version, quick links, no copyright clutter.
 */

import { ThumbsUp, HelpCircle, Mail, FileText, FileLock2 } from 'lucide-react';

const VERSION = '1.0.4';

export function SupportBar({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-3 px-5 py-3.5 rounded-2xl border border-white/5 bg-white/[0.02] w-full">
      {/* Links */}
      <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-1">
        {/* Support Tab Trigger */}
        <span className="flex items-center">
          <button
            onClick={() => onNavigate?.('support')}
            className="flex items-center gap-1.5 text-[11px] font-medium text-white/30 hover:text-white/70 transition-colors px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Support
          </button>
          <span className="w-px h-3 bg-white/10 mx-0.5" />
        </span>

        {/* Feedback Link */}
        <span className="flex items-center">
          <button
            onClick={() => onNavigate?.('feedback')}
            className="flex items-center gap-1.5 text-[11px] font-medium text-white/30 hover:text-white/70 transition-colors px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            Feedback
          </button>
          <span className="w-px h-3 bg-white/10 mx-0.5" />
        </span>

        {/* Contact Link */}
        <span className="flex items-center">
          <button
            onClick={() => onNavigate?.('contact')}
            className="flex items-center gap-1.5 text-[11px] font-medium text-white/30 hover:text-white/70 transition-colors px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            Contact
          </button>
          <span className="w-px h-3 bg-white/10 mx-0.5" />
        </span>

        {/* Terms Link */}
        <span className="flex items-center">
          <button
            onClick={() => onNavigate?.('terms')}
            className="flex items-center gap-1.5 text-[11px] font-medium text-white/30 hover:text-white/70 transition-colors px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            Terms of Service
          </button>
          <span className="w-px h-3 bg-white/10 mx-0.5" />
        </span>

        {/* Privacy Link */}
        <span className="flex items-center">
          <button
            onClick={() => onNavigate?.('privacy')}
            className="flex items-center gap-1.5 text-[11px] font-medium text-white/30 hover:text-white/70 transition-colors px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <FileLock2 className="w-3.5 h-3.5" />
            Privacy Policy
          </button>
        </span>
      </div>

      {/* Version */}
      <span className="text-[11px] font-mono text-white/20 tracking-wider shrink-0">
        IISER SmartPrep · v{VERSION}
      </span>
    </div>
  );
}
