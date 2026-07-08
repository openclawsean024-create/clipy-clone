import { STEPS } from '../data';

export default function Steps() {
  return (
    <section id="steps" className="py-16 sm:py-24 bg-surface-secondary">
      <div className="container-clipy">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-eyebrow">簡單流程</p>
          <h2 className="section-title">如何運作</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {STEPS.map((s, i) => (
            <div key={i} className="relative">
              {/* 標號：在卡片外面，4 個永遠水平對齊 */}
              <div className="relative flex items-center mb-5">
                <span className="relative z-10 h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white font-display font-extrabold text-sm flex items-center justify-center shadow-md">
                  {s.num}
                </span>
                {/* 連接線：從這個標號水平延伸到下一個標號 */}
                {i < STEPS.length - 1 && (
                  <div
                    aria-hidden
                    className="hidden lg:block absolute left-10 right-[-1rem] top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-brand-300/80 via-brand-200/60 to-transparent"
                  />
                )}
              </div>

              {/* 卡片：高度自然撐開（描述長短不影響上方標號位置） */}
              <div className="card p-6 h-full flex flex-col">
                <h3 className="text-lg font-bold text-text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-text-tertiary leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}