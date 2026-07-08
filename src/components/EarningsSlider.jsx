import { useState } from 'react';
import { TIERS } from '../data';

export default function EarningsSlider() {
  const [step, setStep] = useState(3); // 100K
  const tier = TIERS[step];
  const next = TIERS[step + 1];

  const handleChange = (e) => {
    const v = parseInt(e.target.value);
    setStep(v);
    const slider = e.target;
    const pct = (v / (TIERS.length - 1)) * 100;
    slider.style.setProperty('--val', `${pct}%`);
  };

  return (
    <section id="tiers" className="py-16 sm:py-24 bg-gradient-to-b from-white via-brand-50/30 to-white">
      <div className="container-clipy">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tabs */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-brand-100/40 mb-5">
            <button className="px-4 py-1.5 rounded-full bg-white text-text-primary text-sm font-semibold shadow-sm">即時階梯</button>
            <button className="px-4 py-1.5 rounded-full text-text-tertiary hover:text-text-primary text-sm font-semibold">標準費率</button>
          </div>

          <h2 className="section-title">拉一下滑桿 <span className="text-gradient-brand">看看不同觀看數能拿多少。</span></h2>
          <p className="mt-4 text-text-tertiary text-base">沒有最低觀看門檻，影片達標即開始計算獎金。</p>
        </div>

        {/* Slider card */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="card-dark p-8 sm:p-12 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-brand-500/20 blur-3xl pointer-events-none"></div>

            <div className="relative grid sm:grid-cols-2 gap-8 items-center">
              {/* 左：觀看數 + 獎金 */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">目前位於</p>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">{tier.label} 級距</p>
                <p className="text-4xl sm:text-5xl font-extrabold text-brand-300 mt-4">{tier.views.toLocaleString()} 次觀看</p>
                <div className="mt-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">單支影片獎金</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-white">US$</span>
                    <span className="text-7xl font-extrabold text-white tabular-nums tracking-tight">{tier.payout}</span>
                    <span className="text-slate-400 text-base">/ 支</span>
                  </div>
                </div>
                {next && (
                  <div className="mt-6 flex items-center gap-2 text-sm text-brand-300">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>
                    <span>衝到 {next.label}，每支影片提升至 US${next.payout}</span>
                  </div>
                )}
              </div>

              {/* 右：滑桿 */}
              <div>
                <input
                  type="range"
                  min="0"
                  max={TIERS.length - 1}
                  step="1"
                  value={step}
                  onChange={handleChange}
                  className="range-slider w-full"
                  aria-label="拉一下滑桿"
                />
                <div className="flex justify-between mt-3 text-[11px] text-slate-400 font-medium">
                  {TIERS.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => { setStep(i); const s = document.querySelector('.range-slider'); if (s) s.style.setProperty('--val', `${(i/(TIERS.length-1))*100}%`); }}
                      className={`px-1 transition ${i === step ? 'text-brand-300 font-bold scale-110' : 'hover:text-white'}`}
                    >{t.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <a href="#cta" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition">
              查看完整階梯、月收入預估與規則
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}