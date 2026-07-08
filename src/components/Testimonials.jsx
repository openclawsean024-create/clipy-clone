import { TESTIMONIALS } from '../data';

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({length: 5}).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`h-4 w-4 ${i < n ? 'text-accent-orange fill-current' : 'text-slate-200'}`}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container-clipy">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-eyebrow">真實回饋</p>
          <h2 className="section-title">聽聽創作者怎麼說</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card p-6 flex flex-col">
              <Stars n={t.rating}/>
              <p className="mt-4 text-sm text-text-secondary leading-relaxed flex-1">「{t.text}」</p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover border-2 border-accent-orange/30"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-bold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-tertiary">{t.handle} · {t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}