import { cn } from '../../lib/utils';

export function Footer() {
  return (
    <footer className="w-full mt-auto py-6 border-t border-white/10 flex flex-col-reverse md:flex-row items-center justify-between gap-6 text-[15px] text-white/50 bg-[#05060F]/50 px-4 rounded-3xl mb-4">
      <div className="flex items-center">
        <span>© 2026 SmartPrep</span>
      </div>
      <div className="flex items-center gap-8 font-medium">
        <a href="#" className="hover:text-white transition-colors">Feedback</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </div>
    </footer>
  );
}
