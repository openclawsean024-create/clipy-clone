import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Navbar({ openAuth }) {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const initials = user ? (user.name || user.email).slice(0, 2).toUpperCase() : '';

  const goDashboard = () => {
    setUserMenu(false);
    setOpen(false);
    nav('/dashboard');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-sm' : 'bg-transparent'}`}>
      <div className="container-clipy flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor">
              <path d="M8 6v12M16 6v12M8 12h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <circle cx="6" cy="6" r="1.5" fill="#fbbf24"/>
              <circle cx="18" cy="18" r="1.5" fill="#fbbf24"/>
            </svg>
          </div>
          <span className="font-display text-lg font-extrabold text-text-primary">Clipy AI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-text-secondary">
          <a href="/#features" className="hover:text-brand-600 transition">功能</a>
          <a href="/#steps" className="hover:text-brand-600 transition">如何運作</a>
          <a href="/#tiers" className="hover:text-brand-600 transition">獎金階梯</a>
          <a href="/#faq" className="hover:text-brand-600 transition">常見問題</a>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-slate-100 transition"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-200 to-brand-400 flex items-center justify-center text-xs font-bold text-brand-700">
                  {initials}
                </div>
                <span className="text-sm font-semibold text-text-primary">{user.name}</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-text-tertiary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {userMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenu(false)}/>
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-bold text-text-primary truncate">{user.name}</p>
                      <p className="text-xs text-text-tertiary truncate">{user.email}</p>
                    </div>
                    <button onClick={goDashboard} className="w-full text-left px-4 py-2.5 text-sm text-text-primary hover:bg-slate-50 flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-text-tertiary" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                      我的工作室
                    </button>
                    <Link to="/dashboard/settings" onClick={() => setUserMenu(false)} className="w-full text-left px-4 py-2.5 text-sm text-text-primary hover:bg-slate-50 flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-text-tertiary" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
                      設定
                    </Link>
                    <div className="border-t border-slate-100 my-1"/>
                    <button onClick={() => { logout(); setUserMenu(false); nav('/'); }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                      登出
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => openAuth?.('login')} className="btn-ghost text-[15px]">登入</button>
              <button onClick={() => openAuth?.('register')} className="btn-primary text-[15px]">註冊</button>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2 text-text-primary" aria-label="選單">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6"/> : <path d="M4 7h16M4 12h16M4 17h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-3 animate-fade-in">
          <a href="/#features" onClick={() => setOpen(false)} className="block text-[15px] font-medium text-text-secondary py-2">功能</a>
          <a href="/#steps"    onClick={() => setOpen(false)} className="block text-[15px] font-medium text-text-secondary py-2">如何運作</a>
          <a href="/#tiers"    onClick={() => setOpen(false)} className="block text-[15px] font-medium text-text-secondary py-2">獎金階梯</a>
          <a href="/#faq"      onClick={() => setOpen(false)} className="block text-[15px] font-medium text-text-secondary py-2">常見問題</a>
          <div className="flex gap-2 pt-3 border-t border-slate-100">
            {user ? (
              <>
                <button onClick={() => { goDashboard(); setOpen(false); }} className="btn-primary flex-1">我的工作室</button>
                <button onClick={() => { logout(); setOpen(false); nav('/'); }} className="btn-secondary flex-1">登出</button>
              </>
            ) : (
              <>
                <button onClick={() => { openAuth?.('login'); setOpen(false); }} className="btn-secondary flex-1">登入</button>
                <button onClick={() => { openAuth?.('register'); setOpen(false); }} className="btn-primary flex-1">註冊</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}