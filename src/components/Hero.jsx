import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SLIDES } from '../data';
import { useAuth } from '../auth';

export default function Hero({ openAuth }) {
  const { user } = useAuth();
  const nav = useNavigate();
  const [active, setActive] = useState(0);
  const [role, setRole] = useState('creator');

  useEffect(() => {
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  return (
    <section id="top" className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial-brand opacity-30 blur-3xl"></div>
        <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-gradient-radial-orange opacity-20 blur-3xl"></div>
      </div>

      <div className="container-clipy text-center">
        {/* 角色切換 pills */}
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-slate-200/60 mb-6">
          <button
            onClick={() => setRole('creator')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${role === 'creator' ? 'bg-white text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-primary'}`}
          >我是創作者</button>
          <button
            onClick={() => setRole('brand')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${role === 'brand' ? 'bg-white text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-primary'}`}
          >我是品牌方</button>
        </div>

        {/* Eyebrow */}
        <div className="text-xs sm:text-sm font-semibold text-text-tertiary mb-3 tracking-wide">{slide.eyebrow}</div>

        {/* Title */}
        <h1 className="hero-title text-text-primary mx-auto max-w-4xl">
          {slide.titleLines.map((line, i) => (
            <span key={i}>
              {typeof line === 'string' ? line : <span className="text-gradient-brand">{line.gold}</span>}
              {i < slide.titleLines.length - 1 && <br/>}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-text-tertiary max-w-2xl mx-auto leading-relaxed">{slide.subtitle}</p>

        {/* Slide indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${i === active ? 'w-8 bg-text-primary' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
              aria-label={`Slide ${i+1}`}
            />
          ))}
        </div>

        {/* Hero image */}
        <div className="relative mt-8 max-w-3xl mx-auto">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/20 border border-slate-200/60">
            <img
              src={slide.img}
              alt={slide.imgAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="h-16 w-16 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-brand-600 ml-1" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>
          {/* 底部裝飾圓點 */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[0,1,2,3,4].map(i => (
              <span key={i} className="dot-decoration" style={{animationDelay: `${i * 0.2}s`}}/>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-12">
          <button
            onClick={() => user ? nav('/dashboard') : openAuth?.('register')}
            className="btn-primary-lg w-full sm:w-auto"
          >{user ? '進入工作室' : '立即加入'}</button>
          <a href="#tiers" className="btn-secondary w-full sm:w-auto">
            查看獎金階梯
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-text-tertiary">
          <div className="flex -space-x-2">
            {SLIDES.map((s, i) => (
              <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-brand-200 to-brand-400 flex items-center justify-center text-[10px] font-bold text-brand-700">
                {s.key[0].toUpperCase()}
              </div>
            ))}
          </div>
          <span>已有 <strong className="text-text-primary font-bold">3000+</strong> 創作者加入</span>
        </div>
      </div>
    </section>
  );
}