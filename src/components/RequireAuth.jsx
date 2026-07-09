import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth';
import AuthModal from './AuthModal';
import { useState, useEffect } from 'react';

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const loc = useLocation();
  const [modalMode, setModalMode] = useState(null);

  useEffect(() => {
    if (!user) setModalMode('login');
  }, [user, loc.pathname]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="text-center max-w-md">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 mx-auto flex items-center justify-center shadow-xl mb-5">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-text-primary mb-2">需要登入</h1>
          <p className="text-sm text-text-tertiary mb-6">登入或註冊以查看你的 UGC 流量與收益</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => setModalMode('register')} className="btn-primary">註冊帳號</button>
            <button onClick={() => setModalMode('login')} className="btn-secondary">登入</button>
          </div>
        </div>
        {modalMode && <AuthModal mode={modalMode} onClose={() => setModalMode(null)}/>}
      </div>
    );
  }
  return children;
}