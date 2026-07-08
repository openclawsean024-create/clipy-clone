import { PLATFORMS, REGIONS } from '../data';

export default function PlatformsStrip() {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-slate-200/60">
      <div className="container-clipy">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* 支援平台 */}
          <div>
            <p className="section-eyebrow text-center lg:text-left">支援平台</p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {PLATFORMS.map(p => (
                <span key={p.code} className="badge-platform">
                  {p.label}
                </span>
              ))}
            </div>
          </div>
          {/* 支援地區 */}
          <div>
            <p className="section-eyebrow text-center lg:text-left">支援地區</p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {REGIONS.map(r => (
                <span key={r} className="badge-region">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brand-500" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}