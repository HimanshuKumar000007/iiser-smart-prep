/**
 * SupportBar — replaces the marketing footer.
 * Lives at the bottom of the dashboard page only.
 * Minimal: version, quick links, no copyright clutter.
 */

import { MessageCircle, ThumbsUp, HelpCircle } from 'lucide-react';

const VERSION = '1.0.4';

const LINKS = [
  { label: 'Support',  icon: HelpCircle,     href: '#' },
  { label: 'Feedback', icon: ThumbsUp,        href: '#' },
  { label: 'Discord',  icon: MessageCircle,   href: '#' },
];

export function SupportBar() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 rounded-2xl border border-white/5 bg-white/[0.02]">
      {/* Links */}
      <div className="flex items-center gap-1">
        {LINKS.map((link, i) => (
          <span key={link.label} className="flex items-center">
            <a
              href={link.href}
              className="flex items-center gap-1.5 text-[12px] font-medium text-white/30 hover:text-white/70 transition-colors px-3 py-1 rounded-lg hover:bg-white/5"
            >
              <link.icon className="w-3.5 h-3.5" />
              {link.label}
            </a>
            {i < LINKS.length - 1 && (
              <span className="w-px h-3 bg-white/10 mx-0.5" />
            )}
          </span>
        ))}
      </div>

      {/* Version */}
      <span className="text-[11px] font-mono text-white/20 tracking-wider">
        IISER SmartPrep · v{VERSION}
      </span>
    </div>
  );
}
