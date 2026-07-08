import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-sm' : 'bg-transparent'}`}>
      <div className="container-clipy flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor">
              <path d="M8 6v12M16 6v12M8 12h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <circle cx="6" cy="6" r="1.5" fill="#fbbf24"/>
              <circle cx="18" cy="18" r="1.5" fill="#fbbf24"/>
            </svg>
          </div>
          <span className="font-display text-lg font-extrabold text-text-primary">Clipy AI</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-text-secondary">
          <a href="#features" className="hover:text-brand-600 transition">功能</a>
          <a href="#steps"   className="hover:text-brand-600 transition">如何運作</a>
          <a href="#tiers"   className="hover:text-brand-600 transition">獎金階梯</a>
          <a href="#faq"     className="hover:text-brand-600 transition">常見問題</a>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <button className="btn-ghost text-[15px]">登入</button>
          <button className="btn-primary text-[15px]">註冊</button>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-text-primary"
          aria-label="選單"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6"/> : <path d="M4 7h16M4 12h16M4 17h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-3 animate-fade-in">
          <a href="#features" onClick={() => setOpen(false)} className="block text-[15px] font-medium text-text-secondary py-2">功能</a>
          <a href="#steps"    onClick={() => setOpen(false)} className="block text-[15px] font-medium text-text-secondary py-2">如何運作</a>
          <a href="#tiers"    onClick={() => setOpen(false)} className="block text-[15px] font-medium text-text-secondary py-2">獎金階梯</a>
          <a href="#faq"      onClick={() => setOpen(false)} className="block text-[15px] font-medium text-text-secondary py-2">常見問題</a>
          <div className="flex gap-2 pt-3 border-t border-slate-100">
            <button className="btn-secondary flex-1">登入</button>
            <button className="btn-primary flex-1">註冊</button>
          </div>
        </div>
      )}
    </header>
  );
}