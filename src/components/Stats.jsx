import { STATS } from '../data';

export default function Stats() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-clipy">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-eyebrow">數字會說話</p>
          <h2 className="section-title">持續成長的創作者生態系</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="card text-center p-6 sm:p-8">
              <p className="text-4xl sm:text-5xl font-extrabold text-gradient-blue tabular-nums">{s.num}</p>
              <p className="mt-3 text-base font-bold text-text-primary">{s.label}</p>
              <p className="mt-1 text-sm text-text-tertiary">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}