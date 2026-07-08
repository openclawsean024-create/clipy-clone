import { TIERS } from '../data';

export default function TiersTable() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container-clipy">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-eyebrow">完整階梯</p>
          <h2 className="section-title">獎金階梯總覽</h2>
          <p className="mt-4 text-text-tertiary">每支影片達標即開始計算，沒有複雜規則。</p>
        </div>

        <div className="mt-10 max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-brand-700">觀看數</th>
                  <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-brand-700">級距</th>
                  <th className="text-right py-4 px-6 text-xs font-bold uppercase tracking-wider text-brand-700">單支獎金</th>
                  <th className="text-right py-4 px-6 text-xs font-bold uppercase tracking-wider text-brand-700 hidden sm:table-cell">每萬觀看</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map((t, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-brand-50/30 transition">
                    <td className="py-4 px-6 text-sm font-bold text-text-primary tabular-nums">{t.views.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <span className="badge-platform">{t.label}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-lg font-extrabold text-gradient-blue tabular-nums">US$ {t.payout}</span>
                    </td>
                    <td className="py-4 px-6 text-right text-sm text-text-tertiary hidden sm:table-cell tabular-nums">
                      US$ {((t.payout / t.views) * 10000).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-text-tertiary text-center">
            * 結算以影片 30 天內累積真實觀看數計算 · 7 天保證到帳
          </p>
        </div>
      </div>
    </section>
  );
}