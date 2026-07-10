import { useState } from 'react';
import { FEATURE_TABS, TEAM_MEMBERS, TASKS, PLATFORMS, img } from '../data';

// 4 個團隊成員各對應真實人臉
const TEAM_AVATARS_FALLBACK = [
  img('avatar-sarah.jpg'),  // Sarah L.
  img('avatar-mike.jpg'),   // Mike C.
  img('avatar-emma.jpg'),   // Emma W.
  img('avatar-david.jpg'),  // David K.
];

function PanelTeam() {
  return (
    <div className="card-feature min-h-[420px] p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">UGC 團隊成員</h3>
          <p className="text-sm text-text-tertiary mt-1">3 個進行中專案</p>
        </div>
        <button className="btn-secondary text-xs">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          邀請成員
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {TEAM_MEMBERS.map((m, i) => (
          <div key={i} className="text-center">
            <div className="relative inline-block">
              <img
                src={m.avatar || TEAM_AVATARS_FALLBACK[i]}
                alt={m.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm mx-auto bg-slate-100"
                loading="eager"
                decoding="async"
              />
              {m.online && (
                <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white"></span>
              )}
            </div>
            <p className="mt-2 text-sm font-semibold text-text-primary">{m.name}</p>
            <p className="text-xs text-text-tertiary">{m.role}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">本週表現</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-2xl font-bold text-text-primary">12</p>
            <p className="text-xs text-text-tertiary">完成任務</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-brand-600">US$ 1,240</p>
            <p className="text-xs text-text-tertiary">團隊收入</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">+24%</p>
            <p className="text-xs text-text-tertiary">較上月</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelKanban() {
  return (
    <div className="card-feature min-h-[420px] p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">我的任務</h3>
          <p className="text-sm text-text-tertiary mt-1">開放中 3 · 已接受 2</p>
        </div>
        <div className="flex gap-2">
          <span className="badge-platform">全部</span>
          <span className="badge-platform bg-brand-50 border-brand-300 text-brand-700">待接受</span>
        </div>
      </div>
      <div className="space-y-3">
        {TASKS.map((t, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/30 transition cursor-pointer">
            <span className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-text-tertiary">{t.platform}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">{t.title}</p>
            </div>
            <span className="text-base font-bold text-brand-600 tabular-nums">US$ {t.price}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${t.status === '待接受' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelStorage() {
  return (
    <div className="card-feature min-h-[420px] p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">多平台影片儲存</h3>
        <p className="text-sm text-text-tertiary mt-1">所有平台影片統一管理</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {PLATFORMS.slice(0, 6).map(p => (
          <div key={p.code} className="aspect-square rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex flex-col items-center justify-center p-2 text-center hover:border-brand-300 hover:from-brand-50 hover:to-brand-100 transition">
            <span className="h-10 w-10 rounded-lg bg-white flex items-center justify-center font-bold text-text-secondary shadow-sm text-sm">{p.code}</span>
            <span className="mt-2 text-xs font-semibold text-text-tertiary truncate w-full">{p.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between text-sm text-text-tertiary">
        <span>已儲存 <strong className="text-text-primary font-bold">48</strong> 部影片</span>
        <button className="text-brand-600 font-semibold hover:underline">檢視全部 →</button>
      </div>
    </div>
  );
}

function PanelScript() {
  return (
    <div className="card-feature min-h-[420px] p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">AI 腳本生成</h3>
        <p className="text-sm text-text-tertiary mt-1">輸入主題 → 一鍵生成完整腳本</p>
      </div>
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400"></span>
          <span className="h-2 w-2 rounded-full bg-amber-400"></span>
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          <span className="ml-3 text-xs text-text-tertiary">https://youtube.com/watch?v=...</span>
        </div>
        <div className="p-4 bg-white">
          <div className="text-xs font-semibold text-text-tertiary uppercase mb-2">Prompt</div>
          <div className="text-sm text-text-primary bg-brand-50/40 rounded-lg p-3 mb-4">
            開箱一支美妝刷具，時長 30 秒，要有 Hook + CTA
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold mb-2">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            Generated Script
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-text-primary"><span className="text-brand-600 font-bold">[Hook]</span>「這支刷具改變我的底妝…」</p>
            <p className="text-text-primary"><span className="text-brand-600 font-bold">[Body]</span>「首先，刷毛密度驚人…」</p>
            <p className="text-text-primary"><span className="text-brand-600 font-bold">[CTA]</span>「連結在 bio，限時 8 折！」</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelCalendar() {
  // 簡化月曆
  const days = Array.from({length: 30}, (_, i) => i + 1);
  const scheduled = [4, 5, 8, 11, 14, 18, 22, 25, 28];
  const today = 9;

  return (
    <div className="card-feature min-h-[420px] p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">April 2026</h3>
        <div className="flex gap-1">
          <button className="h-8 w-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-text-tertiary">&lt;</button>
          <button className="h-8 w-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-text-tertiary">&gt;</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-text-tertiary mb-2">
        {['M','T','W','T','F','S','S'].map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map(d => {
          const isScheduled = scheduled.includes(d);
          const isToday = d === today;
          return (
            <button
              key={d}
              className={`aspect-square rounded-lg text-sm flex items-center justify-center transition ${
                isToday ? 'bg-brand-500 text-white font-bold' :
                isScheduled ? 'bg-brand-100 text-brand-700 font-semibold hover:bg-brand-200' :
                'text-text-secondary hover:bg-slate-50'
              }`}
            >{d}</button>
          );
        })}
      </div>
      <div className="mt-6 flex items-center gap-4 text-xs text-text-tertiary">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-brand-500"></span>今天</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-brand-100"></span>已排程</span>
      </div>
    </div>
  );
}

const PANELS = {
  team: PanelTeam,
  kanban: PanelKanban,
  storage: PanelStorage,
  script: PanelScript,
  calendar: PanelCalendar,
};

export default function FeaturesTabs() {
  const [active, setActive] = useState(FEATURE_TABS[0].id);
  const Panel = PANELS[active];

  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="container-clipy">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-eyebrow">產品功能</p>
          <h2 className="section-title">一個平台，無限可能</h2>
        </div>

        <div className="mt-10 grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto scrollbar-none">
            {FEATURE_TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`text-left p-4 rounded-xl transition border whitespace-nowrap lg:whitespace-normal ${
                  active === t.id
                    ? 'bg-brand-50 border-brand-300 text-brand-700'
                    : 'bg-white border-slate-200 text-text-secondary hover:border-brand-200 hover:bg-brand-50/30'
                }`}
              >
                <p className={`text-sm font-bold ${active === t.id ? 'text-brand-700' : 'text-text-primary'}`}>{t.label}</p>
                <p className="text-xs mt-1 text-text-secondary">{t.desc}</p>
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="animate-fade-in">
            <Panel />
          </div>
        </div>
      </div>
    </section>
  );
}