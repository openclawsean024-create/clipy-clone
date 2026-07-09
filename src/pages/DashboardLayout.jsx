import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import AuthModal from '../components/AuthModal';

const NAV = [
  { to: '/dashboard',          label: 'Overview',  icon: 'home' },
  { to: '/dashboard/posts',    label: 'PO 文管理', icon: 'video' },
  { to: '/dashboard/earnings', label: '收益',      icon: 'cash' },
  { to: '/dashboard/settings', label: '設定',      icon: 'cog' },
];

const ICONS = {
  home: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  video: <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />,
  cash: <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  cog: <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      {ICONS[name]}
    </svg>
  );
}

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null);
  const initials = (user.name || user.email).slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:hidden bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 h-14">
        <button onClick={() => setSidebarOpen(true)} className="h-9 w-9 rounded-lg hover:bg-slate-100 flex items-center justify-center" aria-label="開啟選單">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-text-primary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 6v12M16 6v12M8 12h8" strokeLinecap="round"/></svg>
          </div>
          <span className="font-display text-base font-extrabold text-text-primary">Clipy</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-200 to-brand-400 flex items-center justify-center text-xs font-bold text-brand-700">{initials}</div>
      </div>

      <div className="flex">
        {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>}

        <aside className={`
          fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-200 z-40
          flex flex-col transition-transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-16 px-5 border-b border-slate-200 flex items-center gap-2 flex-shrink-0">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M8 6v12M16 6v12M8 12h8" strokeLinecap="round"/>
                <circle cx="6" cy="6" r="1.5" fill="#fbbf24"/>
                <circle cx="18" cy="18" r="1.5" fill="#fbbf24"/>
              </svg>
            </div>
            <div>
              <p className="font-display text-lg font-extrabold text-text-primary">Clipy AI</p>
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider">Creator Studio</p>
            </div>
          </div>

          <div className="px-5 py-4 border-b border-slate-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-brand-200 to-brand-400 flex items-center justify-center text-sm font-bold text-brand-700 flex-shrink-0">{initials}</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-text-primary truncate">{user.name}</p>
                <p className="text-xs text-text-tertiary truncate">{user.email}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary px-3 mb-2">主選單</p>
            <div className="space-y-1">
              {NAV.map(n => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === '/dashboard'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'text-text-secondary hover:bg-slate-100 hover:text-text-primary'
                  }`}
                >
                  <Icon name={n.icon}/>
                  <span>{n.label}</span>
                </NavLink>
              ))}
            </div>

            <p className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary px-3 mt-6 mb-2">其他</p>
            <div className="space-y-1">
              <a href="/" onClick={(e) => { e.preventDefault(); nav('/'); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:bg-slate-100 transition">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                <span>回到首頁</span>
              </a>
              <button onClick={() => { logout(); nav('/'); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                <span>登出</span>
              </button>
            </div>
          </nav>

          <div className="px-5 py-4 border-t border-slate-200 flex-shrink-0">
            <div className="rounded-xl bg-gradient-to-br from-brand-50 to-white border border-brand-100 p-3">
              <p className="text-xs font-bold text-brand-700 mb-1">升級 Pro 👑</p>
              <p className="text-xs text-text-tertiary mb-2">解鎖團隊管理 + AI 腳本無限制</p>
              <button className="text-xs font-semibold text-brand-600 hover:text-brand-700">查看方案 →</button>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <Outlet/>
        </main>
      </div>

      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)}/>}
    </div>
  );
}