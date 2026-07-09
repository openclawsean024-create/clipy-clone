import { useMemo } from 'react';
import { useAuth } from '../auth';
import { calcEarnings, fmtViews, nextTier, tierLabel, earningsPer10k } from '../lib/earnings';
import { monthlyViews, platformDistribution } from '../lib/mockData';
import { img as imgPath } from '../data';

export default function Overview() {
  const { user, db } = useAuth();
  const posts = db?.posts || [];

  const stats = useMemo(() => {
    const totalViews = posts.reduce((s, p) => s + (p.views || 0), 0);
    const totalEarnings = posts.reduce((s, p) => s + calcEarnings(p.views), 0);
    const postCount = posts.length;
    const ms = monthlyViews();
    const lastMonthViews = ms[ms.length - 1].views;
    const prevMonthViews = ms[ms.length - 2].views;
    const growthRate = prevMonthViews ? (((lastMonthViews - prevMonthViews) / prevMonthViews) * 100) : 0;
    return { totalViews, totalEarnings, postCount, growthRate };
  }, [posts]);

  const next = nextTier(stats.totalViews);
  const currentTierLabel = tierLabel(stats.totalViews);
  const topPost = useMemo(() => [...posts].sort((a, b) => b.views - a.views)[0], [posts]);

  const monthly = monthlyViews();
  const monthlyMax = Math.max(...monthly.map(m => m.views));
  const monthlyData = useMemo(() => monthly.map(m => ({ ...m, payout: calcEarnings(m.views) })), []);
  const monthlyEarnings = monthly.reduce((s, m) => s + calcEarnings(m.views), 0);

  const plat = useMemo(() => {
    const dist = platformDistribution(posts);
    const total = dist.reduce((s, d) => s + d.views, 0);
    return dist.map(d => ({ ...d, pct: total ? Math.round((d.views / total) * 100) : 0 }));
  }, [posts]);

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 lg:mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">嗨，{user.name} 👋</h1>
        <p className="text-text-tertiary mt-1 text-sm">這是你 UGC 表現的最新總覽</p>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 text-white p-6 lg:p-8 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-accent-orange/20 blur-3xl"></div>
        </div>
        <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-100 mb-2">累積總收益</p>
            <p className="font-display text-5xl lg:text-6xl font-extrabold tabular-nums leading-none">US$ {stats.totalEarnings.toLocaleString('en-US')}</p>
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300"></span>
                目前位於 {currentTierLabel} 級距
              </span>
              {next.nextTier && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>
                  再 {fmtViews(next.viewsToNext)} 觀看 → US${next.nextPayout}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="inline-block bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20">
              <p className="text-xs text-brand-100 mb-1">本年累計</p>
              <p className="font-display text-3xl font-extrabold tabular-nums">US$ {monthlyEarnings.toLocaleString('en-US')}</p>
              <p className="text-xs text-brand-100 mt-1">{stats.postCount} 部影片</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
        <StatCard label="總觀看" value={fmtViews(stats.totalViews)} icon="eye" delta={`+${stats.growthRate.toFixed(1)}%`} deltaPos={stats.growthRate >= 0}/>
        <StatCard label="PO 文" value={stats.postCount.toString()} unit="部" icon="video"/>
        <StatCard label="每萬觀看效率" value={`$${earningsPer10k(stats.totalViews).toFixed(1)}`} icon="speed"/>
        <StatCard label="本年累計" value={`$${monthlyEarnings}`} icon="dollar" delta="+12.4%" deltaPos/>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-4 lg:gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-lg text-text-primary">12 個月觀看趨勢</h2>
              <p className="text-xs text-text-tertiary mt-0.5">Aug 2025 — Jul 2026</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-tertiary">總觀看</p>
              <p className="text-lg font-bold text-text-primary tabular-nums">{fmtViews(monthly.reduce((s, m) => s + m.views, 0))}</p>
            </div>
          </div>
          <div className="flex items-end justify-between gap-1 lg:gap-2 h-48">
            {monthlyData.map((m, i) => {
              const h = (m.views / monthlyMax) * 100;
              const isLatest = i === monthlyData.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="relative w-full flex flex-col items-center justify-end h-full">
                    <div className="absolute -top-7 text-xs font-bold text-brand-700 opacity-0 group-hover:opacity-100 transition bg-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                      {fmtViews(m.views)}
                    </div>
                    <div
                      className={`w-full rounded-t-md transition-all ${isLatest ? 'bg-gradient-to-t from-brand-600 to-brand-400' : 'bg-gradient-to-t from-brand-200 to-brand-100'} hover:from-brand-700 hover:to-brand-500`}
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="text-[10px] lg:text-xs text-text-tertiary font-medium">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {topPost && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-3">表現最佳 PO 文</p>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
              <img src={imgPath(topPost.thumbnail.replace('/images/', ''))} alt={topPost.title} className="w-full h-full object-cover" loading="lazy"/>
              <span className="absolute top-2 left-2 bg-black/70 backdrop-blur text-white text-xs font-bold px-2 py-0.5 rounded">{topPost.platform}</span>
            </div>
            <p className="text-sm font-bold text-text-primary line-clamp-2 mb-2">{topPost.title}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-tertiary">觀看</span>
              <span className="font-bold text-text-primary tabular-nums">{fmtViews(topPost.views)}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1.5">
              <span className="text-text-tertiary">收益</span>
              <span className="font-bold text-brand-600 tabular-nums">US$ {calcEarnings(topPost.views)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-bold text-lg text-text-primary">平台觀看分佈</h2>
            <p className="text-xs text-text-tertiary mt-0.5">9 大平台中你已覆蓋 {plat.length} 個</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="flex justify-center"><DonutChart data={plat} colors={colors}/></div>
          <div className="space-y-2.5">
            {plat.map((p, i) => (
              <div key={p.platform} className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-sm flex-shrink-0" style={{ backgroundColor: colors[i % colors.length] }}/>
                <span className="text-sm text-text-secondary flex-1">{p.platform}</span>
                <span className="text-sm font-bold text-text-primary tabular-nums">{fmtViews(p.views)}</span>
                <span className="text-sm text-text-tertiary tabular-nums w-12 text-right">{p.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg text-text-primary">最近 PO 文</h2>
          <a href="/dashboard/posts" className="text-sm font-semibold text-brand-600 hover:text-brand-700">查看全部 →</a>
        </div>
        <div className="space-y-2">
          {posts.slice(0, 4).map(p => (
            <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
              <img src={imgPath(p.thumbnail.replace('/images/', ''))} alt="" className="h-12 w-12 rounded-lg object-cover" loading="lazy"/>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">{p.title}</p>
                <p className="text-xs text-text-tertiary">{p.platform} · {p.postedAt}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-text-primary tabular-nums">{fmtViews(p.views)}</p>
                <p className="text-xs font-semibold text-brand-600 tabular-nums">US$ {calcEarnings(p.views)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, icon, delta, deltaPos }) {
  const iconMap = {
    eye:   <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>,
    video: <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>,
    speed: <path d="M13 10V3L4 14h7v7l9-11h-7z"/>,
    dollar:<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 lg:p-5">
      <div className="flex items-center gap-2 mb-2.5">
        <span className="h-8 w-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">{iconMap[icon]}</svg>
        </span>
        <span className="text-xs text-text-tertiary font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary tabular-nums">{value}</span>
        {unit && <span className="text-sm text-text-tertiary">{unit}</span>}
      </div>
      {delta && (
        <p className={`text-xs font-bold mt-1 ${deltaPos ? 'text-emerald-600' : 'text-red-600'}`}>
          {deltaPos ? '↑' : '↓'} {delta}
          <span className="text-text-tertiary font-medium ml-1">vs 上月</span>
        </p>
      )}
    </div>
  );
}

function DonutChart({ data, colors }) {
  if (!data.length) return null;
  const total = data.reduce((s, d) => s + d.views, 0);
  const radius = 60;
  const stroke = 24;
  const C = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative">
      <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
        <circle cx="90" cy="90" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth={stroke}/>
        {data.map((d, i) => {
          const pct = d.views / total;
          const dash = pct * C;
          const seg = (
            <circle key={d.platform} cx="90" cy="90" r={radius} fill="transparent" stroke={colors[i % colors.length]} strokeWidth={stroke} strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={-offset} style={{ transition: 'stroke-dasharray 0.4s' }}/>
          );
          offset += dash;
          return seg;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xs text-text-tertiary">總觀看</p>
        <p className="font-display text-2xl font-extrabold text-text-primary tabular-nums">{total >= 1000 ? `${(total / 1000).toFixed(1)}K` : total}</p>
        <p className="text-xs text-text-tertiary mt-1">{data.length} 平台</p>
      </div>
    </div>
  );
}