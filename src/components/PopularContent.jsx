import { CONTENT_THUMBS } from '../data';

export default function PopularContent() {
  return (
    <section className="py-16 sm:py-24 bg-surface-secondary">
      <div className="container-clipy">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
          <div>
            <p className="section-eyebrow">熱門精選</p>
            <h2 className="section-title">熱門創作者內容</h2>
          </div>
          <a href="#cta" className="text-sm font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1">
            探索更多
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CONTENT_THUMBS.map((c, i) => (
            <a key={i} href="#" className="group block rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all">
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                <img
                  src={c.img}
                  alt={c.tag + ' 內容'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded">{c.platform}</span>
                  <span className="bg-accent-orange/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">{c.tag}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <span className="text-white text-xs font-semibold drop-shadow-lg">{c.creator}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-text-tertiary">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
                  {c.views}
                </div>
                <span className="text-sm font-bold text-brand-600 tabular-nums">{c.payout}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}