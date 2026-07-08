import { REASONS } from '../data';

export default function WhyUs() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-surface-secondary to-white">
      <div className="container-clipy">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-eyebrow">為什麼選擇我們</p>
          <h2 className="section-title">不只是平台，是你的創作事業夥伴</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((r, i) => (
            <div key={i} className="card-feature group p-0 overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={r.img}
                  alt={r.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-text-primary">{r.title}</h3>
                <p className="mt-2 text-sm text-text-tertiary leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}