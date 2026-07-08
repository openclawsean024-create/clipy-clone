import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('clipy-cookie-dismissed');
    if (!dismissed) {
      const t = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = (mode) => {
    localStorage.setItem('clipy-cookie-dismissed', mode);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 sm:right-auto sm:max-w-md z-50 animate-slide-up">
      <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-600" fill="currentColor">
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-secondary leading-relaxed">
              我們使用 cookie 來改善你的體驗並分析網站流量。
              <a href="#" className="text-brand-600 hover:underline font-semibold ml-1">隱私政策</a>
            </p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => dismiss('rejected')} className="btn-ghost text-xs">拒絕分析</button>
              <button onClick={() => dismiss('accepted')} className="btn-primary text-xs">全部接受</button>
            </div>
          </div>
          <button
            onClick={() => dismiss('rejected')}
            className="h-6 w-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-text-tertiary flex-shrink-0"
            aria-label="關閉"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}