import { useState } from 'react';
import { FAQS } from '../data';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-surface-secondary">
      <div className="container-clipy">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-eyebrow">常見問題</p>
          <h2 className="section-title">還有疑問嗎？</h2>
        </div>
        <div className="mt-10 max-w-3xl mx-auto space-y-3">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all ${open === i ? 'bg-white border-brand-300 shadow-md' : 'bg-white border-slate-200 hover:border-slate-300'}`}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full text-left p-5 flex items-center justify-between gap-4"
              >
                <span className="font-bold text-text-primary text-base sm:text-lg">{f.q}</span>
                <span className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-transform ${open === i ? 'bg-brand-500 text-white rotate-45' : 'bg-slate-100 text-text-tertiary'}`}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 -mt-2 text-sm sm:text-base text-text-secondary leading-relaxed animate-fade-in">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}