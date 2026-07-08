import { STEPS } from '../data';

export default function Steps() {
  return (
    <section id="steps" className="py-16 sm:py-24 bg-surface-secondary">
      <div className="container-clipy">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-eyebrow">簡單流程</p>
          <h2 className="section-title">如何運作</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="relative">
              {/* connector */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[60%] w-[80%] h-px bg-gradient-to-r from-brand-300 to-transparent"></div>
              )}
              <div className="card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white font-display font-extrabold text-sm flex items-center justify-center shadow-md">
                    {s.num}
                  </span>
                </div>
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