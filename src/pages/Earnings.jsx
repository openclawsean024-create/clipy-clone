import { useState, useMemo } from 'react';
import { useAuth } from '../auth';
import { calcEarnings, fmtViews, currentTier, nextTier } from '../lib/earnings';
import { TIERS } from '../data';

export default function Earnings() {
  const { user, db, addWithdraw } = useAuth();
  const posts = db?.posts || [];
  const withdrawHistory = db?.withdrawHistory || [];

  const totalEarnings = posts.reduce((s, p) => s + calcEarnings(p.views), 0);
  const totalViews = posts.reduce((s, p) => s + p.views, 0);
  const pendingEarnings = totalEarnings * 0.6;   // 60% 待結算
  const clearedEarnings = totalEarnings * 0.4;   // 40% 已結算
  const withdrawn = withdrawHistory.reduce((s, w) => s + w.amount, 0);
  const available = clearedEarnings - withdrawn;

  const tier = currentTier(totalEarnings);
  const next = nextTier(totalEarnings);

  const sortedPosts = [...posts].sort((a, b) => calcEarnings(b.views) - calcEarnings(a.views));

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">收益</h1>
        <p className="text-text-tertiary mt-1 text-sm">查看累積收益、提款與結算記錄</p>
      </div>

      {/* Main balance card */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 text-white p-6 lg:p-8 mb-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100 mb-2">可提款餘額</p>
            <p className="font-display text-5xl lg:text-6xl font-extrabold tabular-nums leading-none">US$ {available.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold">
                目前 {tier ? tier.label : '<10K'} 級距
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold">
                本月預計 {pendingEarnings.toFixed(0)} → 結算
              </span>
            </div>
          </div>
          <div className="text-right">
            <button
              onClick={() => {
                if (available <= 0) return alert('目前沒有可提款餘額');
                const amount = available;
                if (confirm(`提款 US$ ${amount.toFixed(2)} 到 PayPal？`)) {
                  addWithdraw({ amount, date: new Date().toISOString().slice(0, 10), method: 'PayPal' });
                  alert(`✓ 已送出 US$ ${amount.toFixed(2)} 提款申請，將於 3 個工作天內到帳`);
                }
              }}
              disabled={available <= 0}
              className="bg-white text-emerald-600 font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              提款到 PayPal
            </button>
          </div>
        </div>
      </div>

      {/* 三欄分解 */}
      <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 lg:p-5">
          <p className="text-xs text-text-tertiary mb-1">累積總收益</p>
          <p className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary tabular-nums">${totalEarnings.toFixed(0)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 lg:p-5">
          <p className="text-xs text-text-tertiary mb-1">待結算</p>
          <p className="font-display text-2xl lg:text-3xl font-extrabold text-amber-600 tabular-nums">${pendingEarnings.toFixed(0)}</p>
          <p className="text-[10px] text-text-tertiary mt-1">7 天內結算</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 lg:p-5">
          <p className="text-xs text-text-tertiary mb-1">已提款</p>
          <p className="font-display text-2xl lg:text-3xl font-extrabold text-text-tertiary tabular-nums">${withdrawn.toFixed(0)}</p>
        </div>
      </div>

      {/* Tiers */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 mb-6">
        <h2 className="font-bold text-lg text-text-primary mb-4">完整獎金階梯</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-3 py-2.5 text-xs font-bold uppercase text-text-tertiary">觀看</th>
                <th className="text-left px-3 py-2.5 text-xs font-bold uppercase text-text-tertiary">級距</th>
                <th className="text-right px-3 py-2.5 text-xs font-bold uppercase text-text-tertiary">單支獎金</th>
                <th className="text-right px-3 py-2.5 text-xs font-bold uppercase text-text-tertiary hidden sm:table-cell">每萬觀看</th>
                <th className="text-center px-3 py-2.5 text-xs font-bold uppercase text-text-tertiary">達標</th>
              </tr>
            </thead>
            <tbody>
              {TIERS.map((t, i) => {
                const achieved = totalViews >= t.views;
                return (
                  <tr key={i} className={`border-b border-slate-100 last:border-0 ${achieved ? 'bg-emerald-50/30' : ''}`}>
                    <td className="px-3 py-3 text-sm font-bold text-text-primary tabular-nums">{t.views.toLocaleString()}</td>
                    <td className="px-3 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${achieved ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-text-tertiary'}`}>{t.label}</span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className="text-base font-extrabold text-gradient-blue tabular-nums">US$ {t.payout}</span>
                    </td>
                    <td className="px-3 py-3 text-right text-sm text-text-tertiary hidden sm:table-cell tabular-nums">
                      ${(t.payout / t.views * 10000).toFixed(1)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {achieved ? (
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500 text-white">
                          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 收益明細 by post */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 mb-6">
        <h2 className="font-bold text-lg text-text-primary mb-4">每部影片收益明細</h2>
        <div className="space-y-2">
          {sortedPosts.map(p => {
            const earn = calcEarnings(p.views);
            return (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{p.title}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">{p.platform} · {fmtViews(p.views)} 觀看</p>
                </div>
                <p className="font-display text-xl font-extrabold text-gradient-blue tabular-nums">US$ {earn}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 提款記錄 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6">
        <h2 className="font-bold text-lg text-text-primary mb-4">提款記錄</h2>
        {withdrawHistory.length === 0 ? (
          <div className="text-center py-8 text-text-tertiary">
            <p className="text-sm">尚未提款記錄</p>
          </div>
        ) : (
          <div className="space-y-2">
            {withdrawHistory.map((w, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <span className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-text-primary">提款到 {w.method}</p>
                  <p className="text-xs text-text-tertiary">{w.date} · 已完成</p>
                </div>
                <p className="font-display text-lg font-extrabold text-emerald-600 tabular-nums">US$ {w.amount.toFixed(0)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
