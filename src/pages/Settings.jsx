import { useState } from 'react';
import { useAuth } from '../auth';

export default function Settings() {
  const { user, db, updateSettings, logout } = useAuth();
  const [name, setName] = useState(user.name);
  const [saved, setSaved] = useState(false);
  const s = db?.settings || {};

  const save = () => {
    updateSettings({ displayName: name });
    // Update user info too
    const updated = { ...user, name };
    localStorage.setItem('clipy-auth', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">設定</h1>
        <p className="text-text-tertiary mt-1 text-sm">管理帳號資訊與通知偏好</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
        <h2 className="font-bold text-lg mb-4">個人資訊</h2>
        <div className="flex items-center gap-4 mb-5">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-200 to-brand-400 flex items-center justify-center text-xl font-bold text-brand-700">
            {(name || user.email).slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-text-primary">{user.name}</p>
            <p className="text-sm text-text-tertiary">{user.email}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">顯示名稱</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Email</label>
            <input value={user.email} disabled className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-text-tertiary"/>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={save} className="btn-primary text-sm">
              {saved ? '✓ 已儲存' : '儲存變更'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
        <h2 className="font-bold text-lg mb-4">通知偏好</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition">
            <input
              type="checkbox"
              checked={!!s.notifyEmail}
              onChange={(e) => updateSettings({ notifyEmail: e.target.checked })}
              className="h-5 w-5 rounded text-brand-500"
            />
            <div>
              <p className="text-sm font-semibold text-text-primary">Email 通知</p>
              <p className="text-xs text-text-tertiary">當有新 PO 文達標時通知你</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition">
            <input
              type="checkbox"
              checked={!!s.notifyWeeklyReport}
              onChange={(e) => updateSettings({ notifyWeeklyReport: e.target.checked })}
              className="h-5 w-5 rounded text-brand-500"
            />
            <div>
              <p className="text-sm font-semibold text-text-primary">週報</p>
              <p className="text-xs text-text-tertiary">每週一寄送觀看與收益摘要</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition">
            <input
              type="checkbox"
              checked={!!s.notifyPayout}
              onChange={(e) => updateSettings({ notifyPayout: e.target.checked })}
              className="h-5 w-5 rounded text-brand-500"
            />
            <div>
              <p className="text-sm font-semibold text-text-primary">結算通知</p>
              <p className="text-xs text-text-tertiary">獎金結算入帳時發送推播</p>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-red-200 p-6">
        <h2 className="font-bold text-lg text-red-600 mb-2">危險區</h2>
        <p className="text-sm text-text-tertiary mb-4">登出後可隨時重新登入，資料不會丟失（存在瀏覽器 localStorage）</p>
        <button onClick={logout} className="border-2 border-red-300 text-red-600 font-bold px-4 py-2 rounded-full hover:bg-red-50 transition">
          登出帳號
        </button>
      </div>
    </div>
  );
}