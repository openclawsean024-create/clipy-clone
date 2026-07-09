import { useState } from 'react';
import { useAuth } from '../auth';

export default function AuthModal({ mode: initialMode = 'login', onClose, onSwitchMode }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    setErr('');
    if (!email.includes('@')) {
      setErr('請輸入有效 email');
      return;
    }
    if (mode === 'register' && !name.trim()) {
      setErr('請輸入名稱');
      return;
    }
    try {
      if (mode === 'login') login({ email });
      else register({ email, name: name.trim() });
      onClose();
    } catch (ex) {
      setErr(ex.message || '錯誤');
    }
  };

  const switchMode = (m) => {
    setMode(m);
    setErr('');
    onSwitchMode?.(m);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-500 to-brand-700 text-white p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-white/20 flex items-center justify-center transition"
            aria-label="關閉"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6"/>
            </svg>
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor">
                <path d="M8 6v12M16 6v12M8 12h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <span className="font-display text-xl font-extrabold">Clipy AI</span>
          </div>
          <h2 className="font-display text-2xl font-bold">
            {mode === 'login' ? '歡迎回來 👋' : '建立你的帳號'}
          </h2>
          <p className="text-brand-100 text-sm mt-1">
            {mode === 'login' ? '登入查看你的 UGC 流量與收益' : '30 秒註冊，立即開始追蹤 UGC 表現'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-7 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">名稱</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="你的創作者名稱"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition"
                autoFocus
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="creator@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition"
              autoFocus={mode === 'login'}
              required
            />
          </div>

          {err && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-3 py-2">
              {err}
            </div>
          )}

          <button type="submit" className="btn-primary-lg w-full">
            {mode === 'login' ? '登入' : '註冊帳號'}
          </button>

          <div className="text-center text-sm text-text-tertiary pt-2">
            {mode === 'login' ? (
              <>
                還沒有帳號？
                <button type="button" onClick={() => switchMode('register')} className="text-brand-600 font-bold ml-1 hover:underline">
                  立即註冊
                </button>
              </>
            ) : (
              <>
                已經有帳號？
                <button type="button" onClick={() => switchMode('login')} className="text-brand-600 font-bold ml-1 hover:underline">
                  登入
                </button>
              </>
            )}
          </div>

          <p className="text-xs text-text-muted text-center pt-3 border-t border-slate-100">
            這是教學復刻 — 任何 email 都能登入。資料只存在你瀏覽器 localStorage，不會上傳。
          </p>
        </form>
      </div>
    </div>
  );
}